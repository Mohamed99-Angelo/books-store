const params = new URLSearchParams(window.location.search);
const token = localStorage.getItem("token")
const id = params.get('id');

console.log('Received ID:', id);
let destinationData = {}


// if (!token) {
//   window.location.href = "login.html"; 
// } 

    function renderDestination(data) {
      document.getElementById("destinationTitle").innerText = data.title;

      const mainImage = document.getElementById("mainImage");
      const thumbnailsContainer = document.getElementById("thumbnails");
      thumbnailsContainer.innerHTML = "";
      console.log(data.imgs[0]);
      
      mainImage.src = data.imgs[0];

      data.imgs.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("thumbnail");
        if (index === 0) img.classList.add("active");

        img.onclick = () => {
          mainImage.src = src;
          document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));
          img.classList.add("active");
        };

        thumbnailsContainer.appendChild(img);
      });

      document.getElementById("rating").innerHTML =
        "★".repeat(Math.floor(data.rating)) + " " + data.rating;

      document.getElementById("type").innerText = data.type;

      document.getElementById("price").innerText = `$${data.pricePerNight}`;

      document.getElementById("desc").innerText = data.desc;

      console.log(data.travlingTips);
      
      document.getElementById("tips").innerText = data.travlingTips;

      const reviewsContainer = document.getElementById("reviews");
      reviewsContainer.innerHTML = "";
      data.reviews.forEach(review => {
        const div = document.createElement("div");
        div.classList.add("review-item");
        div.innerHTML = `<p>${review}</p>`;
        reviewsContainer.appendChild(div);
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      const bookNowBtn = document.getElementById("bookNowBtn");

      if (bookNowBtn) {
        bookNowBtn.addEventListener("click", () => {
          bookNowBtn.innerHTML = '<span class="loading"></span> Booking...';
          
          setTimeout(() => {
            bookNowBtn.innerHTML = 'Book Now';
            window.location.href = `booking.html?id=${encodeURIComponent(destinationData._id)}`;
          }, 1000);
        });
      }
    });

    // API call 
    /*
    fetch("http://localhost:2005/api/v1/destinations/68a2e5f26c6c18a8a1668992")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        enderDestination(data);
      })
      .catch(err => console.error(err));
    */

    document.documentElement.style.scrollBehavior = 'smooth';