class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.next = nextNode;
  }
}

class SinglyLinkedList {
  constructor(value) {
    this.head = value ? new Node(value) : null;
    // Keeping track of the tail allows append() and prepend() to be O(1)
    this.tail = this.head;
    // Manually keeping track of length also allows getting it to be O(1)
    this.length = value ? 1 : 0;
  }

  append(value) {
    const newNode = new Node(value);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  prepend(value) {
    const oldHead = this.head;
    this.head = new Node(value, oldHead);
    this.length++;
  }

  getNode(index) {
    let node = this.head;
    let count = 0;
    while (node) {
      count++;
      if (count === index) {
        return node;
      }
      node = node.next;
    }
  }

  insert(value, index) {
    // If index is that of tail or larger than the total number of
    // nodes in the list, just append the new node to the end
    if (index >= this.length - 1) {
      return this.append(value);
    }
    const currentNode = this.getNode(index);
    currentNode.next = new Node(value, currentNode.next);
    this.length++;
  }

  delete(index) {
    const currentNode = this.getNode(index);
    currentNode.next = currentNode.next.next;
    // If the last node is being deleted update the tail
    if (index === this.length - 1) {
      this.tail = currentNode;
    }
    this.length--;
  }

  clear() {
    this.head = null;
    this.length = 0;
  }

  reverse() {
    if (this.length === 1) return this; // No need to reverse

    let first = this.head;
    let second = this.head.next;

    while (second) {
      const nextNode = second.next;
      second.next = first;
      first = second;
      second = nextNode;
    }

    this.head.next = null;
    this.head = first;

    // // Easy way using existing methods (but it's On^2)
    // let currentNode = this.head.next;
    // let index = 1;
    // while (currentNode) {
    //   this.delete(index);
    //   this.prepend(currentNode.value);
    //   currentNode = currentNode.next;
    //   index++;
    // }

    return this;
  }
}

const myLL = new SinglyLinkedList(2); // 2

myLL.append(3); // 2 ---> 3
myLL.append(4); // 2 ---> 3 ---> 4

myLL.prepend(1); // 1 ---> 2 ---> 3 ---> 4

myLL.insert(2.5, 2); // 1 ---> 2 ---> 2.5 ---> 3 ---> 4
myLL.insert("last", 1000); // 1 ---> 2 ---> 2.5 ---> 3 ---> 4 ---> last

myLL.delete(2); // 1 ---> 2 ---> 3 ---> 4 ---> last
myLL.delete(4); // 1 ---> 2 ---> 3 ---> 4

myLL.reverse(); // 4 ---> 3 ---> 2 ---> 1
