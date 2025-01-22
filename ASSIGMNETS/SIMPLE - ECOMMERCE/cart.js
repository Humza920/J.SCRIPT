let getcartItems = JSON.parse(localStorage.getItem("cartitems"))
console.log(getcartItems);
let divCart = document.querySelector("#cart")
let count = 1;

function initialize() {
    getcartItems.forEach(item => {
        if (!item.hasOwnProperty('quantity')) {
            item.quantity = 1; // Set default quantity to 1
            console.log(item);

        }
    });
}

function render(product) {
    product.map((items, index) => {
        divCart.innerHTML += `
        <div class="col-lg-8">
        <!-- Item Template -->
        <div class="card mb-3 w-100">
        <div class="card-body">
        <div class="row align-items-center">
        <div class="col-md-2">
        <img src="${items.image}" alt="${items.title}" class="img-fluid">
        </div>
        <div class="col-md-4">
        <h5>${items.title}</h5>
        <p class="text-muted">Category: ${items.category}</p>
        </div>
        <div class="col-md-2">

                                  <span class="fw-bold" id = "itemSpan">${items.price * items.quantity}</span>
                              </div>
                              <div class="col-md-2">
                              <button onclick = "increase(${index})">+</button>
                              <span>${items.quantity}</span>    
                              <button onclick = "decrease(${index})">-</button>
                              </div>
                              <div class="col-md-2 text-end">
                              <button style = "background-color: #ffc700;" class="btn btn-sm">Remove</button>
                              </div>
                          </div>
                      </div>
                  </div>
                                  `
    })
}







function increase(i) {
    divCart.innerHTML = ""
    getcartItems[i].quantity += 1;
    render(getcartItems);
}

function decrease(i) {
    if (getcartItems[i].quantity > 1) {
        divCart.innerHTML = ""
        getcartItems[i].quantity -= 1;
        render(getcartItems)
    }
    else { "there is a single item thats why its not delete" }
}

initialize()
render(getcartItems)




let check = document.querySelector("#checkout")

check.innerHTML = `<div class="col-lg-4 mt-2">
<div class="card">
<div class="card-body">
<h5 class="card-title">Order Summary</h5>
<hr>
<div class="d-flex justify-content-between">
<p>Total Amount</p>
<h5 class="fw-bold" id="totalAmount"></h5>
</div>
<button class="btn btn-primary w-100 mt-3" id="checkoutButton">Proceed to Checkout</button>
</div>
</div>
</div>`




const itemspan = document.querySelectorAll("#itemSpan")
const totalAmount = document.querySelector("#totalAmount")

// itemspan.forEach((x) => {
    const total = Array.from(itemspan).reduce((accumulator, currentSpan) => {
        const price = parseFloat(currentSpan.innerHTML); // Extract the price or quantity
        return accumulator + price; // Add the value to the accumulator
    }, 0);


totalAmount.innerHTML = `${total.toFixed(2)} $`; 








const checkoutButton = document.getElementById('checkoutButton');
const paymentOptions = document.getElementById('paymentOptions');
const paymentSuccessMessage = document.getElementById('paymentSuccessMessage');

// Event listener to open the modal
checkoutButton.addEventListener('click', () => {
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();
});

// Event listener for payment options
const paymentButtons = document.querySelectorAll('.list-group-item');
paymentButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentOptions.classList.add('d-none');
        paymentSuccessMessage.classList.remove('d-none');
    });
});