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

let getblogs = []
let render = document.getElementById("render")

async function getAllBlogs() {
    try {
        const allUsers = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")))

        for (const doc of allUsers.docs) {
            let docId = doc.id
            const getBlogs = await getDocs(query(collection(db, "users", docId, "blogs"), orderBy("createdAt", "desc")))
            getBlogs.forEach((blog) => {
                let blogData = blog.data()
                let date = new Date(blogData.createdAt.seconds * 1000)
                blogData.createdAtFormated = date.toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });
                getblogs.push({
                    ...blogData,
                    postId: doc.id,
                    userId: docId,
                    createdAt: date
                })
            })
        }
        console.log(getblogs);
        getblogs.map((blog) => {
            render.innerHTML += `
<div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
    <div class="p-6 space-y-4">
        <!-- Title -->
        <h3 class="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            <p id="modalOpen" class="cursor-pointer">${blog.title}</p>
        </h3>

        <!-- Content -->
        <p class="text-gray-600 text-base leading-relaxed line-clamp-3">
            ${blog.content}
        </p>

        <!-- Meta Info -->
        <div class="flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-200">
            <span class="font-medium">${blog.name}</span>
            <span>${blog.createdAtFormated}</span>
        </div>

        <!-- Delete Button -->
        <div class="flex justify-end">
            <button 
                data-id="${blog.postId}"
                class="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7L5 7M6 7V19a2 2 0 002 2h8a2 2 0 002-2V7M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
                Delete this blog
            </button>
        </div>
    </div>
</div>
            `
        })

        let modalOpen = document.querySelectorAll("#modalOpen")
        console.log(modalOpen);
        
        modalOpen.forEach((open)=>{
            open.addEventListener("click" , (e)=>{
                e.preventDefault()
                console.log("Modal Opened");
                let blogTitle = e.target.innerHTML
                let blogContent = e.target.parentElement.nextElementSibling.innerHTML
                let blogName = e.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.innerText;
                let modalblogtitle = document.getElementById("modal-blog-title");
                modalblogtitle.innerText = blogTitle;
                let modalblogcontent = document.getElementById("modal-blog-content");
                modalblogcontent.innerHTML = `
                ${blogContent}<div class="flex justify-end mt-3">
                <p>Written By <span class="text-blue-600">${blogName}</span><p/>
                </div>
                `;
                let blogModal = document.getElementById("blog-modal")
                blogModal.classList.remove("hidden")

                let modalClose = document.getElementById("closeModal");
                modalClose.addEventListener("click", (e) => {
                    e.preventDefault();
                    blogModal.classList.add("hidden");
                });
            })
        })
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

getAllBlogs()