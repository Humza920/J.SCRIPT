let divSingle = document.querySelector("#singlemain")
let check = localStorage.getItem("cart") 
let arra = JSON.parse(check) || []
console.log(arra);

let ary = []
let get = localStorage.getItem("single-product");
let getItem = JSON.parse(get)
console.log(getItem);
ary.push(getItem)
console.log(ary);

ary.map((product)=>{
    divSingle.innerHTML = `
<div class="row g-4 mt-5">
    <div class="col-md-6 mt-5">
        <img src="${product.img}" alt="${product.name}" class="product-image shadow-sm">
    </div>
    <div class="col" style="margin-top: 100px;">
        <h1 class="fw-bold">${product.name}</h1>
        <p class="text-muted small">Category: <span class="text-warning">${product.category}</span></p>
        <span class="text-warning">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
        <p class="price">$${product.price}</p>
        <p class="product-details">${product.description}</p>
        <button id="cartIn" data-index="${product.id}" class="btn btn-warning btn-lg w-100">Add to Cart</button>
    </div>
</div>
`;
let cartIn = document.querySelector("#cartIn")
cartIn.addEventListener("click" , (e)=>{
    e.preventDefault()
   let isProduct = arra.some((item)=>item.name === product.name)
   console.log(isProduct);
   if (isProduct) {
    alert("already in a cart")
   } else {
    arra.push(getItem)
    localStorage.setItem("cart" , JSON.stringify(arra))
    alert("added")
   }
   
})
})

