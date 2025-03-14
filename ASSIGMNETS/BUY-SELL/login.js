import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./firebase-config.js";


let logIn = document.getElementById("login")
let email = document.getElementById("login-email")
let password = document.getElementById("login-password")



logIn.addEventListener("click", (e) => {
    if (email.value === "" || password.value === "") {
        alert("Please fill in both fields")
    }
    else {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);

                let getThatUsersFromLS = JSON.parse(localStorage.getItem("PROFILE-PIC"))
                console.log(getThatUsersFromLS);
                let filteringThatUser = getThatUsersFromLS.filter((filt)=>{
                    return filt.email === user.email
                })
                filteringThatUser = filteringThatUser[0]
                filteringThatUser.userId = user.uid
                console.log(filteringThatUser);
                localStorage.setItem("User", JSON.stringify(filteringThatUser))
                
                Swal.fire({
                    title: 'Success!',
                    text: 'Log-In successful',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: "#007bff"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "index.html"
                    }
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                Swal.fire({
                    title: 'Error!',
                    text: 'Invalid Email or Password or Please Check Your Network.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33'
                });
            });
    }
})




































