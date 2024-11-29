let string = "";
let buttons = document.querySelectorAll("button");

console.log(buttons);

let inToArray = Array.from(buttons)
console.log(inToArray);


inToArray.forEach(button=>{

    button.addEventListener("click",function(){
        if (button.innerHTML == "=") {
            
        } else {
            
        }
        string += button.textContent;
        console.log(string);
        let input =document.querySelector(".display")
        console.log(input);
        input.value = string;
        })
        
    
})
