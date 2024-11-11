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

    ul.appendChild(li);
    li.innerHTML += `${usersArray[i].name} <button onclick = "updateTodo(${i})" class="update">Edit</button> <button 
        onclick = "deleteTodo(${i})" class="remove">Delete</button>`;
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
