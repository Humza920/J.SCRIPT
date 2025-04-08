import { doc, getDocs, collection, query, orderBy, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { db, auth } from "/js/config.js";

let signout = document.querySelectorAll(".signOut")
console.log(signout);
signout.forEach((signout) => {
    signout.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("Sign out clicked")
        signOut(auth).then(() => {
            console.log("Sign out successful")
            // localStorage.removeItem("user-uid")
            Swal.fire("Logged Out!", "You have been signed out.", "success")
            setTimeout(() => window.location.href = "/auth.html", 1500)
        })
    })
})

