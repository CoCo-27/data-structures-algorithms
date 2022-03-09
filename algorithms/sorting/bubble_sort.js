// O(n^2)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      const cur = arr[j];
      const next = arr[j + 1];

      // If this value is bigger than the next, swap values
      if (cur > next) {
        arr[j] = next;
        arr[j + 1] = cur;
      }
    }
  }

  return arr;
}

bubbleSort([100, -40, 500, -124, 0, 21, 7]); // [-124, -40, 0, 7, 21, 100, 500]
