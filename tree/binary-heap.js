// https://i.imgur.com/SE1ULLs.png
class MaxBinaryHeap {
  constructor() {
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

    while (val > this.values[parentIndex]) {
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

const maxHeap = new MaxBinaryHeap();

maxHeap.insert(41);
maxHeap.insert(39);
maxHeap.insert(33);
maxHeap.insert(18);
maxHeap.insert(27);
maxHeap.insert(12);
maxHeap.insert(55); // Bubbles up to the top

console.log(maxHeap.values); // [55, 39, 41, 18, 27, 12, 33]

console.log(maxHeap.dfs()); // [55, 39, 18, 27, 41, 12, 33];
