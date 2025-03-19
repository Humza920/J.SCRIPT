let userShown = JSON.parse(localStorage.getItem("User")) || null
let loginBtn = document.getElementById("login-btn")
console.log(userShown);

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top',
    }
});

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
        <li><a class="dropdown-item" href="index.html">Home</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
      </ul>
    </div>
  `;

  let divSingle = document.querySelector("#singlemain")
  let check = localStorage.getItem("cart")
  let arra = JSON.parse(check) || []
  console.log(arra);
  
  let ary = []
  let get = localStorage.getItem("single-product");
  let getItem = JSON.parse(get)
  console.log(getItem);
  ary.push(getItem)
  console.log(ary);
  
  ary.map((product) => {
      divSingle.innerHTML = `<div class="col-lg-8">
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden" data-aos="fade-up">
        <div class="position-relative">
          <img src="${getItem.convertImg}" class="card-img-top" alt="${getItem.productTitle}" 
            style="max-height: 400px; object-fit: contain; background-color: #f8f9fa; padding: 20px;">
          <div class="position-absolute top-0 end-0 m-3">
            <span class="badge bg-primary rounded-pill px-3 py-2" data-aos="fade-left" data-aos-delay="200">
              <i class="fas fa-star me-1"></i>Featured
            </span>
          </div>
        </div>
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div data-aos="fade-right" data-aos-delay="200">
              <h2 class="card-title fw-bold mb-2">${getItem.productTitle}</h2>
              <div class="d-flex align-items-center text-warning mb-2">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
                <span class="text-muted ms-2">(4.5)</span>
              </div>
            </div>
            <h3 class="text-primary fw-bold mb-0" data-aos="fade-left" data-aos-delay="200">
              Rs. ${getItem.productPrice.toLocaleString()}
            </h3>
          </div>

          <div class="mb-4" data-aos="fade-up" data-aos-delay="300">
            <h5 class="fw-bold mb-3">Description</h5>
            <p class="text-muted">${getItem.productDescription}</p>
          </div>

          <div class="row g-4 mb-4">
            <div class="col-md-6" data-aos="fade-right" data-aos-delay="400">
              <div class="d-flex align-items-center p-3 rounded-3 bg-light">
                <i class="fas fa-user-circle text-primary fa-2x me-3"></i>
                <div>
                  <p class="text-muted mb-0">Seller</p>
                  <h6 class="mb-0">${getItem.yourName}</h6>
                </div>
              </div>
            </div>
            <div class="col-md-6" data-aos="fade-left" data-aos-delay="400">
              <div class="d-flex align-items-center p-3 rounded-3 bg-light">
                <i class="fas fa-phone text-primary fa-2x me-3"></i>
                <div>
                  <p class="text-muted mb-0">Contact</p>
                  <h6 class="mb-0">${getItem.yourNumber}</h6>
                </div>
              </div>
            </div>
          </div>

          <div class="d-grid gap-2" data-aos="fade-up" data-aos-delay="500">
            <button id="cartIn" class="btn btn-primary btn-lg rounded-pill">
              <i class="fas fa-shopping-cart me-2"></i>Add to Cart
            </button>
            <a href="index.html" class="btn btn-outline-primary rounded-pill">
              <i class="fas fa-arrow-left me-2"></i>Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
      let cartIn = document.querySelector("#cartIn")
      cartIn.addEventListener("click", (e) => {
          e.preventDefault()
          let isProduct = arra.some((item) => item.productTitle === getItem.productTitle)
          console.log(isProduct);
          if (isProduct) {
              notyf.error("Already in a cart");
          } else {
              arra.push(getItem)
              localStorage.setItem("cart", JSON.stringify(arra))
              notyf.success('🛒 Product added to cart successfully!');
  
          }
  
      })
  })
  


  
  let logoutBtn = document.querySelector("#logoutBtn");
console.log(logoutBtn);
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

}else{
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

