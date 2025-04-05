// Common JavaScript for all pages
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { auth, db } from "./config.js";

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // User dropdown toggle
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', function () {
            userDropdown.classList.toggle('hidden');
        });
    }

    // Toggle between login and signup forms
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const backToLogin = document.getElementById('back-to-login');
    const gotosignup = document.getElementById('gotosignup');


    if (showSignup && showLogin && loginForm && signupForm && backToLogin) {
        showSignup.addEventListener('click', function (e) {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            backToLogin.classList.remove('hidden');
            gotosignup.classList.add('hidden');
        });

        showLogin.addEventListener('click', function (e) {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            backToLogin.classList.add('hidden');
            gotosignup.classList.remove('hidden');
        });
    }

    // Sign up form submission
    const signupButton = document.getElementById('signup-button');
    const signupName = document.getElementById('signup-name');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');
    const signupConfirmPassword = document.getElementById('signup-confirm-password');

    if (signupButton === null) {
        console.log("WE ARE NOT ON AUTH PAGE");
    } else {
        signupButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (signupName.value === "") {
                alert("Please enter your name.");
                return;

            }
            if (signupPassword.value === "" && signupConfirmPassword.value === "") {
                alert("Please enter your password.");
                return;
            }
            if (signupPassword.value !== signupConfirmPassword.value) {
                alert("Passwords do not match.");
                return;
            }

            createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
                .then(async (userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);

                    // Add user data to Firestore

                    try {
                        const docRef = await setDoc(doc(db, "users", user.uid), {
                            name: signupName.value,
                            email: signupEmail.value,
                            uid: user.uid,
                            createdAt: new Date()
                        });
                        console.log("Document written with ID: ", user.uid);
                        console.log("Document ID:", user.uid);

                        // Redirect to dashboard or home page
                        Swal.fire({
                            title: "Account Created Successful!",
                            text: `Welcome ! ${signupName.value}`,
                            icon: "success",
                            confirmButtonText: "OK",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "index.html"; // Redirect to Dashboard
                            }
                        });
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });

        })
    }


    // Login form submission
    const loginButton = document.getElementById('login-button');
    const loginEmail = document.getElementById('email');
    const loginPassword = document.getElementById('password');

    if (loginButton === null) {
        console.log("WE ARE NOT ON AUTH PAGE");

    } else {
        loginButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (loginEmail.value === "") {
                alert("Please enter your email.");
                return;
            }
            if (loginPassword.value === "") {
                alert("Please enter your password.");
                return;
            }
            // Firebase Authentication
            signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    console.log(user);
                    // Redirect to dashboard or home page
                    Swal.fire({
                        title: "Login Successful!",
                        text: `Welcome back! ${user.email}`,
                        icon: "success",
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "index.html"; // Redirect to Dashboard
                        }
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        })
    }

    // Auth state change listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in

            const uid = user.uid;
            console.log("User is signed in:", uid);
            localStorage.setItem("user-uid", uid);
        } else {
            // User is signed out
            console.log("User is signed out");
            if (window.location.pathname !== "/auth.html"
                && window.location.pathname !== "/"
                && window.location.pathname !== "/index.html"
            ) {
                // Redirect to auth page if not already there
                window.location.href = "auth.html";
                return;
            }

        }
    });
});