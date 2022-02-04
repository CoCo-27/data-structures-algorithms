class BinaryHeap {
  constructor(type) {
    this.type = type;
    this.values = [];
  }

  /*
    Formula to find the parent of a node (n = index of node):
      (n - 1) / 2 floored
  */
  getParent(currentIndex) {
    return Math.floor((currentIndex - 1) / 2);
  }

  /*
    Formula to find the children of a node (n = index of node):
      left child  = (2 * n) + 1
      right child = (2 * n) + 2
  */
  getChildren(currentIndex) {
    return {
      leftChildIndex: currentIndex * 2 + 1,
      rightChildIndex: currentIndex * 2 + 2,
    };
  }

  dfs() {
    const nodes = [];

    const traverse = (currentIndex) => {
      nodes.push(this.values[currentIndex]);

      const { leftChildIndex, rightChildIndex } =
        this.getChildren(currentIndex);

      const leftNode = this.values[leftChildIndex];
      const rightNode = this.values[rightChildIndex];

      if (leftNode) traverse(leftChildIndex);
      if (rightNode) traverse(rightChildIndex);

      return nodes;
    };

    return traverse(0);
  }

  insert(val) {
    // Step 1: insert the value to the end of the list
    this.values.push(val);

    // Step 2: keep bubbling the node up until it reaches the right spot
    // starting index is the last elem since we just pushed the new val to the end of the list
    this.bubbleUp(this.values.length - 1);
  }

  bubbleUp(currentIndex) {
    if (currentIndex === 0) return;

    const currentNode = this.values[currentIndex];

    const parentIndex = this.getParent(currentIndex);
    const parentNode = this.values[parentIndex];

    if (
      (this.type === "max" && currentNode > parentNode) ||
      (this.type === "min" && currentNode < parentNode)
    ) {
      // Swap
      this.values[currentIndex] = parentNode;
      this.values[parentIndex] = currentNode;

      this.bubbleUp(parentIndex);
    }
  }

  // This method is only for a max heap
  extractMax() {
    // Step 1: remove and return the first value (in a max heap the first node is the largest)
    const maxValue = this.values.shift();

    // If this was the last value in the list there's no need to do Steps 2 or 3
    if (this.values.length === 0) return maxValue;

    // Step 2: move the last value to the front of the heap temporarily
    this.values.unshift(this.values.pop());

    // Step 3: bubble down the newly inserted last node to it's rightful place until the root node once again holds the largest value
    // starting index is 0 since we just prepended the last item to the front of the list
    this.bubbleDown(0);

    return maxValue;
  }

  bubbleDown(currentIndex) {
    const currentNode = this.values[currentIndex];

    const { leftChildIndex, rightChildIndex } = this.getChildren(currentIndex);

    const leftChild = this.values[leftChildIndex];
    const rightChild = this.values[rightChildIndex];

    let largerChild;
    let largerChildIndex;

    if (leftChild > rightChild) {
      largerChild = leftChild;
      largerChildIndex = leftChildIndex;
    } else {
      largerChild = rightChild;
      largerChildIndex = rightChildIndex;
    }

    if (largerChild > currentNode) {
      // Swap
      this.values[currentIndex] = largerChild;
      this.values[largerChildIndex] = currentNode;

      this.bubbleUp(largerChildIndex);
    }
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
