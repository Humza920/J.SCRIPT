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
    <li>${arr[i]}</li>    
    `;
  }

  todo.value = "";
});
