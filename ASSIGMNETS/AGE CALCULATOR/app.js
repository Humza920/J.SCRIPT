const form = document.querySelector("form")
const month = document.querySelector("#month")
const year = document.querySelector("#year")
const day = document.querySelector("#days")
const div = document.querySelector("#div1")

form.addEventListener("submit" , (e)=>{
    e.preventDefault()

    const date = new Date()
date.setMonth(month.value - 1)
date.setDate(day.value)
date.setFullYear(year.value)

console.log(date);

const latestDate = new Date()

const ageYear = (latestDate.getFullYear() - year.value - 1);
console.log(ageYear);

const ageMonth = (latestDate.getMonth() + 1)
console.log(ageMonth);

const ageDays = (latestDate.getDate())
console.log(ageDays);

div.innerHTML += `<h2>YOUR AGE IS ${ageYear} YEARS , ${ageMonth} MONTHS AND ${ageDays} DAYS.</h2>`
})


