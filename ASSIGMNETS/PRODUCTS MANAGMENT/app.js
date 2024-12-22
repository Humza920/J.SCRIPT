const divPro = document.querySelector("#product");

let products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality sound with noise cancellation and long battery life.",
    price: 59.99,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW97BKgeTsAQdc03MAoJHYdwb9ExCyoiy_pg&s",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Adjustable height and lumbar support for all-day comfort.",
    price: 129.99,
    category: "Furniture",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcShMEqrWt4aR7aBVTf_1k42t2bUbAPOJo_zo_xNjJE-ngELg5vBgE0VSWogB70KI0iLLFBRNrRv4fK-AMdCXYLcMHUymaBggMVmDljf5uUySETyEUiGAukj3POtPclNJ6lvArg3iKjz_w&usqp=CAc",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Smartphone Stand",
    description: "Durable and foldable stand for hands-free smartphone use.",
    price: 12.99,
    category: "Accessories",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcReJchPAXPfBIpUs6jyzOf0mo6z7BsYdB3ZES6Q_YU6q4moE2fsbOLTiCt6_ASVDizdoPqzArfMGzN6XybYOJnwbhkz8AJFp30l72Dm-k-4S2kv7CIL8tohjD-VI48jMtlfHFWG5ng&usqp=CAc",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 18.99,
    category: "Lifestyle",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTSNw3N7vjhfkK42Lm2mS98b61iLp78roZYyx1yhL5jEldMI62MjWsjbR38WEG1Hxeh6_ntbqjdD5DH2Dc2vLE3UMXsWugWE8838Xwb0gVIrmU0aOP7H916tjPCa6fCuUzA1s3Lhkg&usqp=CAc",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    description: "LED desk lamp with touch controls and adjustable brightness.",
    price: 34.99,
    category: "Home Decor",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQmdJu4Wh27x133jnEaaeeg3Vr56Ky0gD_IYN5WLLwQkZegiTQw5KJBpHCJfmjRzn2y0lq6K6EFR4qgFUDriWGQ1tEz9LF7PqdX1Od-nj6sIJhvcJC4_AbdAPvjOCtyxqAgm9GgAo-xEg&usqp=CAc",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    description: "Mechanical keyboard with RGB backlighting for immersive gaming.",
    price: 49.99,
    category: "Gaming",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQzi-DbKMph3T2MmwY-V0cy5h5dArhwiLUtPyA0vBg5-dhMIYBnIR0zJandcfNNriSEHlJT4pAueco7Z9msdHmn7jCm89w45GQOQr-QksMBeo7CACQxkQ4aY8_zBJGiuYBWceg0vecw&usqp=CAc",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Yoga Mat",
    description: "Non-slip and eco-friendly mat for yoga and fitness exercises.",
    price: 24.99,
    category: "Fitness",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQmqMh89flIjm_1_A2x1Qej8WeyneFgf7-3z7FJtZd2LPMXSEA6fkLjHB9XtoSmR2P9m6g8sv-pBMQcwIYgQVzeJnYerGekXtPwDYc3ZybVbZOzPfp8QBSMZcAuw51DB69-FlvneA&usqp=CAc",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Portable Projector",
    description: "Compact and easy-to-use projector for home entertainment.",
    price: 199.99,
    category: "Electronics",
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSkJc-3cUm0-f0a4Ys7M_fLTC0DHGSFmJOksESW4dTxvNZ7DKjk4sOOeeyL-FAB6F7HuNVyEsRqQoBGIdfZzL2NA_BuHplqO4DPk8Qn7vCWxGq9UgYVIGbsgWMx2z8oQ0U1q4d3IwX3idc&usqp=CAc",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Running Shoes",
    description: "Lightweight and breathable shoes designed for comfort and performance.",
    price: 79.99,
    category: "Footwear",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQF7fQhmXGpw7YlUoPaCJLt3Lk6ksc4eAdfn7WG9Ly-f8ju-y1qtuPLRG3Tdc8CgDlxDm5juQaf7vBlKGYpxGOceQcPSatZYTDjWvLqVIOY8UQy7n2R07AnvqLUuWJv2WRsBvKUXw&usqp=CAc",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Coffee Maker",
    description: "Programmable coffee maker with auto-shutoff feature.",
    price: 89.99,
    category: "Kitchen Appliances",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5EihFCwx0UQ8C1Zz7GkDZXjlH1FRYeHTawfN9jmdcYVjZfAYPBvvEYkbvO3Bk5vM-o0IybpfAjm9YZcHWs0-VTQtKibSfl7fVrqYxjnAqWTn3DavazWj4JdiFhMWzvOvdv5lUxA&usqp=CAc",
    rating: 4.4,
  },
];

function render() {
  divPro.innerHTML = ""
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
          <button id ="del" class = "btn btn-outline-primary mt-auto w-100" data-index = ${item.id}>Delete</button>
          </div>
          </div>
          `;
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

    })
  });
}
render()



















