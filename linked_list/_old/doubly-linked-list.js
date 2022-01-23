class Node {
  constructor(value, nextNode = null, prevNode = null) {
    this.value = value;
    this.next = nextNode;
    this.prev = prevNode;
  }
}

class DoublyLinkedList {
  constructor(value) {
    this.head = value ? new Node(value) : null;
    // Keeping track of the tail allows append() and prepend() to be O(1)
    this.tail = this.head;
    // Manually keeping track of length also allows getting it to be O(1)
    this.length = value ? 1 : 0;
  }

  append(value) {
    const newNode = new Node(value, null, this.tail);
    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
  }

  prepend(value) {
    const oldHead = this.head;
    const newNode = new Node(value, oldHead);
    this.head = newNode;
    oldHead.prev = newNode;
    this.length++;
  }

  getNode(index) {
    let node = this.head;
    let count = 0;
    while (node) {
      if (count === index) {
        return node;
      }
      count++;
      node = node.next;
    }
  }

  insert(value, index) {
    // If index is that of tail or larger than the total number of
    // nodes in the list, just append the new node to the end
    if (index >= this.length - 1) {
      return this.append(value);
    }

    const futureNext = this.getNode(index);
    const futurePrev = futureNext.prev;
    const newNode = new Node(value, futureNext, futurePrev);

    futurePrev.next = newNode;
    futureNext.prev = newNode;

    this.length++;
  }

  delete(index) {
    const currentNode = this.getNode(index);

    currentNode.prev.next = currentNode.next;

    // If last node is being deleted there won't be a next node
    if (currentNode.next) {
      currentNode.next.prev = currentNode.prev;
    }

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
}

const myLL = new DoublyLinkedList(2); // 2

myLL.append(3); // 2 ---> 3
myLL.append(4); // 2 ---> 3 ---> 4

myLL.prepend(1); // 1 ---> 2 ---> 3 ---> 4

myLL.insert(2.5, 2); // 1 ---> 2 ---> 2.5 ---> 3 ---> 4
myLL.insert("last", 1000); // 1 ---> 2 ---> 2.5 ---> 3 ---> 4 ---> last

myLL.delete(2); // 1 ---> 2 ---> 3 ---> 4 ---> last
myLL.delete(4); // 1 ---> 2 ---> 3 ---> 4
