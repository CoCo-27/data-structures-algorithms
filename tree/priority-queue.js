// Implemented as a Min Binary Heap
class PriorityQueue {
  constructor() {
    this.values = [];
    this.Node = function (val, priority) {
      this.val = val;
      this.priority = priority;
    };
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  enqueue(val, priority) {
    const newNode = new this.Node(val, priority);

    // Step 1: insert the new value to the end of the list
    this.values.push(newNode);

    // Step 2: keep syncing the node up until it reaches the right spot
    this.syncUp(this.values.length - 1); // we start at the end of the list
  }

  syncUp(index) {
    if (index === 0) return;

    const element = this.values[index];

    const parentIndex = this.getParentIndex(index);
    const parent = this.values[parentIndex];

    // In a min heap the smaller the priority is, the higher it is
    // and the smaller values are above the larger ones, so if the element's priority is smaller than it's parent then we need to swap them
    // and keep moving the new value up the tree this way until it reaches the right spot
    if (element.priority < parent.priority) {
      this.values[parentIndex] = element;
      this.values[index] = parent;

      this.syncUp(parentIndex);
    }
  }

  dequeue() {
    // Step 1: remove and return the first value (in a min heap the first node is the highest priority)
    const firstNode = this.values[0];

    if (this.values.length > 0) {
      // Step 2: move the last value to the front of the heap temporarily
      const lastNode = this.values.pop();
      this.values[0] = lastNode;

      // Step 3: keep syncing the node down until it reaches the right spot
      this.syncDown(0); // we start at the beginning of the list
    }

    return firstNode;
  }

  syncDown(index) {
    const length = this.values.length;
    const element = this.values[index];

    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);

    let leftChild, rightChild;
    let swapIndex = null;

    if (leftChildIndex < length) {
      leftChild = this.values[leftChildIndex];

      if (leftChild.priority < element.priority) {
        swapIndex = leftChildIndex;
      }
    }

    if (rightChildIndex < length) {
      rightChild = this.values[rightChildIndex];

      if (
        (!swapIndex && rightChild.priority < element.priority) ||
        (swapIndex && rightChild.priority < leftChild.priority)
      ) {
        swapIndex = rightChildIndex;
      }
    }

    if (swapIndex) {
      this.values[index] = this.values[swapIndex];
      this.values[swapIndex] = element;

      this.syncDown(swapIndex);
    }
  }
}

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue("common cold", 5);
priorityQueue.enqueue("gunshot wound", 1);
priorityQueue.enqueue("high fever", 4);
priorityQueue.enqueue("broken arm", 2);
priorityQueue.enqueue("glass in foot", 3);

console.log("Nodes:", priorityQueue.values);
// [
//   { val: "gunshot wound", priority: 1 },
//   { val: "broken arm", priority: 2 },
//   { val: "high fever", priority: 4 },
//   { val: "common cold", priority: 5 },
//   { val: "glass in foot", priority: 3 },
// ]

console.log("Dequeue:", priorityQueue.dequeue()); // gunshot wound
console.log("Dequeue:", priorityQueue.dequeue()); // broken arm
console.log("Dequeue:", priorityQueue.dequeue()); // glass in foot
console.log("Dequeue:", priorityQueue.dequeue()); // high fever
console.log("Dequeue:", priorityQueue.dequeue()); // common cold

console.log("Nodes:", priorityQueue.values); // [{ val: 'common cold', priority: 5 }]
