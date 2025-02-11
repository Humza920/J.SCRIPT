async function check (){
     let data = await fetch('https://fakestoreapi.com/products?limit=100')
     console.log(data);
     let showData = await data.json()
     console.log(showData);
     
     
}
check()