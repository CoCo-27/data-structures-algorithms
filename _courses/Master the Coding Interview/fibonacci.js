// Fibonacci sequence = current number is the sum of the previous 2 numbers
// e.g. 0, 1, 1, 2, 3, 5, etc..

// O(2^n) exponential time (really bad! that's why you need to memoize)
function fibonacciRecursive(n) {
  if (n < 2) return n;

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// return the number that will be in the fibonacci sequence at the 8th index
console.log(fibonacciRecursive(8)); // 21

//---

// O(n)
function fibonacciIterative(n) {
  const arr = [0, 1]; // prefill the first 2 numbers in the sequence

  for (let i = 2; i <= n; i++) {
    const sum = arr[i - 1] + arr[i - 2];
    arr.push(sum);
  }

  return arr[n];
}

console.log(fibonacciIterative(8)); // 21
