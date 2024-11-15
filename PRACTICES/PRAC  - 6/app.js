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

function check(str) {
  console.log(str);
  let count = [];

  // for (let i = 0; i < str.length; i++) {
  //     console.log(str[i]);
  //     console.log(count[i]);

  //     // if (count[i]) {

  //     // }
  // }
  for (const i of str) {
    // console.log(i);
    // console.log(str);
    if (count[i]) {
      count[i]++;
    } else {
    count[i] = 1;
    }
  }
  return count;
}
console.log(check(str));

