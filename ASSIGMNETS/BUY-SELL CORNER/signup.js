import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebase-config.js";

let submitRegistration = document.getElementById("submit-registration")
let email = document.getElementById("register-email")
let password = document.getElementById("register-password")
let firstname = document.getElementById("register-firstname")
let lastname = document.getElementById("register-lastname")
let getFileFromInput = document.querySelector("#reg-file")
let getFile = document.querySelector("#getFile")
let file = null
let users = JSON.parse(localStorage.getItem("PROFILE-PIC")) || []
// let userObject = null
console.log(file);

getFileFromInput.addEventListener("change" , (e)=>{
    e.preventDefault()
    file = getFileFromInput.files[0]    	
    getFile.innerHTML = file.name
})

submitRegistration.addEventListener("click" , (e)=>{
    e.preventDefault()
    if (email.value === "" || password.value === "" || firstname.value === "" || lastname.value === "") {
        alert("Please fill in all fields")
    } 
    if (!file) {
        alert("PLZ SELECT A FILE FIRST")
    }
    else{
createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    let convertImgToUrl = new FileReader
    convertImgToUrl.readAsDataURL(file)
    convertImgToUrl.onload = function () {
        let convertImg = convertImgToUrl.result
        console.log(convertImg);
           let userObject = {
            "email" : user.email ,
            "firstname" : firstname.value ,
            "lastname" : lastname.value ,
            "profilePic" : convertImg
            }
            users.push(userObject)
        localStorage.setItem("PROFILE-PIC" , JSON.stringify(users))
        console.log(users);
        
    }
    Swal.fire({
        title: 'Success!',
        text: 'Sign-up successful',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: "#007bff"
      }).then((result)=>{
          if(result.isConfirmed){
              window.location.href = "login.html"
              }
      })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
    });
  });

    }
})


console.log(file);







