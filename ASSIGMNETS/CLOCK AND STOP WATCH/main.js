const h2 = document.querySelector("h2")

let me  ;
let you ;
let we ; 
function start () {
let sec = 0
let mins = 0
let hours = 0 
const sixTy = 60
const twoFour = 24

me = setInterval(function () {
sec += 1

if (sec === sixTy) {
      sec = 0 } 
} , 1000 )

you = setInterval(function () {
mins += 1

if (mins === sixTy) {
    mins = 0  } 
} , 60000)

we = setInterval(function () {
hours += 1
if (hours === twoFour) {
    hours = 0 } 
} , 6000000)

h2.innerHTML = `${hours} : ${mins} : ${sec}`
setInterval(start, 1000);
}




function reset () {
    location.reload()
}


function pause () {
    clearInterval(me,you,we)
}

