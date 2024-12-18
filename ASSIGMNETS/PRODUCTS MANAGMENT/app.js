const divPro = document.querySelector("#product");

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality sound with noise cancellation and long battery life.",
    price: 59.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511391400237-9f1d7d4b2a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Adjustable height and lumbar support for all-day comfort.",
    price: 129.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1581282926746-9d3012d735c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Smartphone Stand",
    description: "Durable and foldable stand for hands-free smartphone use.",
    price: 12.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1613483797072-02ad8b1674e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 18.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1571321773440-92f7a1e9c751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    description: "LED desk lamp with touch controls and adjustable brightness.",
    price: 34.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1517702518693-dcf8a7cc88a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    description: "Mechanical keyboard with RGB backlighting for immersive gaming.",
    price: 49.99,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1611241818816-96809f47c21e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Yoga Mat",
    description: "Non-slip and eco-friendly mat for yoga and fitness exercises.",
    price: 24.99,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1579757753652-550941ef7585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Portable Projector",
    description: "Compact and easy-to-use projector for home entertainment.",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1622745932140-b0c0947a0a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Running Shoes",
    description: "Lightweight and breathable shoes designed for comfort and performance.",
    price: 79.99,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1589461269305-5d2498f60148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Coffee Maker",
    description: "Programmable coffee maker with auto-shutoff feature.",
    price: 89.99,
    category: "Kitchen Appliances",
    image: "https://images.unsplash.com/photo-1614181532487-62e446caa148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    rating: 4.4,
  },
];

products.map((item) => {
  divPro.innerHTML += `
        <div class="card m-2 shadow-lg" style="width: 18rem; border-radius: 12px; overflow: hidden;">
          <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 180px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-primary fw-bold">${item.name}</h5>
            <p class="card-text text-muted">${item.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-primary">${item.category}</span>
              <span class="text-warning">
                ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))}
              </span>
            </div>
            <h6 class="mt-3 text-success fw-bold">$${item.price}</h6>
            <button id = "del" class = "btn btn-outline-primary mt-auto w-100" data-index = ${item.id}>Delete</button>
          </div>
        </div>
    `;
});

let delButton = document.querySelectorAll("#del")

delButton.forEach((butn)=>{
  butn.addEventListener("click" , (e)=>{
    console.log("click" );  
    e.preventDefault()
    let index = e.target.dataset.index
    console.log(index);
    
    products.filter( (x)=>{
      return index !== x.index
      }).map((x)=>{
        console.log(x.name);
        
            })
      
      
    } )

    
  })


console.log(delButton);



