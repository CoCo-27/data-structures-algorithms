class BinaryHeap {
  constructor(type) {
    this.type = type;
    this.values = [];
  }

  /*
    Formula to find the children of a node (n = index of node):
      left child  = (2 * n) + 1
      right child = (2 * n) + 2
  */
  getChildren(index) {
    return {
      leftIndex: index * 2 + 1,
      rightIndex: index * 2 + 2,
    };
  }

  /*
    Formula to find the parent of a node (n = index of node):
      (n - 1) / 2 floored
  */
  getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  insert(val) {
    // Step 1: insert the value to the end of the tree/list
    this.values.push(val);

    // Step 2: compare the new value to it's parent, if it's larger swap the two
    // keep doing this until the new value "bubbles up" to it's rightful place
    let newNodeIndex = this.values.length - 1;
    let parentIndex = this.getParent(newNodeIndex);

    while (
      this.type === "min"
        ? val < this.values[parentIndex]
        : val > this.values[parentIndex]
    ) {
      const parentNode = this.values[parentIndex];
      const newNode = this.values[newNodeIndex];

      this.values[newNodeIndex] = parentNode;
      this.values[parentIndex] = newNode;

      newNodeIndex = parentIndex;
      parentIndex = this.getParent(parentIndex);
    }
  }

  // An `extractMin()` function will be identical except we'd want to get the smaller of the 2 children `Math.min()`
  // and the condition in the while loop will be `smallerChild < curNode`
  extractMax() {
    // Step 1: remove and return the first value (in a max heap the first node is the largest)
    const maxValue = this.values.shift();

    // Step 2: move the last value to the front of the heap temporarily
    this.values.unshift(this.values.pop());

    // Step 3: bubble down the newly inserted last node to it's rightful place until the root node once again holds the largest value
    let curNodeIndex = 0;
    let curNode = this.values[curNodeIndex];

    let children = this.getChildren(curNodeIndex);
    let largerChildIndex = Math.max(children.leftIndex, children.rightIndex); // Since it's a max heap we want the larger of the two
    let largerChild = this.values[largerChildIndex];

    // Swap
    while (largerChild > curNode) {
      this.values[curNodeIndex] = largerChild;
      this.values[largerChildIndex] = curNode;

      curNodeIndex = largerChildIndex;
      curNode = this.values[largerChildIndex];

      children = this.getChildren(curNodeIndex);
      largerChildIndex = Math.max(children.leftIndex, children.rightIndex);
      largerChild = this.values[largerChildIndex];
    }

    return maxValue;
  }

  dfs() {
    const nodes = [];

    const traverse = (index) => {
      nodes.push(this.values[index]);

      const { leftIndex, rightIndex } = this.getChildren(index);

      const leftNode = this.values[leftIndex];
      const rightNode = this.values[rightIndex];

      if (leftNode) traverse(leftIndex);
      if (rightNode) traverse(rightIndex);

      return nodes;
    };

    return traverse(0);
  }
}

console.log("\n<<<-------------- Max Heap ----------->>>\n");

// https://i.imgur.com/SE1ULLs.png

const maxHeap = new BinaryHeap("max");

maxHeap.insert(41);
maxHeap.insert(39);
maxHeap.insert(33);
maxHeap.insert(18);
maxHeap.insert(27);
maxHeap.insert(12);
maxHeap.insert(55); // Bubbles up to the right spot

console.log("Nodes:", maxHeap.values); // [55, 39, 41, 18, 27, 12, 33]

console.log("Dfs:", maxHeap.dfs()); // [55, 39, 18, 27, 41, 12, 33];

console.log("Extract Max:", maxHeap.extractMax()); // 55

console.log("Nodes:", maxHeap.values); // [41, 39, 33, 18, 27, 12]

console.log("\n<<<-------------- Min Heap ----------->>>\n");

// https://i.imgur.com/L1Rn6dO.png

const minHeap = new BinaryHeap("min");

minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(6);
minHeap.insert(5);
minHeap.insert(9);
minHeap.insert(8);
minHeap.insert(1); // Bubbles up to right spot

console.log("Nodes:", minHeap.values); // [1, 3, 2, 5, 9, 8, 6]

console.log("Dfs:", minHeap.dfs()); // [1, 3, 5, 9, 2, 8, 6]
