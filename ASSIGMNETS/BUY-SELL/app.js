import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./firebase-config.js";

let userShown = JSON.parse(localStorage.getItem("User")) || null
let loginBtn = document.getElementById("login-btn")
let printProducts = document.getElementById("printProducts")
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

  async function getAllUsersPosts() {
    try {
      const usersRef = collection(db, "ALL-USERS");
      const usersSnapshot = await getDocs(usersRef);

      console.log("Total users fetched:", usersSnapshot.size); 

      let allPosts = [];

      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id; 
        console.log("Fetching posts for user:", userId); 

        const postsRef = collection(db, "ALL-USERS", userId, "POSTS"); 
        const postsSnapshot = await getDocs(postsRef); 

        console.log(`Total posts for user ${userId}:`, postsSnapshot.size); 

        postsSnapshot.forEach((postDoc) => {
          allPosts.push({ userId, postId: postDoc.id, ...postDoc.data() });
        });
      }

      console.log("All posts fetched:", allPosts); 
      allPosts.map((product) => {
        printProducts.innerHTML += `<div class="col">
    <div class="card h-100 d-flex flex-column shadow-sm">
      <div class="ratio ratio-16x9">
        <img src="${product.convertImg}" class="card-img-top object-fit-cover" alt="Product Image">
      </div>
      <div class="card-body d-flex flex-column p-3">
        <h5 class="card-title mb-2">${product.productTitle}</h5>
        <p class="card-text flex-grow-1 overflow-hidden mb-3" style="max-height: 100px;">
          ${product.productDescription}
        </p>
        <p class="fw-bold mb-3">${product.productPrice}</p>
        <a href="#" class="btn btn-primary mt-auto w-100 py-2 moreInfo"  data-index="${product.productTitle}">More Info</a>
      </div>
    </div>
  </div>`
})

let moreInfo = document.querySelectorAll(".moreInfo")
moreInfo.forEach((moreInfoBtn) => {
  moreInfoBtn.addEventListener('click', (e) => {
    let index = e.target.dataset.index
    console.log(index);
    allPosts.map((filt)=>{
      if (index == filt.productTitle) {
        console.log(filt);
        localStorage.setItem("single-product", JSON.stringify(filt))
        window.location = "singleproduct.html"
      }
    })
  })
})

    } catch (error) {
      console.error("Error fetching all users' posts:", error);
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
}

else {
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault()
    console.log(e.target.id);
    if (e.target.id === "1" || e.target.id === "login-btn" || e.target.id === "") {
      console.log("run");
      window.location = "login.html"
    }
  })


  async function getAllUsersPosts() {
    try {
      const usersRef = collection(db, "ALL-USERS");
      const usersSnapshot = await getDocs(usersRef); // Sab users ko fetch karo

      console.log("Total users fetched:", usersSnapshot.size); // Debug: Check how many users are fetched

      let allPosts = [];

      // Har user ki posts fetch karni hain
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id; // User ka ID
        console.log("Fetching posts for user:", userId); // Debug: Check which user's posts are being fetched

        const postsRef = collection(db, "ALL-USERS", userId, "POSTS"); // User ki posts ka reference
        const postsSnapshot = await getDocs(postsRef); // Us user ki posts fetch karo

        console.log(`Total posts for user ${userId}:`, postsSnapshot.size); // Debug: Check how many posts are fetched

        postsSnapshot.forEach((postDoc) => {
          allPosts.push({ userId, postId: postDoc.id, ...postDoc.data() }); // Sab posts ek array me add kar do
        });
      }

      console.log("All posts fetched:", allPosts); // ✅ Sab users ki sab posts mil gayi!

      allPosts.map((product) => {
        printProducts.innerHTML += `<div class="col">
  <div class="card h-100 d-flex flex-column shadow-sm">
    <div class="ratio ratio-16x9">
      <img src="${product.convertImg}" class="card-img-top object-fit-cover" alt="Product Image">
    </div>
    <div class="card-body d-flex flex-column p-3">
      <h5 class="card-title mb-2">${product.productTitle}</h5>
      <p class="card-text flex-grow-1 overflow-hidden mb-3" style="max-height: 100px;">
        ${product.productDescription}
      </p>
      <p class="fw-bold mb-3">${product.productPrice}</p>
      <a href="#" class="btn btn-primary mt-auto w-100 py-2 moreInfo">More Info</a>
    </div>
  </div>
</div>`
      })

      let moreInfo = document.querySelectorAll(".moreInfo")
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
              window.location.href = "login.html"; // Login page ka link
            }
          });
        })
      })


    } catch (error) {
      console.error("Error fetching all users' posts:", error);
    }
  }

  // Call Function
  getAllUsersPosts();

}
