const btn = document.querySelector("#btn")
const start = document.querySelector("#start")
const pause = document.querySelector("#Pause")
const h2 = document.querySelector("h2")
let hour = 0 
let minute  = 0
let second = 0
let interval = null 

start.addEventListener("click" , ()=>{

    if (interval === null) {
        interval = setInterval(() => {
            second++
            if (second === 60) {
                minute++
                second = 0
            } 
            if (minute == 60) {
                hour++
                minute = 0
                }
            
                h2.innerHTML = `${hour.toString().padStart(2 , "0")} : ${minute.toString().padStart(2 , "0")} : ${second.toString().padStart(2 , "0")}`
        }, 1000); 
    }

    pause.addEventListener("click" , (e)=>{
        e.preventDefault()
        if (interval) {
            clearInterval(interval)
            interval = null
        }
    })
    })




btn.addEventListener("click" , (e)=>{
    e.preventDefault()
    window.location = "index.html"
})
