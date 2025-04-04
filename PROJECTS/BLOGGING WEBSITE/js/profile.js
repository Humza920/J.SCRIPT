import { collection, updateDoc, doc, getDocs, getDoc, query, orderBy, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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

getUserData()

let userBlogs = [];
let renderUserBlogs = document.getElementById("renderUserBlogs")
let published = document.getElementById("published")
let drafted = document.getElementById("drafted")
let blogslenth = 0
let tblogs = document.getElementById("tblogs")
let tlikes = document.getElementById("tlikes")
let tviews = document.getElementById("tviews")

drafted.addEventListener("click", () => {
    userBlogs = [];
    renderUserBlogs.innerHTML = ""
    getuserBlogs("drafts")
})

published.addEventListener("click", () => {
    userBlogs = [];
    renderUserBlogs.innerHTML = ""
    getuserBlogs("blogs")
})

async function getuserBlogs(blogs_drafts) {
    // Show loading indicator with Swal
    Swal.fire({
        title: 'Loading...',
        html: 'Fetching your blogs...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const user = await getDocs(collection(db, "users", getuidOfUser, blogs_drafts));
        console.log(user.docs);
        user.docs.forEach((doc) => {
            userBlogs.push({
                id: doc.id,
                ...doc.data(),
                userId: getuidOfUser,
            });
        });

        if (user.docs.length === 0) {
            console.log("No blogs found!");
        }

        console.log(userBlogs);

        userBlogs.map((blog) => {
            // Check if it's a draft or published and change status text accordingly
            const statusText = blogs_drafts === "drafts" ? "Drafted" : "Published";
            const statusClass = blogs_drafts === "drafts" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800";

            renderUserBlogs.innerHTML += `
            <li class="px-6 py-4 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-blue-600 truncate">
                            <a href="blog-detail.html">${blog.title}</a>
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            Published on ${blog.createdAt}
                        </p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex space-x-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">
                            ${statusText}
                        </span>
                        <div class="flex space-x-2">
                            <button class="text-blue-500 hover:text-blue-700" id="editBlog" data-id="${blog.id}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="text-red-500 hover:text-red-700" id="deleteBlog" data-id="${blog.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </li>        
            `;
        });

        
        Swal.close();



    } catch (error) {
        console.error("Error fetching user blogs: ", error);
        Swal.close(); 
    }

    tblogs.innerHTML = userBlogs.length
    console.log(tblogs.innerHTML);
    tviews.innerHTML = tblogs.innerHTML * 371
    console.log(tviews.innerHTML);
    tlikes.innerHTML = tblogs.innerHTML * 79
    console.log(tlikes.innerHTML);
    
    let updateBlog = document.querySelectorAll("#editBlog")
    let deleteBlog = document.querySelectorAll("#deleteBlog")

    updateBlog.forEach((btn) => {
        btn.addEventListener("click", async(e)=> {
            e.preventDefault()
            
            const editModal = document.getElementById("editModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const saveChangesBtn = document.getElementById("saveChangesBtn");

function openModal() {
    editModal.classList.remove("hidden");
}

function closeModal() {
    editModal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);
openModal()
            
saveChangesBtn.addEventListener("click", async (e) => {
    e.preventDefault()
            // Validate form inputs here
            const title = document.getElementById("editTitle");
            const content = document.getElementById("editContent");
            
        
        if (title.value === "" || content.value === "") {
            Swal.fire("Error", "Please fill in all fields.", "error");
            return;
        }   
        
    
    try {
                
        let blogId = btn.dataset.id
        console.log(blogId);
        const blogRef = doc(db, "users", getuidOfUser, blogs_drafts, blogId);
        await updateDoc(blogRef , {
            title: title.value,
            content: content.value,
            updatedAt: Timestamp.now()
        });
        console.log("Blog updated successfully!");
        Swal.fire("Success", "Blog updated successfully!", "success");
        // Redirect to blog editor page with blog ID
        setTimeout(() => {
            closeModal()
              
        }, 2000)
        
    } catch (error) {
        console.error("Error updating blog: ", error);                
    }
})


        })
    })

    

}

// Initially fetch published blogs
getuserBlogs("blogs");
