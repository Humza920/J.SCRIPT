const form = document.querySelector("form");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const day = document.querySelector("#days");
const div = document.querySelector("#div1");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = new Date();
  date.setMonth(month.value - 1);
  date.setDate(day.value);
  date.setFullYear(year.value);

  console.log(date);

  const latestDate = new Date();

  const ageYear = latestDate.getFullYear() - year.value - 1;
  console.log(ageYear);

  const ageMonth = latestDate.getMonth() + 1;
  console.log(ageMonth);

  const ageDays = latestDate.getDate();
  console.log(ageDays);

  div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;

  console.log(div.innerHTML);

  const monthBtn = document.querySelector("#Btn-1");
  const headOne = document.querySelector("#head-1");
  const daysBtn = document.querySelector("#Btn-2");
  const headTwo = document.querySelector("#head-2");
  const hoursBtn = document.querySelector("#Btn-3");
  const headThree = document.querySelector("#head-3");
  const minutesBtn = document.querySelector("#Btn-4");
  const secondsBtn = document.querySelector("#Btn-5");

  monthBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let testOne = latestDate.getFullYear() - year.value - 1;

    testOne = testOne * 12 + latestDate.getMonth();
    console.log(testOne);
    headOne.innerHTML += `
YOU LIVE ${testOne} MONTHS ON EARTH SINCE YOUR BIRTH.`;
  });

  daysBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let testTwo = latestDate.getFullYear() - year.value - 1;

    testTwo = testTwo * 12 + latestDate.getMonth();
    testTwo = testTwo * 30;
    console.log(testTwo);
    headTwo.innerHTML += `
YOU LIVE ${testTwo} DAYS ON EARTH SINCE YOUR BIRTH.
`;
  });

  hoursBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let testThree = latestDate.getFullYear() - year.value - 1;

    testThree = testThree * 12 + latestDate.getMonth();
    testThree = testThree * 30;
    testThree = testThree * 24;
    console.log(testThree);
    headTwo.innerHTML += `
YOU LIVE ${testThree} HOURS ON EARTH SINCE YOUR BIRTH.
`;
  });
});
