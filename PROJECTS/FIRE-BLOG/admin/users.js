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

let allUsers = []
let blogsPerUser = []
let renderingUsers = document.getElementById("renderUsers")
async function getAllUsers() {
  allUsers = []
  renderingUsers.innerHTML = "" // Clear previous users
  try {
    Swal.fire({
        title: 'Loading...',
        text: 'Fetching all users...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const userRefs = query(collection(db, "users"), orderBy("createdAt", "desc")) 
    const usersDocuments = await getDocs(userRefs)
    for (const blogDoc of usersDocuments.docs) {
      if (blogDoc.id === "IVMY0rRbSLauFXzx08UMaPwAKhC3") {
        console.log("Admin User not included in the blogsPerUser array");
      } else {
        let blogsget = query(collection(db , "users" , blogDoc.id , "blogs"), orderBy("createdAt","desc")) 
        blogsget = await getDocs(blogsget)
        blogsPerUser.push(blogsget.docs.length)
      }
    }

    console.log(blogsPerUser);
    
    usersDocuments.forEach((doc) => {
        let userData = doc.data()
        let date = new Date(userData.createdAt.seconds * 1000)
        userData.createdAtFormated = date.toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
        allUsers.push(userData)
    })
    console.log(allUsers);

    let filtering = allUsers.filter((user) => {
        return user.uid !== "IVMY0rRbSLauFXzx08UMaPwAKhC3"
    })
    console.log(filtering);
    for (let i = 0; i < filtering.length; i++) {
        renderingUsers.innerHTML += `
        <div class="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="${100 + i * 100}">
          <!-- User Info -->
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.0iGHOHqzuwsxu_WMdOR4oQAAAA&pid=Api&P=0&h=220"
              alt="User Avatar"
              class="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform duration-300 hover:scale-105"
            />
            <div class="text-center sm:text-left">
              <h2 class="text-2xl font-semibold text-gray-900">${filtering[i].name}</h2>
              <p class="text-sm text-gray-600 font-medium break-words">${filtering[i].email}</p>
            </div>
          </div>
          <!-- Stats -->
          <div class="mt-6 grid grid-cols-3 text-center gap-4">
            <div>
              <p class="text-3xl font-extrabold text-blue-600">${blogsPerUser[i]}</p>
              <p class="text-sm text-gray-600 font-medium">Blogs</p>
            </div>
            <div>
              <p class="text-3xl font-extrabold text-pink-500">${blogsPerUser[i]*79}</p>
              <p class="text-sm text-gray-600 font-medium">Likes</p>
            </div>
            <div>
              <p class="text-3xl font-extrabold text-yellow-500">${blogsPerUser[i]*371}</p>
              <p class="text-sm text-gray-600 font-medium">Views</p>
            </div>
          </div>
          <hr class="my-6 border-gray-200" />
          <!-- Role and Join Date -->
          <div class="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 font-medium gap-4">
            <p>
              <span class="font-semibold text-gray-900">Role:</span>
              <span class="text-blue-600">User</span>
            </p>
            <p>
              <span class="font-semibold text-gray-900">Joined:</span>
              <span>${filtering[i].createdAtFormated}</span>
            </p>
          </div>
          <!-- Delete Button -->
          <button
            id="bandUser"
            data-id="${filtering[i].uid}"
            class="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white text-sm px-5 py-2.5 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7"
              />
            </svg>
            Delete User Account
          </button>
        </div>
        `
    }

    let bandUser = document.querySelectorAll("#bandUser")
    bandUser.forEach((bandbtn) => {
      bandbtn.addEventListener("click", (e) => {
        e.preventDefault()
        let uidToBandThatUser = e.target.dataset.id
        console.log(uidToBandThatUser);
        Swal.fire({
          title: 'Are you sure you want to delete this user?',
          text: 'This action will permanently delete the user.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete User',
          confirmButtonColor: '#e3342f',
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#6c757d',
          backdrop: true,
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log("user banded");
            await deleteDoc(doc(db, "users", uidToBandThatUser))
            Swal.fire(
              'User Deleted!',
              'User has been deleted successfully',
              'success'
            );
            getAllUsers()
          }
        });
      })
    })
    Swal.close(); // Close loading after rendering
  } catch (error) {
    console.log(error);
    Swal.close(); // Close loading on error
  }
}

getAllUsers()