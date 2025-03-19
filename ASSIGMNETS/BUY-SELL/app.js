import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./firebase-config.js";

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

let userShown = JSON.parse(localStorage.getItem("User")) || null;
let loginBtn = document.getElementById("login-btn");
let printProducts = document.getElementById("printProducts");
let cartBadge = document.querySelector('.badge');
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
cartBadge.textContent = cartItems.length;

// Add search functionality
const searchInput = document.querySelector('.search-bar input');
let allProductsData = []; // Store all products for filtering

// Add loading indicator initially
printProducts.innerHTML = `
<div class="col-12 text-center py-5" data-aos="fade-up">
  <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
    <span class="visually-hidden">Loading...</span>
  </div>
  <p class="mt-4 text-primary fw-bold">Loading Amazing Products...</p>
</div>
`;

// Function to render products with animation
function renderProducts(products) {
  if (products.length === 0) {
    printProducts.innerHTML = `
      <div class="col-12 text-center py-5" data-aos="fade-up">
        <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg" 
             alt="No products" class="img-fluid mb-4" style="max-width: 300px;">
        <h3 class="text-muted">No products found</h3>
        <p class="text-muted">Try adjusting your search criteria</p>
      </div>
    `;
    return;
  }

  printProducts.innerHTML = "";
  products.forEach((product, index) => {
    printProducts.innerHTML += `
      <div class="col" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card h-100 d-flex flex-column shadow-sm hover-effect border-0 rounded-3 overflow-hidden">
          <div class="position-relative card-image-wrapper">
            <div class="ratio ratio-16x9">
              <img src="${product.convertImg}" class="card-img-top object-fit-cover" alt="${product.productTitle}">
            </div>
            <div class="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between">
              <span class="badge bg-danger">New</span>
              <span class="badge bg-primary price-badge">
                Rs. ${product.productPrice.toLocaleString()}
              </span>
            </div>
            <div class="card-img-overlay d-flex align-items-end p-0">
              <div class="w-100 quick-actions bg-dark bg-opacity-75 p-3 text-white d-flex gap-2 justify-content-around">
                <button class="btn btn-sm btn-light" onclick="addToWishlist('${product.productTitle}')">
                  <i class="far fa-heart"></i>
                </button>
                <button class="btn btn-sm btn-light moreInfo" data-index="${product.productTitle}">
                  <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="btn btn-sm btn-light">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="card-body d-flex flex-column p-4">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0 text-truncate">${product.productTitle}</h5>
              <div class="d-flex align-items-center">
                <span class="text-warning me-1"><i class="fas fa-star"></i></span>
                <span class="text-muted small">4.5</span>
              </div>
            </div>
            <div class="mb-3">
              <span class="badge bg-light text-dark me-1">
                <i class="fas fa-user-circle me-1"></i>${product.yourName || 'Seller'}
              </span>
              <span class="badge bg-light text-dark">
                <i class="fas fa-map-marker-alt me-1"></i>Location
              </span>
            </div>
            <p class="card-text flex-grow-1 text-muted mb-3 description-text">
              ${product.productDescription}
            </p>
            <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
              <div class="text-muted small">
                <i class="fas fa-clock me-1"></i>Posted today
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" onclick="addToWishlist('${product.productTitle}')">
                  <i class="far fa-heart me-1"></i>Save
                </button>
                <button class="btn btn-sm btn-primary moreInfo" data-index="${product.productTitle}">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Add click handlers for moreInfo buttons
  let moreInfo = document.querySelectorAll(".moreInfo");
  moreInfo.forEach((moreInfoBtn) => {
    moreInfoBtn.addEventListener('click', (e) => {
      let index = e.target.closest('.moreInfo').dataset.index;
      products.forEach((filt) => {
        if (index === filt.productTitle) {
          localStorage.setItem("single-product", JSON.stringify(filt));
          window.location = "singleproduct.html";
        }
      });
    });
  });
}

// Add to wishlist function
window.addToWishlist = (productTitle) => {
  if (!userShown) {
    Swal.fire({
      title: "Please Login First",
      text: "You need to be logged in to add items to wishlist",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Login Now",
      cancelButtonText: "Later",
      confirmButtonColor: "#007bff"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "login.html";
      }
    });
    return;
  }
  
  const btn = event.target.closest('button');
  const icon = btn.querySelector('i');
  icon.classList.toggle('far');
  icon.classList.toggle('fas');
  icon.classList.toggle('text-danger');
  
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    icon: 'success',
    title: 'Added to wishlist!'
  });
};

if (userShown != null) {
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
      <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userDropdown">
        <li class="px-3 py-2 d-flex align-items-center">
          <img src="${userShown.profilePic}" class="rounded-circle me-2" width="32" height="32">
          <div class="small">
            <div class="fw-bold">${userShown.firstname} ${userShown.lastname}</div>
            <div class="text-muted">${userShown.email}</div>
          </div>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="adpost.html"><i class="fas fa-plus-circle me-2"></i>Add Post</a></li>
        <li><a class="dropdown-item" href="index.html"><i class="fas fa-home me-2"></i>Home</a></li>
        <li><a class="dropdown-item" href="myposts.html"><i class="fas fa-list me-2"></i>My Posts</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
      </ul>
    </div>
  `;

  async function getAllUsersPosts() {
    try {
      const usersRef = collection(db, "ALL-USERS");
      const usersSnapshot = await getDocs(usersRef);
      
      let allPosts = [];
      
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const postsRef = collection(db, "ALL-USERS", userId, "POSTS");
        const postsSnapshot = await getDocs(postsRef);
        
        postsSnapshot.forEach((postDoc) => {
          allPosts.push({ userId, postId: postDoc.id, ...postDoc.data() });
        });
      }
      
      allProductsData = allPosts;
      renderProducts(allPosts);

      // Add search event listener with debounce
      let timeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const searchTerm = e.target.value.toLowerCase();
          const filteredProducts = allProductsData.filter(product => 
            product.productTitle.toLowerCase().includes(searchTerm) ||
            product.productDescription.toLowerCase().includes(searchTerm)
          );
          renderProducts(filteredProducts);
        }, 300);
      });

    } catch (error) {
      console.error("Error fetching all users' posts:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error loading products. Please try again later.',
      });
    }
  }
  getAllUsersPosts();

  let logoutBtn = document.querySelector("#logoutBtn");
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
} else {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.id === "1" || e.target.id === "login-btn" || e.target.id === "") {
      window.location = "login.html";
    }
  });

  async function getAllUsersPosts() {
    try {
      const usersRef = collection(db, "ALL-USERS");
      const usersSnapshot = await getDocs(usersRef);

      let allPosts = [];

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id;
        const postsRef = collection(db, "ALL-USERS", userId, "POSTS");
        const postsSnapshot = await getDocs(postsRef);

        postsSnapshot.forEach((postDoc) => {
          allPosts.push({ userId, postId: postDoc.id, ...postDoc.data() });
        });
      }

      renderProducts(allPosts);

      let moreInfo = document.querySelectorAll(".moreInfo");
      moreInfo.forEach((moreInfoBtn) => {
        moreInfoBtn.addEventListener('click', () => {
          Swal.fire({
            title: "You Don't Have an Account!",
            text: "Login first to view more information.",
            icon: "warning",
            confirmButtonText: "Login Now",
            confirmButtonColor: "#007bff"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "login.html";
            }
          });
        });
      });

    } catch (error) {
      console.error("Error fetching all users' posts:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error loading products. Please try again later.',
      });
    }
  }
  getAllUsersPosts();
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
