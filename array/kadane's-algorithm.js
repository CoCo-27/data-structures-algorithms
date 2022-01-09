// Find max contiguous subarray sum
// Kadane's algorithms (On)
const maxSubArray = function (nums) {
  if (nums.length === 1) return nums[0];

  // Start with the first element for both maxSum and newSum
  let maxSum = nums[0];
  let newSum = nums[0];

  console.log("maxSum:", maxSum);
  console.log("newSum:", newSum);
  console.log("-------");

  for (let i = 1; i < nums.length; i++) {
    // prettier-ignore
    console.log(`
      number = ${nums[i]} <-
      sum = {newSum} + {number} = ${newSum} + ${nums[i]} = ${newSum + nums[i]} <-
      updated newSum is the larger of the 2 = Math.max({new sum}, {number}) = ${Math.max(newSum + nums[i], nums[i])} <-
      updated maxSum = Math.max({newSum}, {maxSum}) = ${Math.max(newSum, maxSum)} <-
    `);

    // Add the current number to the previous newSum
    // set this sum or the number itself, whichever is larger as the new newSum
    newSum = Math.max(newSum + nums[i], nums[i]);

    // If the newSum is larger than the previous maxSum update it to be the new maxSum
    if (newSum > maxSum) {
      maxSum = newSum;
    }

    console.log("-------");
  }

  return maxSum;
};

//*-------------------------- vs --------------------------*//

// Brute force (On2)
const maxSubArray = function (nums) {
  let maxSum = nums[0];

  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    let max = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];

      if (sum > max) {
        max = sum;
      }
    }

    if (max > maxSum) {
      maxSum = max;
    }
  }

  return maxSum;
};
