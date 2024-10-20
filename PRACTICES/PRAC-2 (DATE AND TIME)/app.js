// let date = new Date()
// console.log(date);
// console.log(date.getDate());

// var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// console.log(weekdays[date.getDay()]);

// var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
// console.log(months[date.getMonth()]);

// console.log(date.getFullYear());
// console.log(date.getHours() );
// console.log(date.getMinutes() );
// console.log(date.getSeconds())
// console.log(date.getMilliseconds())
// console.log(Math.floor(date.getTime()/(1000*60*60*24*365)));

// var doomsday = new Date("Jun 30, 2035")
// console.log(doomsday);
// var currms = date.getTime()
// console.log(currms);

// var doom = doomsday.getTime()
// console.log(doom);

// var emerge =  doom - currms
// console.log(Math.floor(emerge / (1000*60*60*24*365.25)));

// var date = new Date();
// date.setMonth(10)
// date.setDate(10)
// date.setFullYear(2020)
// date.setHours(8)
// date.setMinutes(20)
// date.setSeconds(29);
// console.log(date.toString());
// console.log(date.toLocaleDateString());
// console.log(date.toDateString());
// console.log(date.toISOString());
// console.log(date.toTimeString());

// PRACTICE

const form = document.querySelector("form");
const month = document.querySelector("#month");
const day = document.querySelector("#day");
const year = document.querySelector("#year");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const date = new Date();
  date.setFullYear(year.value);
  date.setMonth(month.value.length);
  date.setDate(day.value);
  console.log(date);
  const latestDate = new Date();
  console.log(latestDate.getFullYear() - year.value - 1 + ">> YEARS");
  console.log(latestDate.getMonth() + "MONTHS");
  // console.log( (latestDate.getFullYear() - year.value - 1 )* 12 );
  let num = (latestDate.getFullYear() - year.value - 1) * 12;
  console.log(num + latestDate.getMonth() + ">> TOTAL-MONTHS");

  console.log(latestDate.getDate() + ">> DAYS");

  let num2 = num * 30;
  console.log(num2);
});
