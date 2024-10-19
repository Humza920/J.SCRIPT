const form = document.querySelector("form")
const month = document.querySelector("#month")
const year = document.querySelector("#year")
const day = document.querySelector("#day")

form.addEventListener("submit" , (e)=>{
    e.preventDefault()
    const currentdate = new Date()
    console.log(currentdate);
    const currentyear = currentdate.getFullYear()
    console.log(currentyear);
    const currentmonth = currentdate.getMonth()
    console.log(currentmonth);
    const currentday = currentdate.getDay()
    console.log(currentday);
    
    
})