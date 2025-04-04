import { doc, getDoc, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { db, auth } from "./config.js";
let getuidOfUser = localStorage.getItem("user-uid");
let showuserintead = document.getElementById("profile")
let loginsignprofile = document.getElementById("login-sign-profile")
let user = null;
console.log(getuidOfUser);
if (getuidOfUser) {
    showuserintead.innerHTML = ""
}

async function getUserData() {
    if (!getuidOfUser) {
        console.log("No user found!");
        return;
    }
    console.log("User found!");

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

    showuserintead.innerHTML = `<details class="relative">
    <summary class="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg shadow-sm cursor-pointer list-none">
        <img src="https://tse1.mm.bing.net/th?id=OIP.0iGHOHqzuwsxu_WMdOR4oQAAAA&pid=Api&P=0&h=220" 
             alt="User Profile Picture" 
             class="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm">
        <span class="text-gray-800 font-semibold">${user.name}</span>
    </summary>

    <!-- Dropdown Menu -->
    <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
        <ul class="py-2">
            <li><a href="/dashboard" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a></li>
            <li><a href="/profile.html" class="block px-4 py-2 hover:bg-gray-100">Your Profile</a></li>
            <li><button id="SignOut" class="w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button></li>
        </ul>
    </div>
</details>
`;

    console.log(loginsignprofile);
    loginsignprofile.setAttribute("href", "/profile.html")
    loginsignprofile.innerHTML = "Your Profile"

    let signout = document.getElementById("SignOut")
    signout.addEventListener("click", () => {
        console.log("Sign out clicked");
        signOut(auth).then(() => {
            localStorage.removeItem("user-uid");
            Swal.fire("Logged Out!", "You have been signed out.", "success");
            setTimeout(() => window.location.href = "/auth.html", 1500);
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    })
}



let allUsersPosts = [];
let blogList = document.getElementById("blogList")
async function getPosts() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"))
        console.log(querySnapshot.docs);
        for (const document of querySnapshot.docs) {
            const docId = document.id;
            const docRef = query(collection(db, "users", docId, "blogs")
                , orderBy("createdAt", "asc"));
            const docSnapshot = await getDocs(docRef);

            docSnapshot.forEach((doc) => {
                const postData = doc.data();

                const date = new Date(postData.createdAt.seconds * 1000);
                postData.createdAt = date.toLocaleString("en-US", {
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
                });
            })
        }
        console.log(allUsersPosts);

        allUsersPosts.map((posts)=>{
            blogList.innerHTML += `
                      <div
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div class="p-6">
              <h3
                class="text-xl font-semibold text-gray-800 hover:text-blue-600 mb-2"
              >
                <a href="blog-detail.html">${posts.title}</a>
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-3">
              ${posts.content}
              </p>
              <div
                class="flex justify-between items-center text-sm text-gray-500"
              >
                <span>${posts.name}</span>
                <span>${posts.createdAt}</span>
              </div>
            </div>
          </div>            
            `
        })

    } catch (error) {
        console.log("Error fetching posts: ", error);
        Swal.fire("Error!", "Unable to fetch posts. Please try again later.", "error");
    }
}





getUserData()
getPosts()


