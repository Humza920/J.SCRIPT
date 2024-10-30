// function remove() {
// const para = document.getElementById("para");
// let parent = para.parentNode;

// parent.removeChild(para)
// }


let idNum = 1
const div = document.getElementById("main")
const inpValue = document.getElementById("inp")


function addTodo() {

    const createdUl = document.createElement("ul")
    createdUl.setAttribute("id" , idNum)
    createdUl.innerHTML = `
    <li>${inpValue.value}</li> <button onclick = "edit(${idNum})">Edit</button> <button onclick = "remove(${idNum})">Delete</button>
    `
    div.appendChild(createdUl)
    idNum = idNum + 1
    inpValue.value = ""
}

function edit(id) {
    const todoItem = document.getElementById(id)
    todoItem.innerHTML = ` <li>${prompt("ENTER")}</li> <button onclick = "edit(${id})">Edit</button> <button onclick = "remove(${id})">Delete</button>
    `
}

function remove(id) {
    const todoItem = document.getElementById(id)
    const parent = todoItem.parentNode
    parent.removeChild(todoItem)
}