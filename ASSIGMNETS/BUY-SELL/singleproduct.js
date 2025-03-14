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
      divSingle.innerHTML = `<div class="card shadow-sm border-0">
  <img src="${getItem.convertImg}" class="card-img-top" alt="${getItem.productTitle}" 
    style="max-height: 300px; object-fit: contain; background-color: #f8f9fa; padding: 10px; border-radius: 8px;">
  
  <div class="card-body">
    <h3 class="card-title text-dark">${getItem.productTitle}</h3>
    <p class="text-muted">${getItem.productDescription}</p>
    
    <h4 class="text-primary fw-bold">Price: Rs. ${getItem.productPrice}</h4>
    
    <p class="mb-1"><strong>Seller:</strong> ${getItem.yourName}</p>
    <p class="mb-3"><strong>Contact:</strong> ${getItem.yourNumber}</p>
    
    <button id="cartIn" class="btn btn-primary w-100 py-2 fw-bold">🛒 Add to Cart</button>
  </div>
</div>
`;
      let cartIn = document.querySelector("#cartIn")
      cartIn.addEventListener("click", (e) => {
          e.preventDefault()
          let isProduct = arra.some((item) => item.name === product.name)
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

