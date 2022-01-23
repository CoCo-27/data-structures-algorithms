class Stack {
  constructor() {
    this.data = [];
  }

  push(val) {
    this.data.push(val);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

const s = new Stack();
s.push(1); // [1]
s.push(2); // [1, 2]
s.peek(); // 2
s.pop(); // 2
