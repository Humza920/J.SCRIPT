// a. Sum of Two Numbers:
// Sawal: Ek function likho jo 2 numbers ka sum return kare. Function ka naam sum rakho aur usme 2 parameters a aur b hon.

// function sum(a , b) {
//     return a + b
// }

// console.log(sum(2 , 3));

// b. Check Even or Odd:
// Sawal: Ek function likho jo check kare ke number even hai ya odd. Function ka naam checkEvenOdd rakho aur usme ek parameter num hon.

// function checkEvenOdd(num) {
//     if (num % 2 === 0) {
//         console.log("EVEN");

//     } else {
//         console.log("ODD"); 
//     }
// }
// checkEvenOdd(27)

// a. Print Numbers from 1 to N:
// Sawal: Ek function likho jo 1 se N tak numbers print kare. Function ka naam printNumbers rakho aur usme ek parameter n hon.
// let num ;
// function printNumbers(n) {
//     for (let i = 1; i <= n; i++) {
//          num = i
//          console.log(num);
//         }
//         return num

// }
// console.log(printNumbers(28));

// Print Even Numbers from 1 to N:
// Sawal: Ek function likho jo 1 se N tak ke saare even numbers print kare. Function ka naam printEvenNumbers rakho aur usme ek parameter n hon.

// let num = [1 ,2 ,3 ,4, 5, 6, 7 ,8 ,9 ,10]
// function printEvenNumbers(n) {
//     for (let i = 1; i <= n.length; i++) {        
//         if (i % 2 === 0) {
//             console.log(i);
//         }
//     }
// }

// printEvenNumbers(num)

// Find Maximum Number in an Array:
// Sawal: Ek function likho jo ek array mein se maximum number find kare. Function ka naam findMax rakho aur usme ek parameter arr hon.

// let numbers = [39, 45, 43, 32, 102, 79, 140, 120]

// function findMax(arr) {
// let max = arr[0]
// // console.log(max);

// for (let i = 0; i < arr.length; i++) {
//     // console.log(arr[i]);
    
//     if (max<arr[i]) {      
//         max = arr[i]
//         // console.log(max);
        
//     }
// }
// console.log(max);
// return max
// }

// console.log(findMax(numbers));

// Reverse an Array:
// Sawal: Ek function likho jo ek array ko reverse kare. Function ka naam reverseArray rakho aur usme ek parameter arr hon.
// let numbers = [1, 2, 3, 4, 5,]

// function reverseArray(arr) {
//  let rev = arr.reverse()
//  console.log(rev);
 
// }
// reverseArray(numbers)

// ANOTHER APPROACH WITHOUT REVERSE METHOD

// let numbers = [1, 2, 3, 4, 5,]
// let rev = []
// function reverseArray(arr) {
//     for (let i = arr.length - 1; i >= 0; i--) {
//         rev.push(arr[i])
//     }
//     console.log(rev);
// }

// reverseArray(numbers)

// Sawal: Ek function likho jo check kare ke ek string palindrome hai ya nahi. Function ka naam isPalindrome rakho aur usme ek parameter str hon.
// let str = "pop"
// let rts = ""
// function isPalindrome(str) {
//     for (let i = str.length - 1; i >= 0; i--) {
//         rts += str[i]
//     }
//     console.log(rts);
//     if (rts === str) {
//         console.log("PALINDROME");
//     }
//     else{
//         console.log("NOT A PALINDROME");
//     }
    
// }

// isPalindrome(str)

// Count Vowels in a String:
// Sawal: Ek function likho jo ek string mein vowels (a, e, i, o, u) ki counting kare. Function ka naam countVowels rakho aur usme ek parameter str hon.

// let vowelArray = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
// let str = "World"
// let count = 0
// function countVowels(str) {
//     for (let i = 0; i < str.length; i++) {
//         if (vowelArray.includes(str[i])) {
//             console.log(str[i]);
//             count++
//         }
//     }
//     console.log(count);
//     return count
// }
// countVowels(str)

// Ek array diya gaya hai jisme duplicate values hain. Aapko ek aisa function likhna hai jo duplicate values ko remove kare aur unique values ka array return kare.
// let arr = ["humza" , "ashar" , "fahad" , "humza" , "fahad"]
// arr.filter((item)=>{
//     for (let i = 0; i < arr.length; i++) {
//         if (item === arr[i]) {
//             let count = 0
//              count++
//              console.log(count);
             
//         }
//     }

// })
