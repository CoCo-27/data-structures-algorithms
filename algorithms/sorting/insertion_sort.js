// O(n^2)
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const num = arr[i];
    if (num < arr[0]) {
      arr.unshift(arr.splice(i, 1)[0]);
    } else {
      for (let j = 1; j < arr.length; j++) {
        if (num > arr[j - 1] && num < arr[j]) {
          arr.splice(j, 0, arr.splice(i, 1)[0]);
        }
      }
    }
  }
  return arr;
}

// This is the fastest sorting algoritm for when the data is mostly sorted or when the data set is very small
insertionSort([99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]);
