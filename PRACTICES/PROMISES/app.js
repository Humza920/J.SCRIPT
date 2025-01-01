// const cart = ["shoes" , "jacket" , "pants" , "shirts"]

// const order = orderCart(cart)
// console.log(order);


// function orderCart(cartItems) {
//     return new Promise((resolve, reject) => {
//         if (!validateCart()) {
//             const err = new Error("INVALID CART")
//             reject(err.message)
//         }
        
//         const orderId = 12345 

//         if (orderId) {
//             resolve(orderId)
//         }
//     })
// }



// function validateCart() {
//     return true
// }


const div = document.getElementById("buttons")
const input = document.querySelector("input")
const butn = document.querySelector("button")
let count = 0

butn.addEventListener("click" , (e)=>{
    e.preventDefault()
    for (let i = 0; i < input.value; i++) {  
        div.innerHTML += `<button type="button">${++count}</button>`
        
        }    
        
})
