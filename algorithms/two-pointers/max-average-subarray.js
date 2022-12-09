// 1. add up to k numbers until isReached
// 2. once isReached, for every iteration delete the lastIndex number and add the current one, then increment lastIndex

function findMaxAverage(nums, k) {
  const result = [];

  let sum = 0;
  let lastIndex = 0;
  let isReached = false;

  nums.forEach((num, index) => {
    if (isReached) {
      sum = sum - nums[lastIndex] + num;
      result.push(sum / k);
      lastIndex++;
    } else {
      sum += num;
    }

    if (index + 1 === k) {
      result.push(sum / k);
      isReached = true;
    }
  });

  return Math.max(...result);
}

//*--------------------------------------

// Optimized
function findMaxAverage(nums, k) {
  let sum = 0;
  let maxSum = 0;
  let pointer = 0;

  nums.forEach((num, index) => {
    if (index + 1 <= k) {
      sum += num;
    } else {
      sum = sum - nums[pointer] + num;
      if (sum / k > maxSum) {
        maxSum = sum / k;
      }
      pointer++;
    }

    if (index + 1 === k) {
      maxSum = sum / k;
    }
  });

  return maxSum;
}
