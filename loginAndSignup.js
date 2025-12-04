const loginForm = document.getElementById('loginForm');
const token = localStorage.getItem("token")
 var a = document.getElementById("loginBtn");
    var b = document.getElementById("registerBtn");
    var x = document.getElementById("login");
    var y = document.getElementById("register");

   function login() {
        x.style.left = "4px";
        y.style.right = "-520px";
        a.className += " white-btn";
        b.className = "btn";
        x.style.opacity = 1;
        y.style.opacity = 0;
    }

    function register() {
        x.style.left = "-510px";
        y.style.right = "5px";
        a.className = "btn";
        b.className += " white-btn";
        x.style.opacity = 0;
        y.style.opacity = 1;
    }

if (token) {
  console.log(token);
  Swal.fire('Error', 'user already regestered log out first', 'error');
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1000);
  
}

loginForm.addEventListener('submit',  function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value;

  if (!email) {
    return Swal.fire('Error', 'Email is required.', 'error');
  }
  if (!validateEmail(email)) {
    return Swal.fire('Error', 'Please enter a valid email address.', 'error');
  }
  if (!password) {
    return Swal.fire('Error', 'Password is required.', 'error');
  }

    axios.post('http://localhost:2005/api/v1/users/login', {
      email,
      password,
    }).then(res=>{
        console.log(res.data)
    Swal.fire('Success', 'Logged in successfully!', 'success').then(() => {
       loginForm.reset();
      const token = res.data.accessToken;
      localStorage.setItem('token', token);
      window.location.href = 'home.html';
    })
    }).catch(error=>{
          let msg = "Something went wrong!";

    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
     

    })
});


const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit',function (e) {
  e.preventDefault();

  const username = signupForm.username.value.trim();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value;

  if (!username) {
    return Swal.fire('Error', 'Username is required.', 'error');
  }
  if (!email) {
    return Swal.fire('Error', 'Email is required.', 'error');
  }
  if (!validateEmail(email)) {
    return Swal.fire('Error', 'Please enter a valid email address.', 'error');
  }
  if (!password) {
    return Swal.fire('Error', 'Password is required.', 'error');
  }
  if (password.length < 12) {
    return Swal.fire(
      'Error',
      'Password must be at least 12 characters long.',
      'error'
    );
  }

  axios.post('http://localhost:2005/api/v1/users/signup', {
      username,
      email,
      password,
    }).then(
    res=>{
    console.log(res.data)
    Swal.fire('Success', 'Signed up successfully!', 'success').then(() => {
      signupForm.reset();
      login()
    });
        }).catch(error=>{
              let msg = "Something went wrong!";

    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
     

        })
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}