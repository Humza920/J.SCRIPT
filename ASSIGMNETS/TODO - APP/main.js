// Get HTML Elements
const list = document.querySelector("ul")
const inpVal = document.querySelector("#todo")
let arr = []

// Add Todo Function
function addTodo () {
    console.log(inpVal.value);
    arr.push(inpVal.value)
    console.log(arr);
    rendering()
    inpVal.value = ""
}

// Render Screen Function
function rendering () {
    list.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        list.innerHTML += `
        <li>${arr[i]} <button onclick = "edit(${i})" >Edit</button>
        <button onclick = "deleted(${i})" >Delete</button></li>`   
    }
}

// Edit Function
function edit (replace) {
    arr.splice(replace , 1 , prompt("Update to do"))
    rendering()
}

// Delete Function
function deleted (remove) {
    arr.splice(remove , 1)
    rendering()
}