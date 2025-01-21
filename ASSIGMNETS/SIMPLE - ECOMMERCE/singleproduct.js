let divSingle = document.querySelector("#singlemain");
let locget = localStorage.getItem("singleproduct");

// Parse the localStorage data if it exists
if (locget) {
    locget = JSON.parse(locget); // Convert string back to object
    console.log(locget); // Debugging: Check the parsed data
}

// Ensure `locget` is parsed before accessing its properties
if (locget && locget.length > 0) {
    const rating = Number(locget[0].rating.rate) || 0; // Convert rating to number
    const stars = `${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}`;
    
    // Render the product details
    function render(product) {
        divSingle.innerHTML = `
            <div class="row g-4">
                <div class="col-md-6">
                    <img src="${product[0].image}" alt="${product[0].title}" class="product-image shadow-sm">
                </div>
                <div class="col-md-6">
                    <h1 class="fw-bold">${product[0].title}</h1>
                    <p class="text-muted small">Category: <span class="text-primary">${product[0].category}</span></p>
                    <span class="text-warning">${stars}</span>
                    <p class="price">$${product[0].price}</p>
                    <p class="product-details">${product[0].description}</p>
                    <button id = "cartIn" data-index = "${product[0].id}" class="btn btn-primary btn-lg w-100">Add to Cart</button>
                </div>
            </div>
        `;

        let cartIn = document.querySelector("cartIn")
        
    }
    
    render(locget);
} else {
    console.error("No product data found in localStorage.");
}
