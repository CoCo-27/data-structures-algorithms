// const linkedList = {
//   head: {
//     value: "TK",
//     next: {
//       value: "Julia",
//       next: {
//         value: "Penny",
//         next: {
//           value: "Leo",
//           next: null,
//         },
//       },
//     },
//   },
// };

class Node {
  constructor(data, node = null) {
    this.data = data;
    this.next = node;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  size() {
    let node = this.head;
    let numNodes = 0;
    while (node) {
      numNodes++;
      node = node.next;
    }
    return numNodes;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) return null;

    let node = this.head;
    while (node) {
      if (node.next) {
        node = node.next;
      } else {
        return node;
      }
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) return null;

    this.head = this.head.next;
  }

  removeLast() {
    // No nodes
    if (!this.head) return null;

    // 1 node
    if (!this.head.next) {
      this.head = null;
      return this.head;
    }

    let prevNode = this.head;
    let node = this.head.next;

    while (node) {
      if (node.next) {
        prevNode = node;
        node = node.next;
      } else {
        // Last iteration
        prevNode.next = null;
        return null;
      }
    }
  }

  insertLast(data) {
    const lastNode = this.getLast();

    if (lastNode) {
      lastNode.next = new Node(data);
    } else {
      this.head = new Node(data);
    }
  }

  getAt(index) {
    // if (!this.head) return null; // no longer needed after returning null at the bottom

    // if (index > this.size()) return null; // would be inefficient to loop twice, better to loop once regardless and return null at the bottom

    let node = this.head;
    let counter = 0;

    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }

    return null;
  }

  removeAt(index) {
    if (!this.head) return null;

    const prevNode = this.getAt(index - 1); // returns null if nothing found
    const nextNode = this.getAt(index + 1); // returns null if nothing found

    if (prevNode) {
      prevNode.next = nextNode;
    } else {
      this.head = nextNode;
    }
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
    } else if (index === 0) {
      this.head = new Node(data, this.head);
    } else {
      const prevNode = this.getAt(index - 1) || this.getLast();
      prevNode.next = new Node(data, prevNode.next);
    }
  }
}

//------------------------------------------ Slow / Fast Algorithm ------------------------------------------//
//--------------------------- This algo can be used to solve many LL problems -------------------------------//

// Detect the midpoint of a LL or detect whether a LL is circular by using the 2 step method
// Advance the `slow` variable by 1 and `fast` by 2

function midpoint(list) {
  let slow = list.getFirst();
  let fast = list.getFirst();

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

function circular(list) {
  let slow = list.getFirst();
  let fast = list.getFirst();

  // If either `fast.next` or `fast.next.next` are `null` then the list is not circular
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;

    // If the 2 vars are references to the same object in memory then it's circular
    if (slow === fast) {
      return true;
    }
  }

  return false;
}

//------------------------------------------ Traversing LL ------------------------------------------//

// While loop
let node = list.head;

while (node) {
  console.log(node.data);
  node = node.next; // Loop will exit when node = null (i.e. reaches the end)
}

// Recursive method
const traverseLinkedList = (node) => {
  console.log(node.data);
  if (node.next) {
    return traverseLinkedList(node.next);
  }
};

traverseLinkedList(linkedList.head);
