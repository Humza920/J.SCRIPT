import { collection, addDoc, updateDoc , doc , getDoc , Timestamp} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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
    
    const querySnapshot =  doc(db, "users" , getuidOfUser);
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
        signout.addEventListener("click",  ()=>{
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









let blogTitle = document.getElementById("blog-title");
let blogContent = document.getElementById("blog-content");
let publishBlog = document.getElementById("publish-blog");
let blogImg = document.getElementById("blog-img");

publishBlog.addEventListener("click", async (e) => {
    e.preventDefault();
    let statusCheck = document.querySelector("input[name='status']:checked");
    console.log(user);
    

    if (!blogTitle.value || !blogContent.value) {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all fields.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff'
        });
        return;     
    }

    if (!statusCheck) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select a status.',
            icon: 'error',
        });
        return;
    }

    let status = statusCheck.value;

    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while your blog is being saved.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    if (status === "Save as Draft") {
        try {
            const draftRef = collection(db, "users", localStorage.getItem("user-uid"), "drafts");
            const draftDoc = await addDoc(draftRef, {
                title: blogTitle.value,
                content: blogContent.value,
                name: user.name,
                createdAt: Timestamp.now(),
                image: blogImg ? blogImg : ""  
            });

            console.log("Draft created with ID:", draftDoc.id);

            const blogDocRef = doc(db, "users", localStorage.getItem("user-uid"), "drafts", draftDoc.id);
            await updateDoc(blogDocRef, {
                blogId: draftDoc.id  
            });

            Swal.fire({
                title: 'Success!',
                text: 'Blog Drafted Successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#007bff'
            }).then((result) => {
                if (result.isConfirmed) {
                    blogTitle.value = "";
                    blogContent.value = "";
                    document.querySelectorAll("input[name='status']").forEach(radio => {
                        radio.checked = false;
                    });
                }
            });

        } catch (error) {
            console.error("Error adding/updating document:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save draft. Try again.',
                icon: 'error'
            });
        }
        return; 
    }

    try {
        const blogRef = collection(db, "users", localStorage.getItem("user-uid"), "blogs");
        const blogDoc = await addDoc(blogRef, {
            title: blogTitle.value,
            content: blogContent.value,
            createdAt: Timestamp.now(),
            image: blogImg ? blogImg : "" , 
            name: user.name
        });

        console.log("Blog created with ID:", blogDoc.id);

        const blogDocRef = doc(db, "users", localStorage.getItem("user-uid"), "blogs", blogDoc.id);
        await updateDoc(blogDocRef, {
            blogId: blogDoc.id
        });

        Swal.fire({
            title: 'Success!',
            text: 'Blog Posted Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff'
        }).then((result) => {
            if (result.isConfirmed) {
                blogTitle.value = "";
                blogContent.value = "";
                document.querySelectorAll("input[name='status']").forEach(radio => {
                    radio.checked = false;
                });
            }
        });

    } catch (error) {
        console.error("Error adding/updating document:", error);
        Swal.fire({
            title: 'Error!',
            text: 'Failed to post blog. Try again.',
            icon: 'error'
        });
    }
});
