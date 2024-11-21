// Initialize a unique ID counter for each todo item
let idNum = 1;
const div = document.getElementById("main");
const inpValue = document.getElementById("inp");

// Function to add a new todo item
function addTodo() {
  const createdUl = document.createElement("ul");
  createdUl.setAttribute("id", idNum);

  if (inpValue.value === "") {
    alert("Enter Todo First");
  } else {
    createdUl.innerHTML = `
      <li>${inpValue.value}</li> 
      <button onclick="edit(${idNum})">Edit</button> 
      <button onclick="remove(${idNum})">Delete</button>
    `;
    div.appendChild(createdUl);
    idNum = idNum + 1;
  }

  inpValue.value = "";
}

// Function to edit an existing todo item
function edit(id) {
  const todoItem = document.getElementById(id);

  let pom = prompt("Enter Updated Todo");

  if (pom === "") {
    alert("Please Enter Updated Todo");
  } else {
    todoItem.innerHTML = `
      <li>${pom}</li> 
      <button onclick="edit(${id})">Edit</button> 
      <button onclick="remove(${id})">Delete</button>
    `;
  }
}

// Function to remove a todo item
function remove(id) {
  const todoItem = document.getElementById(id);
  const parent = todoItem.parentNode;

  parent.removeChild(todoItem);
}
