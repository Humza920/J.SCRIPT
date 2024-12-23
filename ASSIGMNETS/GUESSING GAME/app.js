const div = document.getElementById("head")
const btn = document.querySelector("#btn")
const buttonsDiv = document.querySelector("#buttons")
const h1 = document.querySelector("#main")
const h2 = document.querySelector("h2")

btn.addEventListener("click" , (e)=>{
    e.preventDefault()
    h2.innerHTML = `NOW GUESS`
    btn.remove()
    let randomNumber = Math.ceil(Math.random() * 5)
    console.log(randomNumber);
    console.log(buttonsDiv.innerHTML = `
        <button type="button" class="btn btn-secondary">1</button>
     <button type="button" class="btn btn-secondary">2</button>
     <button type="button" class="btn btn-secondary">3</button>
     <button type="button" class="btn btn-secondary">4</button>
     <button type="button" class="btn btn-secondary">5</button> 
       `);
    
       let buttons = document.querySelectorAll("button")
       buttons.forEach((guess)=>{
        guess.addEventListener("click" , (f)=>{
            f.preventDefault()
        let match = f.target.innerHTML
            if (match == randomNumber){
                h2.innerHTML = `CORRECT GUESS`
                buttonsDiv.innerHTML = `<button type="button" class="btn btn-primary">restart</button>`
            } else {
                h2.innerHTML = "WRONG GUESS AGAIN"
                h1.innerHTML = "CHANCE # 1"
            }
            
        })
       })
})

