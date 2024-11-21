// FizzBuzz Variation

// function fizzBuzz(n) {
//   for (let i = 1; i <= n; i++) {
//     let output = i;
//     if (i % 3 != 0 && i % 5 != 0) {
//       output = i;
//     }
//     if (i % 3 === 0) {
//       output += "Fizz";
//     }
//     if (i % 5 === 0) {
//       output += "Buzz";
//     }
//     console.log(output);
//   }
// }

// fizzBuzz(+prompt("ENTER NUMBER"));

// const str = "javascript";
// let count = {};

// function check(str) {
//   console.log(str);

//   for (let i = 0; i < str.length; i++) {
//       console.log(str[i]);
//       if (count[str[i]]) {
//         count[str[i]]++
//       } else {
//         count[str[i]] = 1
//       }
//   }

//   return count;
// }
// console.log(check(str));

// let str = "swiss";
// let count = 0;
// function check(str) {
//   for (let i = 0; i < str.length; i++) {
//     count = 0;
//     for (let j = 0; j < str.length; j++) {
//       if (str[i] === str[j]) {
//         console.log(++count);
//       }
//     }
//     if (count == 1) {
//       let ans = str[i];
//       console.log(ans);

//       break;
//     }
//   }
// }

// check(str);

const arr = ["listen", "silent", "enlist", "hello", "ohlle"];
let obj;
let empty = [];
function anagrams(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (
        arr[i].split("").sort().join("") === arr[j].split("").sort().join("")
      ) {
        obj = {
          anagram: [arr[i], arr[j]],
        };
        empty.push(obj);
        console.log(empty);
      }
    }
  }
  return empty
}

console.log(anagrams(arr));

// let arr = ["string" , "bolean" , "number"]

// console.log(arr[1].split("").sort().join());
