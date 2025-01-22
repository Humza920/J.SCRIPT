let div = document.querySelector("#product")
async function check() {
   const data = await fetch('https://fakestoreapi.com/products')
   const show = await data.json()

   render(show)


}






function render(show) {
   div.innerHTML = ""
   console.log(show);
   show.map((item) => {
      div.innerHTML += `<div class="card m-2 shadow-sm border-0" style="width: 16rem; border-radius: 8px;">
  <img src="${item.image}" class="card-img-top" alt="${item.title}" style="height: 200px; object-fit: cover;">
  <div class="card-body p-3 d-flex flex-column">
    <h6 class="card-title text-truncate">${item.title}</h6>
    <p class="card-text text-muted small text-truncate">${item.description}</p>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="badge bg-success">${item.category}</span>
      <span class="text-warning small">
        ${'★'.repeat(Math.floor(item.rating))}${'☆'.repeat(5 - Math.floor(item.rating))}
      </span>
    </div>
    <h5 class="text-danger fw-bold">$${item.price}</h5>
    <button id="add" style = "color: #ffc700;" class="btn btn-dark btn-sm mt-auto w-100" data-index="${item.id}">Add to Cart</button>
  </div>
</div>
`

})


let button = document.querySelectorAll("#add")
button.forEach((addbtn)=>{
   addbtn.addEventListener("click",function(e){
      let index = e.target.dataset.index
      let ara = []
      console.log(index);
      show.map((item)=>{
         if(item.id == index){
            ara.push(item)
            console.log(ara);
            let locget = localStorage.setItem("singleproduct" , JSON.stringify(ara))
            window.location = "singleproduct.html"

         }

      })



      

      
      
   })
})


}
check()



// function addCart() {

// }