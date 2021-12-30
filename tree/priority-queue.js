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

    // Step 1: insert the value to the end of the list
    this.values.push(newNode);

    // Step 2: keep syncing the node up until it reaches the right spot
    this.syncUp();
  }

  syncUp() {
    let index = this.values.length - 1; // we start at the end of the list

    const element = this.values[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      const parent = this.values[parentIndex];

      if (element.priority >= parent.priority) break;

      this.values[parentIndex] = element;
      this.values[index] = parent;

      index = parentIndex;
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
      this.syncDown();
    }

    return firstNode;
  }

  syncDown() {
    let index = 0; // we start at the beginning of the list

    const length = this.values.length;
    const element = this.values[0];

    while (true) {
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
          (swapIndex === null && rightChild.priority < element.priority) ||
          (swapIndex !== null && rightChild.priority < leftChild.priority)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;

      this.values[index] = this.values[swapIndex];
      this.values[swapIndex] = element;

      index = swapIndex;
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
