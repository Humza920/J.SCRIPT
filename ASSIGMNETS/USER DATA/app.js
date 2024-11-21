const input = document.querySelector("#inp");
const div = document.querySelector("#users");
const button = document.querySelector("#Btn");
let idUser = 0;
let usersArray = [];

button.addEventListener("click", (e) => {
  e.preventDefault();
  usersArray.push({
    id: idUser,
    name: input.value,
  });
  rendering();
  input.value = "";
  console.log(usersArray);
  idUser++;
});

function rendering() {
  div.innerHTML = "";

  for (let i = 0; i < usersArray.length; i++) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const btnEdit = document.createElement("button");
    btnEdit.setAttribute("class", "update");
    btnEdit.setAttribute("onclick", `updateTodo(${i})`);
    btnEdit.innerText = "Update";
    const btnDel = document.createElement("button");
    btnDel.setAttribute("onclick", `deleteTodo(${i})`);
    btnEdit.setAttribute("class", "delete");
    btnDel.innerText = "Delete";
    ul.appendChild(li);
    ul.appendChild(btnEdit);
    ul.appendChild(btnDel);

    li.innerHTML += `${usersArray[i].name} `;
    div.appendChild(ul);

    if (usersArray[i].name === undefined) {
      ul.remove(li);
    }
  }
}

function updateTodo(change) {
  usersArray[change].name = prompt("ENTER UPDATE");
  rendering();
}

function deleteTodo(remove) {
  console.log(delete usersArray[remove].name);

  rendering();
}

{
  /* <button onclick = "updateTodo(${i})" class="update">Edit</button> <button 
        onclick = "deleteTodo(${i})" class="remove">Delete</button> */
}
