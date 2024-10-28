//          // cssText
// const div = document.querySelector("div");

// div.style.cssText = "color: red ; background-color : black;";

// const newElement = document.createElement("h1");
// newElement.innerHTML = `
// HUMZA REHMAN
// `;
// newElement.style.cssText = "color : white ; background-color : black;"
// div.appendChild(newElement);

         // classname
// const div = document.querySelector("div");

// div.style.cssText = "color: red ; background-color : black;";
         
// const newElement = document.createElement("h1");
// newElement.innerHTML = `
// HUMZA REHMAN
// `;
// newElement.style.cssText = "color : white ; background-color : black;"
// newElement.className = "class-1 , class-2 , class-3"
// div.appendChild(newElement);

        // classlist
const div = document.querySelector("div");

// div.style.cssText = "color: red ; background-color : black;";
         
const newElement = document.createElement("h1");
newElement.innerHTML = `
HUMZA REHMAN
`;
// newElement.style.cssText = "color : white ; background-color : black;"
newElement.className = "class-1  class-2  class-3"
newElement.classList.remove("class-3") 
newElement.classList.add("class-4") 
newElement.classList.toggle("class-4" , true) 
newElement.classList.toggle("class-4" , false) 
// newElement.classList.replace("class-3" , "class-4")
div.appendChild(newElement)

