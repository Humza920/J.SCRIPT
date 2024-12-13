const weatherDiv = document.querySelector("#weather")
const p1 = document.querySelector(".humid")
const p2 = document.querySelector(".humity")
const p3 = document.querySelector(".wind")
const p4 = document.querySelector(".speed")
let h1 = document.createElement("h1")
let h2 = document.createElement("h2")
let img = document.createElement("img")
const btn = document.querySelector("button")
const input = document.querySelector("input")

async function defalt() {

    let apiKey = "3c7a07e2b676687d3241b2e719cd4943"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=karachi`
    const data = await fetch(apiUrl + `&appid=${apiKey}`)
    const weatherData = await data.json()
    console.log(weatherData);

    img.setAttribute("class", "weather-icon")
    weatherDiv.appendChild(img)

    if (weatherData.weather[0].main == "Clouds") {
        img.src = "Assets/clouds.png"
    }
    else if (weatherData.weather[0].main == 'Clear') {
        img.src = "Assets/clear.png"
    }
    else if (weatherData.weather[0].main == "Rain") {
        img.src = "Assets/rain.png"
    }
    else if (weatherData.weather[0].main == "Drizzle") {
        img.src = "Assets/drizzle.png"
    }
    else if (weatherData.weather[0].main == "Mist") {
        img.src = "Assets/mist.png"
    }
    else if (weatherData.weather[0].main == "Wind") {
        img.src = "Assets/wind.png"
    }
    else if (weatherData.weather[0].main == "Snow") {
        img.src = "Assets/snow.png"
    }
    else {
        img.src = "Assets/clouds.png"
    }


    h1.setAttribute("class", "temp")
    weatherDiv.appendChild(h1)
    h1.innerHTML = `${Math.round(weatherData.main.temp)}°C`

    h2.setAttribute("class", "city")
    h2.textContent = `Karachi`
    weatherDiv.appendChild(h2)

    p1.innerHTML = `${weatherData.main.humidity}%`
    p2.innerHTML = `Humidity`
    p3.innerHTML = `${weatherData.wind.speed} km/h`
    p4.innerHTML = `Wind Speed`





}
defalt()

let apiKey = "3c7a07e2b676687d3241b2e719cd4943"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

async function check(city) {
    try {
        const data = await fetch(apiUrl + city + `&appid=${apiKey}`)

        if (!data.ok) {
            input.value = ""
            throw new Error("City not found or invalid!")
        } else {
            const weatherData = await data.json()
            console.log(weatherData);

            if (weatherData.weather[0].main == "Clouds") {
                img.src = "Assets/clouds.png"
            }
            else if (weatherData.weather[0].main == 'Clear') {
                img.src = "Assets/clear.png"
            }
            else if (weatherData.weather[0].main == "Rain") {
                img.src = "Assets/rain.png"
            }
            else if (weatherData.weather[0].main == "Drizzle") {
                img.src = "Assets/drizzle.png"
            }
            else if (weatherData.weather[0].main == "Mist") {
                img.src = "Assets/mist.png"
            }
            else if (weatherData.weather[0].main == "Wind") {
                img.src = "Assets/wind.png"
            }
            else if (weatherData.weather[0].main == "Snow") {
                img.src = "Assets/snow.png"
            }
            else {
                img.src = "Assets/clouds.png"
            }

            h1.innerHTML = `${Math.round(weatherData.main.temp)}°C`
            h2.innerHTML = weatherData.name
            p1.innerHTML = `${weatherData.main.humidity}%`
            p2.innerHTML = `Humidity`
            p3.innerHTML = `${weatherData.wind.speed} km/h`
            p4.innerHTML = `Wind Speed`

            input.value = ""
        }




    } catch (error) {
        console.error(error);
        alert(error.message)
    }




}

btn.addEventListener("click", (e) => {
    if (input.value == "") {
        alert("Enter city name first")
    } else {

        e.preventDefault()
        check(input.value)
    }
})
