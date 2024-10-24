const todo = document.querySelector("#todo");
const button = document.querySelector("#btn");
const list = document.querySelector("ul");

let arr = [];
button.addEventListener("click", (e) => {
  e.preventDefault();

  arr.push(todo.value);
  console.log(arr);

  localStorage.setItem("todo", JSON.stringify(arr));
  const get = localStorage.getItem("todo");
  console.log(get);

  list.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    list.innerHTML += `
    <li>${arr[i]} <button id = "btn-1">Edit</button> <button id = "btn-2">Delete</button></li>    
    `;
const btnOne = document.querySelector("#btn-1")
const btnTwo = document.querySelector("#btn-2")

btnOne.addEventListener("click" , (e) =>{
  e.preventDefault()
  arr.splice( arr[] , 1 , prompt("ENTER UPDATED TODO"))
})
  }

  todo.value = "";

// const btnOne = document.querySelector("#btn-1")
// const btnTwo = document.querySelector("#btn-2")

// btnOne.addEventListener("click" , (e) =>{
//   e.preventDefault()
//   arr.splice( e , 1 , prompt("ENTER UPDATED TODO"))
// })

});








