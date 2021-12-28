// Implemented as a Min Heap
class PriorityQueue {
  constructor() {
    this.values = [];
    this.Node = function (val, priority) {
      this.val = val;
      this.priority = priority;
    };
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

  enqueue(val, priority) {
    const newNode = new this.Node(val, priority);

    // Step 1: insert the value to the end of the list
    this.values.push(newNode);

    // Step 2: keep bubbling the node up until it reaches the right spot
    // starting index is the last elem since we just pushed the new val to the end of the list
    this.bubbleUp(this.values.length - 1);
  }

  bubbleUp(currentIndex) {
    if (currentIndex === 0) return;

    const currentNode = this.values[currentIndex];

    const parentIndex = this.getParent(currentIndex);
    const parentNode = this.values[parentIndex];

    if (currentNode.priority < parentNode.priority) {
      // Swap
      this.values[currentIndex] = parentNode;
      this.values[parentIndex] = currentNode;

      this.bubbleUp(parentIndex);
    }
  }

  dequeue() {
    // Step 1: remove and return the first value (in a max heap the first node is the largest)
    const maxValue = this.values.shift();

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

    let smallerChild;
    let smallerChildIndex;

    if (leftChild?.priority < rightChild?.priority) {
      smallerChild = leftChild;
      smallerChildIndex = leftChildIndex;
    } else {
      smallerChild = rightChild;
      smallerChildIndex = rightChildIndex;
    }

    if (smallerChild?.priority < currentNode?.priority) {
      // Swap
      this.values[currentIndex] = smallerChild;
      this.values[smallerChildIndex] = currentNode;

      this.bubbleUp(smallerChildIndex);
    }
  }
}

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue("common cold", 5);
priorityQueue.enqueue("gunshot wound", 1);
priorityQueue.enqueue("high fever", 4);
priorityQueue.enqueue("broken arm", 2);
priorityQueue.enqueue("glass in foot", 3);

console.log("Dequeue:", priorityQueue.dequeue()); // gunshot wound
console.log("Nodes:", priorityQueue.values);

console.log("Dequeue:", priorityQueue.dequeue()); // broken arm
console.log("Nodes:", priorityQueue.values);

console.log("Dequeue:", priorityQueue.dequeue()); // glass in foot
console.log("Nodes:", priorityQueue.values);

console.log("Dequeue:", priorityQueue.dequeue()); // high fever
console.log("Nodes:", priorityQueue.values);

console.log("Dequeue:", priorityQueue.dequeue()); // common cold
console.log("Nodes:", priorityQueue.values);
