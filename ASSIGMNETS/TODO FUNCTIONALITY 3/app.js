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

🚀 Day 1, Post 1: Building a Dynamic To-Do List App with JavaScript! 🚀

Starting my 60-day challenge with a To-Do List App 📝 that allows users to add, edit, and delete tasks—an excellent way to practice CRUD operations and DOM manipulation! Here are three different approaches I used to create it:

Approach 1: Basic Array Management 🗂️

Add Task: Checks if the input is empty, then adds the task to an array and displays it on the page.
Render Tasks: Iterates over the array, displaying each task as a list item with "Edit" and "Delete" buttons.
Edit Task: Opens a prompt to update the task, replacing the existing task if a new value is provided.
Delete Task: Removes the task from the array and re-renders the list.
Approach 2: Dynamic DOM Manipulation 🌐

Add Task: Uses an addTodo function that checks for an empty input, adds the task to an array, updates the display, and clears the input field.
Render List: Creates a list item for each task, each with its own "Edit" and "Delete" buttons.
Edit/Delete Task: Uses edit and delete functions to update or remove tasks based on their index in the array.
Approach 3: Unique ID System with Real-Time Updates 🔄

Initialize Unique ID: Each new to-do item has a unique ID, making edits and deletions precise.
Add Task: Creates a unique <ul> for each item, setting its ID and providing edit/delete functionality.
Edit/Delete Task: Identifies tasks by ID, allowing efficient updates or removal directly from the DOM.
This project has been a great start to the challenge, helping me solidify my understanding of arrays, functions, and DOM manipulation! Looking forward to more hands-on learning! 💡✨

#JavaScript #WebDevelopment #CodingChallenge #ToDoListApp #CRUDOperations #FrontendDevelopment #LearningByDoing #60DaysOfCode #CodeNewbie









