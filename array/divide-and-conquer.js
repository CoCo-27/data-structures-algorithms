// Divide and conquer aka Binary Search

// Divide and conquer + recursive solution - O(n log n)
function arrayContains(nums, target, iteration = 1) {
  console.log("iteration: ", iteration);

  const midIndex = Math.floor(nums.length / 2);

  // Not found and end of the line
  if (midIndex === 0 && nums[0] !== target) {
    return -1;
  }

  // Found
  if (nums[midIndex] === target) {
    return nums[midIndex];
  }
  // First half
  else if (nums[midIndex] > target) {
    return binarySearch(nums.slice(0, midIndex), iteration + 1);
  }
  // Second half
  else if (nums[midIndex] < target) {
    return binarySearch(nums.slice(midIndex), iteration + 1);
  }

  return arrayContains(nums, target);
}

arrayContains([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8); // Takes 2 iterations

//*-------------------------- vs --------------------------*//

// Traditional way - (On)
function arrayContains(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    console.log("iteration: ", i + 1);

    if (arr[i] === val) {
      return true;
    }
  }

  return false;
}

arrayContains([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7); // Takes 8 iterations
