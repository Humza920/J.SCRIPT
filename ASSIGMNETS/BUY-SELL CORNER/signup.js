import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebase-config.js";

let submitRegistration = document.getElementById("submit-registration")
let email = document.getElementById("register-email")
let password = document.getElementById("register-password")
let firstname = document.getElementById("register-firstname")
let lastname = document.getElementById("register-lastname")
let getFileFromInput = document.querySelector("#reg-file")
let getFile = document.querySelector("#getFile")



getFileFromInput.addEventListener("change", () => {
    let file = getFileFromInput.files[0];
    console.log(file);
    if (file) {
        getFile.innerHTML = file.name
    }
    });
    submitRegistration.addEventListener("click", (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
              
                    Swal.fire({
                      title: 'Success!',
                      text: 'Sign-up successful',
                      icon: 'success',
                      confirmButtonText: 'OK',
                      confirmButtonColor: "#007bff"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "login.html"
                            firstname.value = ""
                            lastname.value = ""
                            email.value = ""
                            password.value = ""
                            }
                    })
              
                let convertImgToUrl = new FileReader
                console.log(convertImgToUrl);
                convertImgToUrl.readAsDataURL(file)
                convertImgToUrl.onload = function () {
                    let convertImg = convertImgToUrl.result
                    console.log(convertImg);
                    localStorage.setItem("userProfilePic", convertImg);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);

            });
    })


















