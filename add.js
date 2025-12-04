let submit = document.getElementById("add")
submit.addEventListener("click",async (event) => {
      event.preventDefault();
    let object = {
        title: document.getElementById('destinationTitle').value,
        type:document.getElementById('type').value,
        pricePerNight: document.getElementById('pricePerNight').value,
        desc: document.getElementById('description').value,
        rating:document.getElementById("rating").value,
       imgs: document.getElementById('imgs').value.split(',').map(s => s.trim()), // split by comma and remove extra spaces
       travlingTips: document.getElementById('tips').value.split(',').map(s => s.trim()),
    }

    console.log(object.imgs);
    console.log(object.travlingTips);
    
    
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(
            `http://localhost:2005/api/v1/destinations`,
            object,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(data);

        // Show success alert
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Book added successfully!",
            confirmButtonText: "OK",
            background: "#fff",
            confirmButtonColor: "#28a745"
        });

        // Optionally, redirect to the destinations page
        // window.location.href = "../pages/destinations.html";

    } catch (error) {
        let msg = "Something went wrong!";
        if (error.response && error.response.data) {
            msg = error.response.data.message || error.response.data.error || msg;
        } else if (error.message) {
            msg = error.message;
        }

        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: msg,
            confirmButtonText: "Okay",
            background: "#fff",
            confirmButtonColor: "#d33",
        });
    }
})
    