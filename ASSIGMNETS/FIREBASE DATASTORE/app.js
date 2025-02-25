import db from "./config.js"
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
const div = document.getElementById("main");
const inpValue = document.getElementById("inp");
const btn = document.getElementById("addBtn");
let extras = collection(db, "todos")


btn.addEventListener("click" , addToFirestore)



async function addToFirestore() {
  let idNum = Math.random()*20
  idNum = idNum.toFixed(2)
  div.innerHTML = ""
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

      getFromFireStore()
}


// btn.addEventListener("click", async () => {
//   try {
//     console.log(idNum);

//     const docRef = await addDoc(extras, {
//       idd: idNum,
//       text: inpValue.value
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
  


async function getFromFireStore() {
  const querySnapshot = await getDocs(extras);
querySnapshot.forEach((doc) => {
  // console.log(doc.data().text);
  div.innerHTML += `<li>${doc.data().text}</li>`
});
}
  
// //   const querySnapshot = await getDocs(extras);
// //   querySnapshot.forEach((doc) => {
// //     console.log(`${doc.id} => ${doc.data()}`);

// //       if (inpValue.value === "") {
// //     alert("Enter Todo First");
// //   } else {
// //     createdUl.innerHTML += `
// //       <li>${inpValue.value}</li>
// //       <button>Edit</button>
// //       <button>Delete</button>
// //       </br>
// //     `;
// //     div.appendChild(createdUl);

// //   }
// // });


// // inpValue.value = "";
// //   idNum++;
// })