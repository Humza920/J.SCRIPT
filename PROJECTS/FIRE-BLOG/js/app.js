import { doc, getDoc, getDocs, query, orderBy, collection } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { db, auth } from "./config.js";

let getuidOfUser = localStorage.getItem("user-uid");
let showuserintead = document.getElementById("profile");
let loginsignprofile = document.getElementById("login-sign-profile");
let changedToPostBlog = document.getElementById("changedToPostBlog");
let user = null;
let yourPf = document.getElementById("yourPf");

if (getuidOfUser === "IVMY0rRbSLauFXzx08UMaPwAKhC3") {
    console.log("ADMIN USER");
    window.location.href = "/admin/index.html"
}

console.log(getuidOfUser);
if (getuidOfUser) {
    showuserintead.innerHTML = "";
    changedToPostBlog.setAttribute("href", "/create-blog.html");
    changedToPostBlog.innerHTML = "Create Blog";
    yourPf.setAttribute("href", "/profile.html");
    yourPf.innerHTML = "Your Profile";
}

// Show Swal Loading Spinner
async function getUserData() {
    if (!getuidOfUser) {
        console.log("No user found!");
        return;
    }
    console.log("User found!");

    // Show loading spinner
    Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch your data.',
        didOpen: () => {
            Swal.showLoading();
        },
        allowOutsideClick: false,
        showConfirmButton: false
    });

    const querySnapshot = doc(db, "users", getuidOfUser);
    const userData = await getDoc(querySnapshot);
    if (!userData.exists()) {
        console.log("No such user found!");
         auth.currentUser.delete()
         console.log("Account deleted!");
         localStorage.removeItem("user-uid");
         Swal.fire("Account Deleted!", "Your account has been deleted.", "success");
         window.location.href = "/auth.html";
        return;
    };

    user = userData.data();
    console.log(user);

    showuserintead.innerHTML = `<details class="relative group" data-aos="fade-down" data-aos-delay="200">
        <summary class="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl cursor-pointer list-none hover:bg-blue-100 transition-all duration-200">
            <img src="https://tse1.mm.bing.net/th?id=OIP.0iGHOHqzuwsxu_WMdOR4oQAAAA&pid=Api&P=0&h=220" 
                 alt="User Profile Picture" 
                 class="w-12 h-12 rounded-full border-2 border-blue-200 shadow-sm object-cover">
            <span class="text-gray-800 font-semibold text-lg">${user.name}</span>
        </summary>

        <!-- Dropdown Menu -->
        <div class="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 opacity-0 group-open:opacity-100 transition-opacity duration-200">
            <ul class="py-2">
                <li><a href="/create-blog.html" class="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200">Create Blog</a></li>
                <li><a href="/profile.html" class="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200">Your Profile</a></li>
                <li><button id="SignOut" class="w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors duration-200">Sign Out</button></li>
            </ul>
        </div>
    </details>`;

    loginsignprofile.setAttribute("href", "/profile.html");
    loginsignprofile.innerHTML = "Your Profile";

    let signout = document.getElementById("SignOut");
    signout.addEventListener("click", () => {
        console.log("Sign out clicked");
        signOut(auth).then(() => {
            localStorage.removeItem("user-uid");
            Swal.fire("Logged Out!", "You have been signed out.", "success");
            setTimeout(() => window.location.href = "/auth.html", 1500);
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    });

    // Close Swal after loading data
    Swal.close();
}

let allUsersPosts = [];
let blogList = document.getElementById("blogList");

async function getPosts() {
    try {
        // Show loading spinner
        Swal.fire({
            title: 'Loading posts...',
            text: 'Fetching the latest blog posts.',
            didOpen: () => {
                Swal.showLoading();
            },
            allowOutsideClick: false,
            showConfirmButton: false
        });

        const querySnapshot = await getDocs(collection(db, "users"));
        for (const document of querySnapshot.docs) {
            const docId = document.id;
            const docRef = query(collection(db, "users", docId, "blogs"), orderBy("createdAt", "desc"));
            const docSnapshot = await getDocs(docRef);

            docSnapshot.forEach((doc) => {
                const postData = doc.data();
                const date = new Date(postData.createdAt.seconds * 1000);
                postData.createdAtFormated = date.toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });

                allUsersPosts.push({
                    ...postData,
                    postId: doc.id,
                    userId: docId,
                    createdAt: date
                });
            });
        }

        allUsersPosts.sort((a, b) => b.createdAt - a.createdAt);
        for (let i = 0; i < Math.min(3, allUsersPosts.length); i++) {
            blogList.innerHTML += `
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300" data-aos="fade-up" data-aos-delay="${i * 100}">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-gray-800 hover:text-blue-600 mb-3">
                            <p id=${!getuidOfUser ? "toAuth" : "modalOpen"} class="cursor-pointer">${allUsersPosts[i].title}</p>
                        </h3>
                        <p class="text-gray-600 mb-4 line-clamp-3 text-lg leading-relaxed">${allUsersPosts[i].content}</p>
                        <div class="flex justify-between items-center text-sm text-gray-500 font-medium">
                            <span class="text-blue-600">${allUsersPosts[i].name}</span>
                            <span>${allUsersPosts[i].createdAtFormated}</span>
                        </div>
                    </div>
                </div>`;
        }

        // Hide Swal loader
        Swal.close();

        let toAuth = document.querySelectorAll("#toAuth");
        toAuth.forEach((Auth) => {
            Auth.addEventListener("click", () => {
                Swal.fire({
                    title: "Please Login to see the blog",
                    text: "You need to login to see the blog",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Login",
                    cancelButtonText: "Cancel"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/auth.html";
                    }
                });
            });
        });

        let modalOpen = document.querySelectorAll("#modalOpen");
        modalOpen.forEach((modOpen) => {
            modOpen.addEventListener("click", (e) => {
                e.preventDefault();
                let postTitle = e.target.innerText;
                let postContent = e.target.parentElement.nextElementSibling.innerText;
                let postName = e.target.parentElement.parentElement.lastElementChild.firstElementChild.innerText;
                let modalblogtitle = document.getElementById("modal-blog-title");
                modalblogtitle.innerText = postTitle;
                let modalblogcontent = document.getElementById("modal-blog-content");
                modalblogcontent.innerHTML = `<div class="text-gray-700 text-lg leading-relaxed">${postContent}</div><div class="flex justify-end mt-4"><p class="text-gray-600 font-semibold">Written By <span class="text-blue-600">${postName}</span></p></div>`;
                let modal = document.getElementById("blog-modal");
                modal.classList.remove("hidden");
                let modalClose = document.getElementById("closeModal");
                modalClose.addEventListener("click", (e) => {
                    e.preventDefault();
                    modal.classList.add("hidden");
                });
            });
        });

    } catch (error) {
        console.log("Error fetching posts: ", error);
        Swal.fire("Error!", "Unable to fetch posts. Please try again later.", "error");
    }
}

getUserData();
getPosts();