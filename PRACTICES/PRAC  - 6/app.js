function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    let output = i;
    if (i % 3 != 0 && i % 5 != 0) {
      output = i;
      console.log(output);
    }
    if (i % 3 === 0) {
      output += "Fizz";
      console.log(output);
    }
    if (i % 5 === 0) {
      output += "Buzz";
      console.log(output);
    }
  }
}

fizzBuzz(+prompt("ENTER NUMBER"));
