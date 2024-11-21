const todo = document.querySelector("#todo");
const button = document.querySelector("#btn");
const list = document.querySelector("ul");

let arr = [];
button.addEventListener("click", (e) => {
  e.preventDefault();

  if (todo.value === "") {
    alert("PLZ ENTER TODO FIRST");
  } else {
    arr.push(todo.value);

    console.log(arr);

    render();

    todo.value = "";
  }
});

function render() {
  list.innerHTML = "";
  arr.forEach((item, index) => {
    list.innerHTML += `<li>
  ${item}
  <button class="edit" data-index="${index}">Edit</button>
  <button class="delete" data-index="${index}">Delete</button>
  </li>`;
  });

  const edit = document.querySelectorAll(".edit");

  edit.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const upDate = prompt("ENTer", arr[index]);
      console.log(upDate);

      if (upDate === "") {
       alert("Enter Updated Todo")
      }
      else{
        arr[index] = upDate;
        render();
      }
    });
  });

  const deleted = document.querySelectorAll(".delete");

  deleted.forEach((deleteIt) => {
    deleteIt.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      arr.splice(index, 1);
      render();
    });
  });
}

//  BY USING FOR LOOP

// function render() {
//     list.innerHTML = "";
//     for (let index = 0; index < arr.length; index++) {
//       list.innerHTML += `
//       <li>${arr[index]} <button class = "edit" data-index="${index}">Edit</button> <button id = "btn-2">Delete</button></li>
//       `;
//     }
