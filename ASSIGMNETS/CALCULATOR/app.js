let string = "";
let buttons = document.querySelectorAll("button");

console.log(buttons);

let inToArray = Array.from(buttons);
console.log(inToArray);

inToArray.forEach((button) => {
  button.addEventListener("click", function () {
    if (button.innerHTML === "=") {
      string = eval(string);
      let input = document.querySelector(".display");
      input.value = string;
      console.log(input.innerHTML);
    } else if (button.innerHTML == "AC") {
      let input = document.querySelector(".display");
      string = ""
      input.value = "";
      console.log(input.innerHTML);
    } else {
      string += button.textContent;
      console.log(string);
      let input = document.querySelector(".display");
      input.value = string;
      console.log(input.innerHTML);
    }
  });
});
