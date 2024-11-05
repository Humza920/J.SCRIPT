const body = document.querySelector("body");
const btn = document.querySelector("#btn");
const h2 = document.querySelector("h2");
const btn2 = document.querySelector("#btn-2");

let intervalID = null;

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let hexCode = Math.random().toString(16).slice(2, 8).padEnd(6, "0");
  hexCode = "#" + hexCode;
  console.log(hexCode);
  body.style.backgroundColor = hexCode;
  h2.innerHTML = hexCode;
});

btn2.addEventListener("click", (e) => {
  e.preventDefault();

  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
  } else {
    intervalID = setInterval(() => {
      let hexCode = Math.random().toString(16).slice(2, 8).padEnd(6, "0");
      hexCode = "#" + hexCode;
      console.log(hexCode);
      body.style.backgroundColor = hexCode;
      h2.innerHTML = hexCode;
    }, 100);
  }
});
