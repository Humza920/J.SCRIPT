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
    <li>${inpValue.value}</li>
    `
    div.appendChild(createdUl)
    idNum = idNum + 1
    inpValue.value = ""
}