const h1 = document.querySelector("h1");
const btnStart = document.querySelector("#start");
const btnPause = document.querySelector("#pause");
const btnReset = document.querySelector("#reset");

btnStart.addEventListener("click", (e) => {
  e.preventDefault();
  let hour = 0;
  let min = 0;
  let sec = 0;
  let interval = null

if (interval === null) {
  interval = setInterval(() => {
    sec++;
    if (sec === 60) {
      min++;
      sec = 0;
    }
    if (min === 60) {
      hour++;
      min = 0;
    }

    h1.innerHTML = `${hour} : ${min} : ${sec}`;
  }, 1000);
}
else{
  alert("Timer is already running");
}
   
});
