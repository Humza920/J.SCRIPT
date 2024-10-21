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
  }

  if (month.value > monTh) {
    let ageYear = latestDate.getFullYear() - year.value;
    console.log((ageYear = ageYear - 1));
    let ageMonth = ageYear * 12;
    console.log(ageMonth);
    let ageDays = ageMonth * 30;
    console.log(ageDays);
  }

  testTwo = testTwo * 12 + latestDate.getMonth();
  agedays = testTwo * 30;
  console.log(agedays);

  let hours = latestDate.getHours();
  console.log(hours);

  let mins = latestDate.getMinutes();
  console.log(mins);

  let sec = latestDate.getSeconds();
  console.log(sec);

  div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;

  console.log(div.innerHTML);

  const monthBtn = document.querySelector("#Btn-1");
  const headOne = document.querySelector("#head-1");
  const daysBtn = document.querySelector("#Btn-2");
  const headTwo = document.querySelector("#head-2");
  const hoursBtn = document.querySelector("#Btn-3");
  const headThree = document.querySelector("#head-3");
  const minutesBtn = document.querySelector("#Btn-4");
  const headFour = document.querySelector("#head-4");
  const secondsBtn = document.querySelector("#Btn-5");
  const headFive = document.querySelector("#head-5");

  //   monthBtn.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     let testOne = latestDate.getFullYear() - year.value - 1;

  //     testOne = testOne * 12 + latestDate.getMonth();
  //     console.log(testOne);
  //     headOne.innerHTML += `
  // YOU LIVE ${testOne} MONTHS ON EARTH SINCE YOUR BIRTH.`;
  //   });

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
    if (ageHours >= 12 && ageHours <= 24) {
      testThree = testThree + (24 - ageHours);
    }

    if (ageHours >= 1 && ageHours <= 11) {
      testThree = testThree + (12 - ageHours);
    } else {
      testThree;
    }
    console.log(testThree);
    headThree.innerHTML += `
YOU LIVE ${testThree} HOURS ON EARTH SINCE YOUR BIRTH.
`;
  });

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
