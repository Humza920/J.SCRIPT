AOS.init()
const cart = localStorage.getItem("cart")
let cartItem = JSON.parse(cart)
console.log(cartItem);
let items = document.querySelector("#cart-items")
let userShown = JSON.parse(localStorage.getItem("User")) || null
let loginBtn = document.getElementById("login-btn")


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

  function initialize() {
    cartItem.forEach(item => {
        if (!item.hasOwnProperty('quantity')) {
            item.quantity = 1;
            console.log(item);
        }
    });
}



let cheackoutBtnDiv = document.querySelector("#cheackoutBtnDiv")
function render(cartItem) {
    items.innerHTML = ""
    if (cartItem.length == 0) {
        cheackoutBtnDiv.style.display = "none"
        items.innerHTML = `
            <div class="text-center py-5" data-aos="fade-up" data-aos-duration="1000">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h1 class="display-4 fw-bold text-muted">Your Cart is Empty</h1>
                <p class="lead">Start shopping to add items to your cart!</p>
                <a href="index.html" class="btn btn-primary mt-3">Continue Shopping</a>
            </div>
        `
    } else {
        cartItem.map((print, index) => {
            items.innerHTML += `
               <div class="col-lg-8 mx-auto mt-4" data-aos="fade-up" data-aos-duration="1500"> 
            <div class="card mb-3 w-100 shadow-sm border-0">
                <div class="card-body">
                    <div class="row d-flex align-items-center text-center">
                        <div class="col-md-2">
                            <img src="${print.convertImg}" alt="${print.productTitle}" class="img-fluid rounded shadow-sm">
                        </div>
                        <div class="col-md-3">
                            <h5 class="mb-1 fw-bold">${print.productTitle}</h5>
                        </div>
                        <div class="col-md-2">
                            <span class="fw-bold d-block fs-5 text-primary" id="itemSpan">$${print.productPrice * print.quantity}</span>
                        </div>
                        <div class="col-md-3 d-flex justify-content-center align-items-center">
                            <button class="btn btn-outline-primary btn-sm mx-1 rounded-circle fw-bold" onclick="increase(${index})">+</button>
                            <span class="fw-bold px-3 fs-5"> ${print.quantity} </span>
                            <button class="btn btn-outline-danger btn-sm mx-1 rounded-circle fw-bold" onclick="decrease(${index})">-</button>
                        </div>
                        <div class="col-md-2">
                           <button class="btn btn-warning btn-sm w-100 shadow-sm fw-bold" onclick="remove(${index})">
                               <i class="fas fa-trash-alt me-2"></i>Remove
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        })
    }
}

initialize()
render(cartItem)

function increase(i) {
    console.log("run");
    cartItem[i].quantity += 1
    render(cartItem)
}

function decrease(i) {
    if (cartItem[i].quantity == 1) {
        alert("there is a single item thats why its not delete Click on remove if you want to remove it")
    }
    else {
        cartItem[i].quantity -= 1
        render(cartItem)
    }
}

function remove(index) {
    cartItem.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cartItem));
    render(cartItem); 
}


let checkoutDetails = document.querySelector("#checkoutDetails")

cheackoutBtnDiv.addEventListener("click", (e) => {
    e.preventDefault()
    // let total = 0
    let total = cartItem.map((z) => {
        return z.productPrice * z.quantity
    })

    let totalPrice = total.reduce((accum, current) => {
        return accum + current
    }, 0).toFixed(2)
    console.log(totalPrice);

    checkoutDetails.innerHTML = `
        <div class="p-3">
            <div class="d-flex justify-content-between mb-4">
                <h6 class="fw-bold">Total Items:</h6>
                <span class="badge bg-primary rounded-pill fs-6">${cartItem.length}</span>
            </div>
            <ul class="list-group list-group-flush mb-4">
                ${cartItem.map(item => `
                    <li class="list-group-item d-flex justify-content-between align-items-center py-3">
                        <div>
                            <h6 class="mb-0 fw-bold">${item.productTitle}</h6>
                            <small class="text-muted">Quantity: ${item.quantity}</small>
                        </div>
                        <span class="badge bg-primary rounded-pill fs-6">$${item.productPrice * item.quantity}</span>
                    </li>
                `).join("")}
            </ul>
            <div class="border-top pt-3">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold">Total Amount:</h5>
                    <h5 class="fw-bold text-primary">$${totalPrice}</h5>
                </div>
            </div>
        </div>
    `
})

let confir = document.querySelector("#confirm")

function confirmOrder() {
    cartItem = []
    localStorage.setItem("cart", JSON.stringify(cartItem))
    confir.style.display = "none"
    checkoutDetails.innerHTML = `
        <div class="text-center py-4">
            <i class="fas fa-check-circle text-success fa-4x mb-3"></i>
            <h3 class="fw-bold">Thank You for Your Order!</h3>
            <p class="text-muted">Your order has been successfully placed.</p>
        </div>
    `
    setTimeout(() => {
        location.reload()
    }, 2000)
}




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
        title: "You don't have an account",
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













