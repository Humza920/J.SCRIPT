let userShown = JSON.parse(localStorage.getItem("User")) || null
let loginBtn = document.getElementById("login-btn")
console.log(userShown);


if (userShown != null) {
    loginBtn.innerHTML = ""
    loginBtn.innerHTML = `
    <div class="dropdown">
      <button
        class="btn btn-light dropdown-toggle d-flex align-items-center"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="${userShown.profilePic}"
          alt="User"
          id="userProfileImg"
          class="rounded-circle"
          width="40"
          height="40"
        />
      </button>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
        <li><a class="dropdown-item" href="adpost.html">Add Post</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
      </ul>
    </div>
  `;
}
else{
    Swal.fire({
        title: "You don’t have an account",
        text: "Please login first to post any ad.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#007bff"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "login.html";
        }
    });
}



let logoutBtn = document.querySelector("#logoutBtn");
console.log(logoutBtn);

if (logoutBtn === null) {
  console.log("logout button not found");
  
} else {
  logoutBtn.addEventListener("click", () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "No, stay logged in"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("User");
            window.location = "login.html";
        }
    });
});
}
