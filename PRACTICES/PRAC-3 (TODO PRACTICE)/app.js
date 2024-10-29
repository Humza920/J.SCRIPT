// function remove() {
// const para = document.getElementById("para");
// let parent = para.parentNode;

// parent.removeChild(para)
// }


let idNum = 1
const ul = document.getElementById("ul")
const inpValue = document.getElementById("inp")

function addTodo() {
    const create = document.createElement("li")
    create.setAttribute("id" , idNum)
    create.innerHTML = inpValue.value
    idNum = idNum + 1
}