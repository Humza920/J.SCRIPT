import { doc, getDoc, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { db, auth } from "./config.js";

let getuidOfUser = localStorage.getItem("user-uid");
let showuserintead = document.getElementById("profile");
let loginsignprofile = document.getElementById("login-sign-profile");
let user = null;
let yourPf = document.getElementById("yourPf");

console.log(getuidOfUser);
if (getuidOfUser) {
    showuserintead.innerHTML = "";
    yourPf.setAttribute("href", "/profile.html");
    yourPf.innerHTML = "Your Profile";
}

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
    console.log(querySnapshot);
    const userData = await getDoc(querySnapshot);
    console.log(userData);
    if (!userData.exists()) {
        console.log("No such user found!");
        return;
    }

    user = userData.data();
    console.log(user);

    showuserintead.innerHTML = `
    <details class="relative">
        <summary class="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg shadow-sm cursor-pointer list-none">
            <img src="https://tse1.mm.bing.net/th?id=OIP.0iGHOHqzuwsxu_WMdOR4oQAAAA&pid=Api&P=0&h=220" 
                alt="User Profile Picture" 
                class="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm">
            <span class="text-gray-800 font-semibold">${user.name}</span>
        </summary>
        <!-- Dropdown Menu -->
        <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul class="py-2">
                <li><a href="/create-blog.html" class="block px-4 py-2 hover:bg-gray-100">Create Blog</a></li>
                <li><a href="/profile.html" class="block px-4 py-2 hover:bg-gray-100">Your Profile</a></li>
                <li><button id="SignOut" class="w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button></li>
            </ul>
        </div>
    </details>
    `;

    console.log(loginsignprofile);
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

    // Close Swal after loading user data
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
        console.log(querySnapshot.docs);

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
        console.log(allUsersPosts);

        allUsersPosts.map((posts) => {
            blogList.innerHTML += `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2">
                        <p id="modalOpen" class="cursor-pointer">${posts.title}</p>
                    </h3>
                    <p class="text-gray-600 mb-4 line-clamp-3">
                        ${posts.content}
                    </p>
                    <div class="flex justify-between items-center text-sm text-gray-500">
                        <span>${posts.name}</span>
                        <span>${posts.createdAtFormated}</span>
                    </div>
                </div>
            </div>
            `;
        });

        let modalOpen = document.querySelectorAll("#modalOpen");
        modalOpen.forEach((modOpen) => {
            modOpen.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("Modal Opened");
                let postTitle = e.target.innerText;
                let postContent = e.target.parentElement.nextElementSibling.innerText;
                let postName = e.target.parentElement.parentElement.lastElementChild.firstElementChild.innerText;
                let modalblogtitle = document.getElementById("modal-blog-title");
                modalblogtitle.innerText = postTitle;
                let modalblogcontent = document.getElementById("modal-blog-content");
                modalblogcontent.innerHTML = `
                ${postContent}<div class="flex justify-end mt-3">
                <p>Written By <span class="text-blue-600">${postName}</span><p/>
                </div>
                `;
                let modal = document.getElementById("blog-modal");
                modal.classList.remove("hidden");
                let modalClose = document.getElementById("closeModal");
                modalClose.addEventListener("click", (e) => {
                    e.preventDefault();
                    modal.classList.add("hidden");
                });
            });
        });

        // Hide Swal loader once the posts are loaded
        Swal.close();

    } catch (error) {
        console.log("Error fetching posts: ", error);
        Swal.fire("Error!", "Unable to fetch posts. Please try again later.", "error");
    }
}

getUserData();
getPosts();
