AOS.init()
const cart = localStorage.getItem("cart")
let cartItem = JSON.parse(cart)
console.log(cartItem);
let items = document.querySelector("#cart-items")


function initialize() {
    cartItem.forEach(item => {
        if (!item.hasOwnProperty('quantity')) {
            item.quantity = 1;
            console.log(item);
        }
    });
}



let cheackoutBtnDiv = document.querySelector("#cheackoutBtnDiv")
function render(cartItem) {
    items.innerHTML = ""
    if (cartItem.length == 0) {
        cheackoutBtnDiv.style.display = "none"
        items.innerHTML = `<div id = "cart-ite"><h1 data-aos="fade-up" data-aos-duration="1000">NO ITEM IN A CART</h1><div/>`
    } else {
        cartItem.map((print, index) => {
            items.innerHTML += `
               <div class="col-lg-8 mx-auto mt-4" data-aos="fade-up" data-aos-duration="1500> 
            <div class="card mb-3 w-100">
                <div class="card-body">
                    <div class="row d-flex align-items-center text-center">
                        <div class="col-md-2">
                            <img src="${print.img}" alt="${print.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-3">
                            <h5 class="mb-1">${print.name}</h5>
                            <p class="text-muted mb-0">Category: ${print.category}</p>
                        </div>
                        <div class="col-md-2">
                            <span class="fw-bold d-block" id="itemSpan">${print.price * print.quantity} $</span>
                        </div>
                        <div class="col-md-3 d-flex justify-content-center align-items-center">
                            <button class="btn btn-outline-primary btn-sm mx-1" onclick="increase(${index})">+</button>
                            <span class="fw-bold"> ${print.quantity} </span>
                            <button class="btn btn-outline-danger btn-sm mx-1" onclick="decrease(${index})">-</button>
                        </div>
                        <div class="col-md-2">
                            <button style="background-color: #ffc700;" class="btn btn-sm w-100" onclick="remove(${print.id})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        })
    }
}

initialize()
render(cartItem)

function increase(i) {
    console.log("run");
    cartItem[i].quantity += 1
    render(cartItem)
}

function decrease(i) {
    if (cartItem[i].quantity == 1) {
        alert("there is a single item thats why its not delete Click on remove if you want to remove it")
    }
    else {
        cartItem[i].quantity -= 1
        render(cartItem)
    }
}

function remove(i) {
    let index = i
    console.log(index);

    cartItem = cartItem.filter((x) => {
        return x.id != i
    })
    localStorage.setItem("cart", JSON.stringify(cartItem))
    render(cartItem)
    console.log(cartItem);
}


let checkoutDetails = document.querySelector("#checkoutDetails")

cheackoutBtnDiv.addEventListener("click", (e) => {
    e.preventDefault()
    // let total = 0
    let total = cartItem.map((z) => {
        return z.price * z.quantity
    })

    let totalPrice = total.reduce((accum, current) => {
        return accum + current
    }, 0).toFixed(2)
    console.log(totalPrice);

    checkoutDetails.innerHTML = `<p>Total Items: ${cartItem.length}</p>
        <p>Total Price: <strong>${totalPrice} $</strong></p>
        <ul class="list-group">
            ${cartItem.map(item => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} x ${item.quantity}
                    <span class="badge bg-primary rounded-pill">${item.price * item.quantity} $</span>
                </li>
            `).join("")}
        </ul>
    `
})

let confir = document.querySelector("#confirm")

function confirmOrder() {
    console.log("run");
    cartItem = []
    localStorage.setItem("cart", JSON.stringify(cartItem))
    confir.style.display = "none"
    checkoutDetails.innerHTML = `<h1>THANK YOU FOR SHOPPING</h1>`
    setTimeout(() => {
        location.reload()
    }, 2000)
}