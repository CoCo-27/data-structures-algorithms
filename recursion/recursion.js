// O(n)
function findFactorial(number) {
  // 2! = 2 and 1! = 1 so we can use the shortcut of returning as soon as 2 is hit
  if (number === 2) return 2;

  return number * findFactorial(number - 1);
}

findFactorial(3); // 3 * 2 * 1 = 6

//*------

// Fibonacci sequence = current number is the sum of the previous 2 numbers
// e.g. 0, 1, 1, 2, 3, 5, etc..

// O(2^n) exponential time (really bad! that's why you need to memoize)
function fibonacciRecursive(n) {
  if (n < 2) return n;

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// return the number that will be in the fibonacci sequence at the 8th index
console.log(fibonacciRecursive(8)); // 21

// Iterative version: O(n)
function fibonacciIterative(n) {
  const arr = [0, 1]; // prefill the first 2 numbers in the sequence

  for (let i = 2; i <= n; i++) {
    const sum = arr[i - 1] + arr[i - 2];
    arr.push(sum);
  }

  return arr[n];
}

console.log(fibonacciIterative(8)); // 21

//*------

// Write a function called contains that searches for a value in a nested object. It returns true if the object contains that value.

const contains = (obj, val) => {
  const keys = Object.keys(obj);
  const key = keys[0];

  if (typeof obj[key] === "object") {
    return contains(obj[key], val);
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (obj[key] === val) {
      return true;
    }
  }

  return false;
};

const nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: "foo",
          },
        },
      },
    },
  },
};

console.log(contains(nestedObject, 44)); // true
console.log(contains(nestedObject, "bar")); // false

//*------

// Given a multi-dimensional integer array, return the total number of integers stored inside this array

function totalIntegers(array) {
  if (array.length === 0) return 0;

  let total = 0;
  let first = array.shift();

  if (Array.isArray(first)) {
    total += totalIntegers(first);
  } else if (Number.isInteger(first)) {
    total += 1;
  }

  return total + totalIntegers(array);
}

// const totalIntegers = (arr, total = 0) => {
//   for (let i = 0; i < arr.length; i++) {
//     const val = arr[i];

//     if (Array.isArray(val) && val.length) {
//       total = totalIntegers(val, total);
//     }

//     if (Number.isInteger(val)) {
//       total++;
//     }
//   }

//   return total;
// };

console.log(totalIntegers([[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]])); // 7

//*------

// The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5].
// If the times argument is negative, return an empty array.

const replicate = (times, number) => {
  // return new Array(times).fill(number); // non-recursive version

  if (times <= 0) return [];

  return [number, ...replicate(times - 1, number)];
};

// const replicate = (times, number, arr = []) => {
//   if (times < 0) return [];

//   if (arr.length < times) {
//     arr.push(number);
//     replicate(times, number, arr);
//   }

//   if (arr.length === times) {
//     return arr;
//   }
// };

// non-recursive version
// const replicate = (times, number) =>  new Array(times).fill(number);

console.log(replicate(3, 5)); // [5, 5, 5]
console.log(replicate(1, 69)); // [69]
console.log(replicate(-2, 6)); // []
