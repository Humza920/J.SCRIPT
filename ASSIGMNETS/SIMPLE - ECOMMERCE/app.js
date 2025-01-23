const carousel = document.querySelector("#carouselExampleIndicators")

async function check() {
  try {
    const data = await fetch('https://fakestoreapi.com/products')
    const show = await data.json()
    console.log(show);

    let img = show.map((item) => {
      return item.image
    })
    console.log(img);

    carousel.innerHTML += `    
    <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${img[0]}" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="${img[1]}" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="${img[2]}" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
    `
  }
  catch (error) {
    if (error) {
      carousel.innerHTML = `WAIT FOR RESPONSE <br>INTERNET CONNECTION ERROR`
      console.log(error);
    }
  }
}

check()