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

const str = "javascript";
let count = {};

function check(str) {
  console.log(str);

  for (let i = 0; i < str.length; i++) {
      console.log(str[i]);
      if (count[str[i]]) {
        count[str[i]]++
      } else {
        count[str[i]] = 1
      }
  }

  return count;
}
console.log(check(str));

console.log(count[0]);
