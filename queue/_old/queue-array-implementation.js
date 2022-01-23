// Not recomended, use LL for queue implementations instead
class Queue {
  constructor() {
    this.arr = [];
  }

  add(val) {
    return this.arr.push(val);
  }

  remove() {
    return this.arr.shift();
  }
}

const q = new Queue();
q.add(1); // 1
q.add(2); // 2
q.remove(); // 1
