let divPro = document.querySelector("#product");
let input = document.querySelector("input")
let searchBtn = document.querySelector("#butn")

let products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality sound with noise cancellation and long battery life.",
    price: 59.99,
    category: "Electronics",
    image: "Assets/images.jpeg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Adjustable height and lumbar support for all-day comfort.",
    price: 129.99,
    category: "Furniture",
    image: "Assets/shopping (8).webp",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Smartphone Stand",
    description: "Durable and foldable stand for hands-free smartphone use.",
    price: 12.99,
    category: "Accessories",
    image: "Assets/shopping (7).webp",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 18.99,
    category: "Lifestyle",
    image: "Assets/shopping (6).webp",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    description: "LED desk lamp with touch controls and adjustable brightness.",
    price: 34.99,
    category: "Home Decor",
    image: "Assets/shopping (5).webp",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    description: "Mechanical keyboard with RGB backlighting for immersive gaming.",
    price: 49.99,
    category: "Gaming",
    image: "Assets/shopping (4).webp",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Yoga Mat",
    description: "Non-slip and eco-friendly mat for yoga and fitness exercises.",
    price: 24.99,
    category: "Fitness",
    image: "Assets/shopping (3).webp",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Portable Projector",
    description: "Compact and easy-to-use projector for home entertainment.",
    price: 199.99,
    category: "Electronics",
    image: "Assets/shopping (2).webp",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Running Shoes",
    description: "Lightweight and breathable shoes designed for comfort and performance.",
    price: 79.99,
    category: "Footwear",
    image: "Assets/shopping.webp",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Coffee Maker",
    description: "Programmable coffee maker with auto-shutoff feature.",
    price: 89.99,
    category: "Kitchen Appliances",
    image: "Assets/shopping (1).webp",
    rating: 4.4,
  },
];

function render() {
  divPro.innerHTML = ""
  products.map((item) => {
    divPro.innerHTML += `

          `;

  })

  let delButton = document.querySelectorAll("#del");
  delButton.forEach((btn) => {

    btn.addEventListener("click", (e) => {
      let index = e.target.dataset.index
      console.log(index);

      products = products.filter((x) => {
        return x.id != index
      })
      render()

    })
  });

  searchBtn.addEventListener("click" , (g)=>{
    g.preventDefault()
    products = products.filter((z)=>{
      console.log();
       return z.name.toLowerCase().includes(input.value.toLowerCase())
      // return input.value == z.name
    })
    input.value = ""
    render()
  })
}
render()



















