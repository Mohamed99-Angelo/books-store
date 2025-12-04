// ========== API BASE URL (CHANGE TO YOUR BACKEND) ==========
const API = "http://localhost:3000"; // example JSON-server / backend

// DOM ELEMENTS
const booksTable = document.getElementById("destinationsTable");
const ordersTable = document.getElementById("bookingsTable");
const usersTable = document.getElementById("usersTable");

// STATISTICS
const totalMoney = document.getElementById("total-money");
const mostVisited = document.getElementById("most-visted");
const totalBookings = document.getElementById("total-bookings");

// ========== INITIAL LOAD ==========
window.onload = () => {
    loadBooks();
    loadOrders();
    loadUsers();
    loadStatistics();
};

// ============================================================
// 1️⃣ BOOK & CATEGORY MANAGEMENT
// ============================================================

async function loadBooks() {
    try {
        const res = await axios.get(`${API}/books`);

        res.data.forEach(book => {
            const row = booksTable.insertRow();

            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.price}$</td>
                <td>
                    <button onclick="editBook(${book.id})">✏ Edit</button>
                    <button onclick="deleteBook(${book.id})" style="color:red;">🗑 Delete</button>
                </td>
            `;
        });
    } catch (err) {
        console.error("Error loading books", err);
    }
}

async function deleteBook(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This book will be permanently deleted!",
        icon: "warning",
        showCancelButton: true
    }).then(async result => {
        if (result.isConfirmed) {
            await axios.delete(`${API}/books/${id}`);
            Swal.fire("Deleted!", "Book has been removed.", "success");
            location.reload();
        }
    });
}

async function editBook(id) {
    const book = (await axios.get(`${API}/books/${id}`)).data;

    Swal.fire({
        title: "Edit Book",
        html: `
            <input id="title" class="swal2-input" value="${book.title}">
            <input id="price" class="swal2-input" value="${book.price}">
            <input id="stock" class="swal2-input" value="${book.stock}">
        `,
        confirmButtonText: "Save"
    }).then(async res => {
        if (res.isConfirmed) {
            const updated = {
                title: document.getElementById("title").value,
                price: document.getElementById("price").value,
                stock: document.getElementById("stock").value
            };

            await axios.put(`${API}/books/${id}`, updated);

            Swal.fire("Updated!", "Book saved.", "success");
            location.reload();
        }
    });
}

// ============================================================
// 2️⃣ ORDER MANAGEMENT
// ============================================================

async function loadOrders() {
    try {
        const res = await axios.get(`${API}/orders`);

        res.data.forEach(order => {
            const row = ordersTable.insertRow();

            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.user}</td>
                <td>${order.book}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="confirmOrder(${order.id})">✔ Confirm</button>
                    <button onclick="cancelOrder(${order.id})" style="color:red;">✖ Cancel</button>
                </td>
            `;
        });
    } catch (err) {
        console.error("Error loading orders", err);
    }
}

async function confirmOrder(id) {
    await axios.patch(`${API}/orders/${id}`, { status: "Confirmed" });
    Swal.fire("Order Confirmed!");
    location.reload();
}

async function cancelOrder(id) {
    Swal.fire({
        title: "Cancel Order?",
        icon: "warning",
        showCancelButton: true
    }).then(async r => {
        if (r.isConfirmed) {
            await axios.patch(`${API}/orders/${id}`, { status: "Canceled" });
            Swal.fire("Order Canceled");
            location.reload();
        }
    });
}

// ============================================================
// 3️⃣ USER MANAGEMENT
// ============================================================

async function loadUsers() {
    try {
        const res = await axios.get(`${API}/users`);

        res.data.forEach(user => {
            const row = usersTable.insertRow();

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.status}</td>
                <td>
                    <button onclick="banUser(${user.id})" style="color:red;">🚫 Ban</button>
                </td>
            `;
        });
    } catch (err) {
        console.error("Error loading users", err);
    }
}

async function banUser(id) {
    await axios.patch(`${API}/users/${id}`, { status: "Blocked" });
    Swal.fire("User Banned");
    location.reload();
}

// ============================================================
// 📊 STATISTICS
// ============================================================

async function loadStatistics() {
    try {
        const orders = (await axios.get(`${API}/orders`)).data;

        totalMoney.textContent = orders
            .filter(o => o.status === "Confirmed")
            .reduce((sum, o) => sum + Number(o.totalPrice), 0) + " $";

        totalBookings.textContent = orders.length;

        // Example: Most visited (replace with your logic)
        mostVisited.textContent = "Science Fiction";

    } catch (err) {
        console.error("Error loading stats", err);
    }
}

// ============================================================
// LOGOUT
// ============================================================

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("admin");
    Swal.fire("Logged out");
    window.location.href = "../auth/login.html";
});
