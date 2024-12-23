const div = document.getElementById("head")
const btn = document.querySelector("#btn")
const buttonsDiv = document.querySelector("#buttons")
const h1 = document.querySelector("#main")
const h2 = document.querySelector("h2")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    h2.innerHTML = `NOW GUESS`
    btn.remove()
    let randomNumber = Math.ceil(Math.random() * 5)
    console.log(randomNumber);
    buttonsDiv.innerHTML = `
        <button type="button" class="btn btn-outline-secondary mx-2 px-4 py-2">1</button>
        <button type="button" class="btn btn-outline-secondary mx-2 px-4 py-2">2</button>
        <button type="button" class="btn btn-outline-secondary mx-2 px-4 py-2">3</button>
        <button type="button" class="btn btn-outline-secondary mx-2 px-4 py-2">4</button>
        <button type="button" class="btn btn-outline-secondary mx-2 px-4 py-2">5</button>
    `;

    let buttons = document.querySelectorAll("button")
    buttons.forEach((guess) => {
        guess.addEventListener("click", (f) => {
            f.preventDefault()
            let match = f.target.innerHTML
            if (match == randomNumber) {
                h2.innerHTML = `<span class="text-success">CORRECT GUESS</span>`
                buttonsDiv.innerHTML = `<button type="button" class="btn btn-primary px-5 py-2">Restart</button>`
            } else {
                h2.innerHTML = `<span class="text-danger">WRONG GUESS AGAIN</span>`
                h1.innerHTML = `<span class="text-warning">CHANCE # 1</span>`
            }
        })
    })
})


