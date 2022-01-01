function getUniqueValues(arr) {
  if (arr.length === 0) return [];

  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j]; // update in place
    }
  }

  // arr = [-1, 1, 2, 3, 4, 5, 6, 7, 5, 6, 7, 7, 7];

  return arr.slice(0, i + 1); // [-1, 1, 2, 3, 4, 5, 6, 7];
}

// [-1,1,2,3,3,3,4,5,5,6,7,7,7]
//             i j
console.log(getUniqueValues([-1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 7, 7, 7]));
