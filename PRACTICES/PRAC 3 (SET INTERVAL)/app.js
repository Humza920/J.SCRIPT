// const h1 = document.querySelector("h1");
// const btnStart = document.querySelector("#start");
// const btnPause = document.querySelector("#pause");
// const btnReset = document.querySelector("#reset");

// let interval = null;
// let hour = 0;
// let min = 0;
// let sec = 0;

// btnStart.addEventListener("click", (e) => {
//   e.preventDefault();

//   if (interval === null) {
//     interval = setInterval(() => {
//       sec++;
//       if (sec === 60) {
//         min++;
//         sec = 0;
//       }
//       if (min === 60) {
//         hour++;
//         min = 0;
//       }

//       h1.innerHTML = `${hour} : ${min} : ${sec}`;
//     }, 1000);
//   }

//   btnPause.addEventListener("click", (e) => {
//     e.preventDefault();
//       clearInterval(interval)
//       interval = null
//   });

//   btnReset.addEventListener("click" , (e)=>{
//     e.preventDefault()
//     location.reload()
    
//   })

// });





// let init = 0
// function round(){
//   var box = document.querySelector('#box');


//   var round = init += 90;
//   box.style.rotate = `${round}deg`
// box.style.backgroundColor = `#${hexColor}`
  // box.style.transition = '0.4s ease-in-out all' 
// }
// function round() {
//   const box = document.getElementById("box")
//  let deg = init += 50
//   box.style.rotate = `${deg}deg`
// deg = deg + 60
// }

// setInterval(round, 100);



const btn = document.querySelector("#Btn")
let init = 0
let interval = null

function round() {
if (interval) {
  clearInterval(interval)
  interval = null
} else {
 interval = setInterval( ()=>{
  const box = document.getElementById("box")
  let deg = init += 50
  box.style.rotate = `${deg}deg`
 } , 100);
}
}

