import { collection, addDoc , doc, setDoc , getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./firebase-config.js";

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true
});

let postAddBtn = document.getElementById("postAdd")
let productTitle = document.getElementById("productTitle")
let productPrice = document.getElementById("productPrice")
let productDescription = document.getElementById("productDescription")
let productImage = document.getElementById("addPost")
let headTwoFromImg =document.getElementById("headTwoFromImg")
let file = null
let convertImg = null
let yourName = document.getElementById("yourName")
let yourNumber = document.getElementById("yourNumber")
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
        <li><a class="dropdown-item" href="index.html">Home</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
      </ul>
    </div>
  `;

  async function createUsersCollection(userId , firstname , lastname ,email) {
    try {
      await setDoc(doc(db , "ALL-USERS" ,`${firstname + lastname}`) , {userId , email})
      console.log("Create User Collection Successful");
    } catch (error) {
      console.log(error);
    }
  }
  createUsersCollection(userShown.userId , userShown.firstname , userShown.lastname ,userShown.email)

  productImage.addEventListener("change" , (e)=>{
    e.preventDefault()
    file = productImage.files[0]    
    console.log(file);
    headTwoFromImg.innerHTML = file.name
})

postAddBtn.addEventListener("click" , (e)=>{
  if (productTitle.value === "" || productPrice.value === "" || productDescription.value === "" || yourName.value === "" || yourNumber.value === "") {
    alert("Please fill in all fields")
    return
  }
  if (!file) {
    alert("PLZ SELECT A PRODUCT IMAGE")
    return
}

  let convertImgToUrl = new FileReader
  convertImgToUrl.readAsDataURL(file)
  convertImgToUrl.onload = function () {
      convertImg = convertImgToUrl.result
      console.log(convertImg);
    
    async function createPostcollection(productTitle , productDescription , productPrice , yourName , yourNumber , convertImg , firstname , lastname) {
      try {
        const postRef = collection(db , "ALL-USERS" , `${firstname + lastname}`,"POSTS")
        const docRef = addDoc(postRef , {productTitle , productDescription , productPrice , yourName , yourNumber , convertImg})
        console.log("Add posted with id " + docRef.id);
      } catch (error) {
        console.log(error);
      }
    }
    createPostcollection(productTitle.value , productDescription.value , productPrice.value , yourName.value , yourNumber.value , convertImg , userShown.firstname , userShown.lastname)
  }
  Swal.fire({
    title: 'Success!',
    text: 'Add Posted Successfully!',
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#007bff'
}).then(() => {
  productTitle.value = "";
  productDescription.value = "";
  productPrice.value = "";
  yourName.value = "";
  yourNumber.value = "";
headTwoFromImg.innerHTML = "Enter Product Photo"
});
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

