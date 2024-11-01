const div = document.querySelector("div");

// div.style.cssText = "color: red ; background-color : black;";

const newElement = document.createElement("h1");
newElement.innerHTML = `
HUMZA REHMAN
`;
newElement.style.cssText = "color : white ; background-color : black;"
div.appendChild(newElement);
