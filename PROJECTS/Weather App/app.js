// const weatherDiv = document.querySelector("#weather")
// function defalt() {
//     let h1 = document.createElement("h1")
//     h1.setAttribute("class" , "temp")
//     weatherDiv.appendChild(h1)

//     let h2 = document.createElement("h2")
//     h2.setAttribute("class" , "city")
//     weatherDiv.appendChild(h2)
// }

// defalt()

const btn = document.querySelector("button")
const input = document.querySelector("input")
let apiKey = "3c7a07e2b676687d3241b2e719cd4943"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric &q=`

async function check(city) {
    const data = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const weatherData = await data.json()
    console.log(weatherData);
    
}

btn.addEventListener("click" , (e)=>{
    e.preventDefault()
    check(input.value)
})