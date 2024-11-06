const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const btn = document.querySelector("button");

function clock() {
  const currentdate = new Date();

  let hours = currentdate.getHours();

  if (hours >= "00" && hours < "12") {
    hours = hours.toString().padStart(2, "0");
    let am = "AM";
    let mins = currentdate.getMinutes().toString().padStart(2, "0");
    let sec = currentdate.getSeconds().toString().padStart(2, "0");
    h2.innerHTML = `${hours} : ${mins} : ${sec} ${am}`;
  } else {
    hours = hours.toString().padStart(2, "0");
    let pm = "PM";
    let mins = currentdate.getMinutes().toString().padStart(2, "0");
    let sec = currentdate.getSeconds().toString().padStart(2, "0");
    h2.innerHTML = `${hours} : ${mins} : ${sec} ${pm}`;
  }
  setInterval(clock, 1000);
}
clock();

btn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "stopwatch.html";
});
