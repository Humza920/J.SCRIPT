let divSingle = document.querySelector("#singlemain");
let locget = localStorage.getItem("singleproduct");
let arr = JSON.parse(localStorage.getItem("cartitems")) || []; // Initialize from localStorage

// Parse the product data if it exists
if (locget) {
    locget = JSON.parse(locget); // Convert string back to object
    console.log("Single Product:", locget); // Debugging: Check the parsed data
}

// Ensure `locget` is parsed before accessing its properties
if (locget && locget.length > 0) {
    const product = locget[0]; // Use the first product object from the array
    const rating = Number(product.rating.rate) || 0; // Convert rating to number
    const stars = `${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}`;

    // Render the product details
    function render(product) {
        divSingle.innerHTML = `
            <div class="row g-4">
                <div class="col-md-6">
                    <img src="${product.image}" alt="${product.title}" class="product-image shadow-sm">
                </div>
                <div class="col-md-6">
                    <h1 class="fw-bold">${product.title}</h1>
                    <p class="text-muted small">Category: <span class="text-primary">${product.category}</span></p>
                    <span class="text-warning">${stars}</span>
                    <p class="price">$${product.price}</p>
                    <p class="product-details">${product.description}</p>
                    <button id="cartIn" data-index="${product.id}" class="btn btn-primary btn-lg w-100">Add to Cart</button>
                </div>
            </div>
        `;

        let cartIn = document.querySelector("#cartIn");
        cartIn.addEventListener("click", (e) => {
            e.preventDefault();

            // Check if the product already exists in the cart
            const isProductInCart = arr.some((item) => item.id === product.id);

            if (!isProductInCart) {
                // Add the product to the cart array
                arr.push(product);
                console.log("Cart Array Updated:", arr);

                // Save the updated cart back to localStorage
                localStorage.setItem("cartitems", JSON.stringify(arr));
                alert("Product added to cart successfully!");
            } else {
                alert("This product is already in the cart.");
            }
        });
    }

    render(product); // Pass single product object to render
} else {
    console.error("No product data found in localStorage.");
}

