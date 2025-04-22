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
    render.innerHTML = ""
    getblogs = []
    try {
        Swal.fire({
            title: 'Loading...',
            text: 'Fetching all blogs...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

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
        getblogs.map((blog, index) => {
            render.innerHTML += `
<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div class="p-6 space-y-4">
        <!-- Title -->
        <h3 class="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
            <p id="modalOpen" class="cursor-pointer">${blog.title}</p>
        </h3>
        <!-- Content -->
        <p class="text-gray-600 text-base leading-relaxed line-clamp-3">
            ${blog.content}
        </p>
        <!-- Meta Info -->
        <div class="flex justify-between items-center text-sm text-gray-600 font-medium pt-2 border-t border-gray-200">
            <span>${blog.name}</span>
            <span>${blog.createdAtFormated}</span>
        </div>
        <!-- Delete Button -->
        <div class="flex justify-end">
            <button 
                data-id="${blog.blogId}"
                class="deleteBlog flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white text-sm px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        modalOpen.forEach((open) => {
            open.addEventListener("click", (e) => {
                e.preventDefault()
                console.log("Modal Opened");
                let blogTitle = e.target.innerHTML
                let blogContent = e.target.parentElement.nextElementSibling.innerHTML
                let blogName = e.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.innerText;
                let modalblogtitle = document.getElementById("modal-blog-title");
                modalblogtitle.innerText = blogTitle;
                let modalblogcontent = document.getElementById("modal-blog-content");
                modalblogcontent.innerHTML = `
                <div class="prose prose-lg text-gray-700 leading-relaxed" data-aos="fade-in" data-aos-delay="200">
                    ${blogContent}
                </div>
                <div class="flex justify-end mt-6" data-aos="fade-in" data-aos-delay="300">
                    <p class="text-gray-600 font-medium">Written By <span class="text-blue-600 font-semibold">${blogName}</span></p>
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

        let deleteBlog = document.querySelectorAll(".deleteBlog")
        deleteBlog.forEach((del) => {
            del.addEventListener("click", (e) => {
                e.preventDefault()
                let userId = e.target.dataset.id
                let getThatUserData = getblogs.filter((filt) => {
                    return filt.blogId == userId
                })
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await deleteDoc(doc(db, "users", getThatUserData[0].postId, "blogs", getThatUserData[0].blogId));
                            console.log("Blog deleted successfully!");
                            Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
                            setTimeout(() => {
                                getAllBlogs()
                            }, 2000)
                        } catch (error) {
                            console.error("Error deleting blog: ", error);
                            Swal.fire("Error", "Failed to delete blog. Please try again.", "error");
                        }
                    }
                })
            })
        })

        Swal.close(); // Close loading after rendering

    } catch (error) {
        console.error("Error fetching blogs:", error);
        Swal.close(); // Close loading on error
    }
}

getAllBlogs()