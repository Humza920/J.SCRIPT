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

let totalBlogs = null
let allUsers = null;
let allBlogsLength = null;
let allDraftsLength = null;
let allBlogs = [];
let usersAll = document.getElementById("totalUsers")
let BlogsTotal = document.getElementById("totalBlogs")
let DraftsAll = document.getElementById("draftedBlogs")
let BlogsAll = document.getElementById("publishedBlogs")
let showBlogs = document.getElementById("showBlogs")



async function getDetails() {
    allBlogs = []
    allBlogsLength = 0
    allDraftsLength = 0
    allUsers = 0
    totalBlogs = 0
    showBlogs.innerHTML = "" // Clear previous blogs
    try {
        Swal.fire({
            title: 'Loading...',
            text: 'Fetching dashboard data...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const userRefs = collection(db, "users")
        const totalUsers = await getDocs(userRefs)
        allUsers = totalUsers.docs.length

        for (const doc of totalUsers.docs) {
            const docId = doc.id
            const docRef = query(collection(db, "users", docId, "blogs"), orderBy("createdAt", "desc"))
            const gettingBlogs = await getDocs(docRef)
            gettingBlogs.forEach((doc) => {
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

                allBlogs.push({
                    ...postData,
                    postId: doc.id,
                    userId: docId,
                    createdAt: date
                });
            })
        }
        for (const doc of totalUsers.docs) {
            const docId = doc.id

            const docRef = query(collection(db, "users", docId, "drafts"), orderBy("createdAt", "desc"))
            const gettingDrafts = await getDocs(docRef)
            allDraftsLength += gettingDrafts.docs.length
        }

        allBlogsLength = allBlogs.length
        totalBlogs = allBlogsLength + allDraftsLength

        console.log(allUsers)
        console.log(allDraftsLength)
        console.log(allBlogsLength)
        console.log(totalBlogs)
        console.log(allBlogs)

        usersAll.innerHTML = allUsers - 1
        BlogsTotal.innerHTML = totalBlogs
        DraftsAll.innerHTML = allDraftsLength
        BlogsAll.innerHTML = allBlogsLength

        allBlogs.sort((a, b) => b.createdAt - a.createdAt);

        for (let i = 0; i < Math.min(3, allBlogs.length); i++) {
            showBlogs.innerHTML += `
             <div class="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                        <h3 class="text-lg font-medium text-gray-900">${allBlogs[i].title}</h3>
                        <p class="text-sm text-gray-500 mt-1">${allBlogs[i].name} • Published on ${allBlogs[i].createdAtFormated}</p>
                    </div>
                    <div class="flex space-x-2">
                        <button data-id="${allBlogs[i].postId}" class="deleteBtn text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `
        }
        Swal.close(); // Close loading after everything is done

        let deleteBtn = document.querySelectorAll(".deleteBtn")


        deleteBtn.forEach((btn) => {
            btn.addEventListener("click", async () => {
                try {
                    let postId = btn.getAttribute("data-id")
                    let findUser = allBlogs.find(blog => blog.postId === postId)
                    let userId = findUser.userId
                    Swal.fire({
                        title: 'Are you sure?',
                        text: `You won't to delete ${findUser.name}'s post!`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                await deleteDoc(doc(db, "users", userId, "blogs", postId))
                                // Remove the blog from the allBlogs array
                                getDetails()
                            } catch (error) {
                                console.error("Error deleting blog: ", error);
                            }
                        }
                    })
                } catch (error) {
                    console.error("Error deleting blog: ", error);
        
                }
        
            })
        })



    } catch (error) {
        console.error("Error fetching details: ", error);
        Swal.close(); // Close loading in case of error too
    }
}
getDetails()


