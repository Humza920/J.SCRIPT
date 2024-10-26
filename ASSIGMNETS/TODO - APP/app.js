const todo = document.querySelector("#todo");
const button = document.querySelector("#btn");
const list = document.querySelector("ul");

let arr = [];
button.addEventListener("click", (e) => {
  e.preventDefault();

  arr.push(todo.value);
  console.log(arr);

  list.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    list.innerHTML += `
    <li>${arr[i]} <button id = "btn-1">Edit</button> <button id = "btn-2">Delete</button></li>    
    `;
  }

  todo.value = "";

  const btnOne = document.querySelector("#btn-1");
  const btnTwo = document.querySelector("#btn-2");

  btnOne.addEventListener("click", (e) => {
    e.preventDefault();
    arr.splice(e, 1, prompt("ENTER UPDATED TODO"));
  });
});
