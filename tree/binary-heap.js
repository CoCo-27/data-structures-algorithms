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
      left: index * 2 + 1,
      right: index * 2 + 2,
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

  dfs() {
    const nodes = [];

    const traverse = (index) => {
      nodes.push(this.values[index]);

      const { left, right } = this.getChildren(index);

      const leftNode = this.values[left];
      const rightNode = this.values[right];

      if (leftNode) traverse(left);
      if (rightNode) traverse(right);

      return nodes;
    };

    return traverse(0);
  }
}

//*----------- Max Heap: -----------*//

// https://i.imgur.com/SE1ULLs.png

const maxHeap = new BinaryHeap("max");

maxHeap.insert(41);
maxHeap.insert(39);
maxHeap.insert(33);
maxHeap.insert(18);
maxHeap.insert(27);
maxHeap.insert(12);
maxHeap.insert(55); // Bubbles up to the right spot

console.log("Max:", maxHeap.values); // [55, 39, 41, 18, 27, 12, 33]

console.log("Max dfs:", maxHeap.dfs()); // [55, 39, 18, 27, 41, 12, 33];

//*----------- Min Heap: -----------*//

// https://i.imgur.com/L1Rn6dO.png

const minHeap = new BinaryHeap("min");

minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(6);
minHeap.insert(5);
minHeap.insert(9);
minHeap.insert(8);
minHeap.insert(1); // Bubbles up to right spot

console.log("Min:", minHeap.values); // [1, 3, 2, 5, 9, 8, 6]

console.log("Min dfs:", minHeap.dfs()); // [1, 3, 5, 9, 2, 8, 6]
