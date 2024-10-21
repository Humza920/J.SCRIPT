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

  let monTh = latestDate.getMonth() + 1;

  if (month.value < monTh) {
    let ageYear = latestDate.getFullYear() - year.value;
    console.log(ageYear);
    let ageMonth = ageYear * 12;
    console.log(ageMonth);
    let ageDays = ageMonth * 30;
    console.log(ageDays);

    div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;

    console.log(div.innerHTML);
  }

  if (month.value > monTh) {
    let ageYear = latestDate.getFullYear() - year.value;
    console.log((ageYear = ageYear - 1));
    let ageMonth = ageYear * 12;
    console.log(ageMonth);
    let ageDays = ageMonth * 30;
    console.log(ageDays);

    div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;

    const hoursBtn = document.querySelector("#Btn-3");
    const headThree = document.querySelector("#head-3");
    console.log(div.innerHTML);

    hoursBtn.addEventListener("click", (e) => {
      e.preventDefault()
      ageHours = ageDays * 24
      console.log(ageHours);
      headThree.innerHTML += `
      YOU LIVE ${ageHours} HOURS ON EARTH SINCE YOUR BIRTH.
      `
    });
  }

  const minutesBtn = document.querySelector("#Btn-4");
  const headFour = document.querySelector("#head-4");
  const secondsBtn = document.querySelector("#Btn-5");
  const headFive = document.querySelector("#head-5");

 
  minutesBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let testFour = latestDate.getFullYear() - year.value - 1;

    testFour = testFour * 12 + latestDate.getMonth();
    testFour = testFour * 30;
    testFour = testFour * 24;
    testFour = testFour * 60 + ageMins;
    console.log(testFour);
    headFour.innerHTML += `
YOU LIVE ${testFour} MINUTES ON EARTH SINCE YOUR BIRTH.
`;
  });

  secondsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let testFive = latestDate.getFullYear() - year.value - 1;

    testFive = testFive * 12 + latestDate.getMonth();
    testFive = testFive * 30;
    testFive = testFive * 24;
    testFive = testFive * 60;
    testFive = testFive * 60 + ageSec;
    console.log(testFive);
    headFive.innerHTML += `
YOU LIVE ${testFive} SECONDS ON EARTH SINCE YOUR BIRTH.
`;
  });
});
