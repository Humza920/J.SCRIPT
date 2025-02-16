// const arr = ["apple" , "mango" , "banana"] 

// function create(arrFruits){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => { 
//             if (arr.includes("apple")) {
//                 resolve("YES PRODUCT IS AVAILABLE")
//             } else {
//                 reject("ERROR")
//             }
//         } , 2000) 
//     })

// }

// create(arr)
// .then((response)=>{
//     console.log(response);
// })
// .catch((error)=>{
//     console.log(error);
//     })
const num1 = 0.5

function fun() {
    const ranNum = Math.random() 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1>=ranNum) {
                resolve("AVAILABLE")
            } else {
                reject("OUT OF STOCK")
            }  
        }, 1000);
    })
}

fun()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
    })