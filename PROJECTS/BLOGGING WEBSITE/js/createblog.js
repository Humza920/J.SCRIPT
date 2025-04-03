import { collection, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { db } from "./config.js";

let blogTitle = document.getElementById("blog-title");
let blogContent = document.getElementById("blog-content");
let publishBlog = document.getElementById("publish-blog");
let blogImg = document.getElementById("blog-img");

publishBlog.addEventListener("click", async (e) => {
    e.preventDefault();
    let statusCheck = document.querySelector("input[name='status']:checked");

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
                createdAt: new Date().toISOString(),
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
            createdAt: new Date().toISOString(),
            image: blogImg ? blogImg : ""  
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
