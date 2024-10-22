const form = document.querySelector("form");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const day = document.querySelector("#days");
const div = document.querySelector("#div1");

// MAIN CONTAINER OF WORKING

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // month.value = ""
  // day.value = ""
  // year.value = ""
  div.innerHTML = ""

  const date = new Date();
  date.setMonth(month.value - 1);
  date.setDate(day.value);
  date.setFullYear(year.value);
  console.log(date);

  const latestDate = new Date();
  let monTh = latestDate.getMonth() + 1;

  // CONDITION NO 1

  if (month.value < monTh) {
    let ageYear = latestDate.getFullYear() - year.value;
    console.log(ageYear);
    let ageMonth = ageYear * 12;
    console.log(ageMonth);
    let ageDays = ageMonth * 30;
    console.log(ageDays);

    div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;

    console.log(div.innerHTML);

    const hoursBtn = document.querySelector("#Btn-3");
    const headThree = document.querySelector("#head-3");
    console.log(div.innerHTML);

    hoursBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageHours = ageDays * 24;
      console.log(ageHours);
      headThree.innerHTML += `
      YOU LIVE ${ageHours} HOURS ON EARTH SINCE YOUR BIRTH.
      `;
    });

    const minutesBtn = document.querySelector("#Btn-4");
    const headFour = document.querySelector("#head-4");

    minutesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageMins = ageDays * 24;
      ageMins = ageMins * 60;
      console.log(ageMins);
      headFour.innerHTML += `
      YOU LIVE ${ageMins} MINUTES ON EARTH SINCE YOUR BIRTH.
      `;
    });

    const secondsBtn = document.querySelector("#Btn-5");
    const headFive = document.querySelector("#head-5");

    secondsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageMins = ageDays * 24;
      ageMins = ageMins * 60;
      ageSec = ageMins * 60;
      console.log(ageSec);
      headFive.innerHTML += `
      YOU LIVE ${ageSec} SECONDS ON EARTH SINCE YOUR BIRTH.
      `;
    });
  }

  // CONDITION NO 2

  if (month.value > monTh) {
    let ageYear = latestDate.getFullYear() - year.value;
    console.log((ageYear = ageYear - 1));
    let ageMonth = ageYear * 12;
    console.log(ageMonth);
    let ageDays = ageMonth * 30;
    console.log(ageDays);

    div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;
    console.log(div.innerHTML);

    const hoursBtn = document.querySelector("#Btn-3");
    const headThree = document.querySelector("#head-3");

    hoursBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageHours = ageDays * 24;
      console.log(ageHours);
      headThree.innerHTML += `
      YOU LIVE ${ageHours} HOURS ON EARTH SINCE YOUR BIRTH.
      `;
    });

    const minutesBtn = document.querySelector("#Btn-4");
    const headFour = document.querySelector("#head-4");

    minutesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageMins = ageDays * 24;
      ageMins = ageMins * 60;
      console.log(ageMins);
      headFour.innerHTML += `
      YOU LIVE ${ageMins} MINUTES ON EARTH SINCE YOUR BIRTH.
      `;
    });

    const secondsBtn = document.querySelector("#Btn-5");
    const headFive = document.querySelector("#head-5");

    secondsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageMins = ageDays * 24;
      ageMins = ageMins * 60;
      ageSec = ageMins * 60;
      console.log(ageSec);
      headFive.innerHTML += `
      YOU LIVE ${ageSec} SECONDS ON EARTH SINCE YOUR BIRTH.
      `;
    });
  }

  // CONDITION NO 3

  if (month.value == monTh && day.value >= latestDate.getDate()) {
      let ageYear = latestDate.getFullYear() - year.value;
      console.log(ageYear);
      let ageMonth = ageYear * 12;
      console.log(ageMonth);
      let ageDays = ageMonth * 30;
      console.log(ageDays);
  
      div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;
  
      console.log(div.innerHTML);
  
      const hoursBtn = document.querySelector("#Btn-3");
      const headThree = document.querySelector("#head-3");
      console.log(div.innerHTML);
  
      hoursBtn.addEventListener("click", (e) => {
        e.preventDefault();
        ageHours = ageDays * 24;
        console.log(ageHours);
        headThree.innerHTML += `
        YOU LIVE ${ageHours} HOURS ON EARTH SINCE YOUR BIRTH.
        `;
      });
  
      const minutesBtn = document.querySelector("#Btn-4");
      const headFour = document.querySelector("#head-4");
  
      minutesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        ageMins = ageDays * 24;
        ageMins = ageMins * 60;
        console.log(ageMins);
        headFour.innerHTML += `
        YOU LIVE ${ageMins} MINUTES ON EARTH SINCE YOUR BIRTH.
        `;
      });
  
      const secondsBtn = document.querySelector("#Btn-5");
      const headFive = document.querySelector("#head-5");
  
      secondsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        ageMins = ageDays * 24;
        ageMins = ageMins * 60;
        ageSec = ageMins * 60;
        console.log(ageSec);
        headFive.innerHTML += `
        YOU LIVE ${ageSec} SECONDS ON EARTH SINCE YOUR BIRTH.
        `;
      });
  }

  // CONDITION NO 4

  if (month.value == monTh && day.value < latestDate.getDate()) {
    let ageYear = latestDate.getFullYear() - year.value;
    console.log((ageYear = ageYear - 1));
    let ageMonth = ageYear * 12;
    console.log(ageMonth);
    let ageDays = ageMonth * 30;
    console.log(ageDays);

    div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`;
    console.log(div.innerHTML);

    const hoursBtn = document.querySelector("#Btn-3");
    const headThree = document.querySelector("#head-3");

    hoursBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageHours = ageDays * 24;
      console.log(ageHours);
      headThree.innerHTML += `
      YOU LIVE ${ageHours} HOURS ON EARTH SINCE YOUR BIRTH.
      `;
    });

    const minutesBtn = document.querySelector("#Btn-4");
    const headFour = document.querySelector("#head-4");

    minutesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageMins = ageDays * 24;
      ageMins = ageMins * 60;
      console.log(ageMins);
      headFour.innerHTML += `
      YOU LIVE ${ageMins} MINUTES ON EARTH SINCE YOUR BIRTH.
      `;
    });

    const secondsBtn = document.querySelector("#Btn-5");
    const headFive = document.querySelector("#head-5");

    secondsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      ageMins = ageDays * 24;
      ageMins = ageMins * 60;
      ageSec = ageMins * 60;
      console.log(ageSec);
      headFive.innerHTML += `
      YOU LIVE ${ageSec} SECONDS ON EARTH SINCE YOUR BIRTH.
      `;
    });
  }
});
