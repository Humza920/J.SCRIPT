import { collection, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./firebase-config.js";

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Initialize Notyf for notifications
const notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
});

// Get user data from localStorage
let userShown = JSON.parse(localStorage.getItem("User")) || null;
let loginBtn = document.getElementById("login-btn");

// Check if user is logged in
if (!userShown) {
    Swal.fire({
        title: "Please Login First",
        text: "You need to be logged in to view your posts",
        icon: "warning",
        confirmButtonText: "Login Now",
        confirmButtonColor: "#007bff"
    }).then(() => {
        window.location.href = "login.html";
    });
} else {
    // Update navbar with user profile
    loginBtn.innerHTML = `
        <div class="dropdown">
            <button class="btn btn-light dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="${userShown.profilePic}" alt="User" id="userProfileImg" class="rounded-circle" width="40" height="40"/>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="adpost.html">Add Post</a></li>
                <li><a class="dropdown-item" href="index.html">Home</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
            </ul>
        </div>
    `;

    // Update profile section
    document.getElementById('userProfileImage').src = userShown.profilePic;
    document.getElementById('userName').textContent = userShown.firstname + " " + userShown.lastname;
    document.getElementById('userEmail').textContent = userShown.email;

    // Function to render user's posts
    function renderUserPosts(posts) {
        const printProducts = document.getElementById("printProducts");
        printProducts.innerHTML = "";
        
        if (posts.length === 0) {
            printProducts.innerHTML = `
                <div class="col-12 text-center py-5" data-aos="fade-up">
                    <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg" 
                         alt="No posts" class="img-fluid mb-4" style="max-width: 300px;">
                    <h3 class="text-muted">No posts yet</h3>
                    <a href="adpost.html" class="btn btn-primary mt-3">
                        <i class="fas fa-plus-circle me-2"></i>Create Your First Post
                    </a>
                </div>
            `;
            return;
        }

        posts.forEach((post, index) => {
            printProducts.innerHTML += `
                <div class="col" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="card h-100 d-flex flex-column shadow-lg border-0 rounded-4 overflow-hidden">
                        <div class="position-relative">
                            <div class="ratio ratio-16x9">
                                <img src="${post.convertImg}" class="card-img-top object-fit-cover" alt="Product Image">
                            </div>
                            <div class="position-absolute top-0 start-0 m-3">
                                <span class="badge bg-primary rounded-pill px-3">
                                    <i class="fas fa-clock me-1"></i>Active
                                </span>
                            </div>
                            <div class="position-absolute top-0 end-0 m-3">
                                <span class="badge bg-success rounded-pill px-3">
                                    Rs. ${post.productPrice}
                                </span>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column p-4">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title mb-0 text-truncate">${post.productTitle}</h5>
                                <div class="dropdown">
                                    <button class="btn btn-light btn-sm" data-bs-toggle="dropdown">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button class="dropdown-item" onclick="editPost('${post.postId}')">
                                                <i class="fas fa-edit me-2 text-primary"></i>Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button class="dropdown-item text-danger" onclick="deletePost('${post.postId}')">
                                                <i class="fas fa-trash-alt me-2"></i>Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p class="card-text flex-grow-1 text-muted mb-3">
                                ${post.productDescription}
                            </p>
                            <div class="d-flex justify-content-between align-items-center pt-3 border-top">
                                <div class="small text-muted">
                                    <i class="fas fa-eye me-1"></i>100 views
                                </div>
                                <div class="btn-group">
                                    <button class="btn btn-sm btn-outline-primary" onclick="editPost('${post.postId}')">
                                        <i class="fas fa-edit me-1"></i>Edit
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" onclick="deletePost('${post.postId}')">
                                        <i class="fas fa-trash-alt me-1"></i>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Update statistics with animations
        const stats = [
            { id: 'totalPosts', value: posts.length },
            { id: 'activePosts', value: posts.length },
            { id: 'totalViews', value: posts.length * 100 }
        ];

        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            element.textContent = '0';
            let current = 0;
            const target = stat.value;
            const duration = 1000;
            const stepTime = 50;
            const steps = duration / stepTime;
            const increment = target / steps;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                element.textContent = Math.round(current);
            }, stepTime);
        });
    }

    // Function to fetch user's posts
    async function getUserPosts() {
        try {
            const postsRef = collection(db, "ALL-USERS", `${userShown.firstname}${userShown.lastname}`, "POSTS");
            const postsSnapshot = await getDocs(postsRef);
            
            const userPosts = [];
            postsSnapshot.forEach((doc) => {
                userPosts.push({ postId: doc.id, ...doc.data() });
            });

            renderUserPosts(userPosts);
        } catch (error) {
            console.error("Error fetching user posts:", error);
            notyf.error("Error loading your posts");
        }
    }

    // Function to delete post
    window.deletePost = async (postId) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDoc(doc(db, "ALL-USERS", `${userShown.firstname}${userShown.lastname}`, "POSTS", postId));
                    notyf.success("Post deleted successfully");
                    getUserPosts(); // Refresh posts
                }
            });
        } catch (error) {
            console.error("Error deleting post:", error);
            notyf.error("Error deleting post");
        }
    };

    // Function to edit post
    window.editPost = async (postId) => {
        const modal = new bootstrap.Modal(document.getElementById('editPostModal'));
        const postsRef = collection(db, "ALL-USERS", `${userShown.firstname}${userShown.lastname}`, "POSTS");
        const postDoc = await getDocs(postsRef);
        
        let post;
        postDoc.forEach((doc) => {
            if (doc.id === postId) {
                post = doc.data();
            }
        });

        if (post) {
            document.getElementById('editTitle').value = post.productTitle;
            document.getElementById('editDescription').value = post.productDescription;
            document.getElementById('editPrice').value = post.productPrice;
            document.getElementById('editPostId').value = postId;
            modal.show();
        }
    };

    // Save edited post
    document.getElementById('saveEditBtn').addEventListener('click', async () => {
        const postId = document.getElementById('editPostId').value;
        const newTitle = document.getElementById('editTitle').value;
        const newDescription = document.getElementById('editDescription').value;
        const newPrice = document.getElementById('editPrice').value;

        try {
            await updateDoc(doc(db, "ALL-USERS", `${userShown.firstname}${userShown.lastname}`, "POSTS", postId), {
                productTitle: newTitle,
                productDescription: newDescription,
                productPrice: newPrice
            });

            const modal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
            modal.hide();
            notyf.success("Post updated successfully");
            getUserPosts(); // Refresh posts
        } catch (error) {
            console.error("Error updating post:", error);
            notyf.error("Error updating post");
        }
    });

    // Logout functionality
    document.querySelector("#logoutBtn").addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "No, stay logged in"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("User");
                window.location = "login.html";
            }
        });
    });

    // Initial load of user's posts
    getUserPosts();
}
