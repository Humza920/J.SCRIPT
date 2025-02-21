import db from "./config.js"
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
const div = document.getElementById("main");
const inpValue = document.getElementById("inp");
const btn = document.getElementById("addBtn");
let extras = collection(db, "todos")
const createdUl = document.createElement("ul");


let idNum = 1;


btn.addEventListener("click", async () => {
  try {
    console.log(idNum);

    const docRef = await addDoc(extras, {
      idd: idNum,
      text: inpValue.value
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  
  
  
  const querySnapshot = await getDocs(extras);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);

      if (inpValue.value === "") {
    alert("Enter Todo First");
  } else {
    createdUl.innerHTML += `
      <li>${inpValue.value}</li>
      <button>Edit</button>
      <button>Delete</button>
      </br>
    `;
    div.appendChild(createdUl);

  }
});


inpValue.value = "";
  idNum++;
})



// Function to add a new todo item
// function addTodo() {
//   createdUl.setAttribute("id", idNum);

//   if (inpValue.value === "") {
//     alert("Enter Todo First");
//   } else {
//     createdUl.innerHTML = `
//       <li>${inpValue.value}</li>
//       <button onclick="edit(${idNum})">Edit</button>
//       <button onclick="remove(${idNum})">Delete</button>
//     `;
//     div.appendChild(createdUl);
//     idNum = idNum + 1;
//   }

//   inpValue.value = "";
// }

// // Function to edit an existing todo item
// function edit(id) {
//   const todoItem = document.getElementById(id);

//   let pom = prompt("Enter Updated Todo");

//   if (pom === "") {
//     alert("Please Enter Updated Todo");
//   } else {
//     todoItem.innerHTML = `
//       <li>${pom}</li>
//       <button onclick="edit(${id})">Edit</button>
//       <button onclick="remove(${id})">Delete</button>
//     `;
//   }
// }

// // Function to remove a todo item
// function remove(id) {
//   const todoItem = document.getElementById(id);
//   const parent = todoItem.parentNode;

//   parent.removeChild(todoItem);
// }
