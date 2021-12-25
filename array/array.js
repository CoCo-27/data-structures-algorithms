// Arrays are just objects with integer based keys behind the scenes
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  delete(index) {
    const item = this.data[index];
    this.reSortOrder(index);
    this.length--;
    return item;
  }

  // Array methods that require looping are O(n)
  reSortOrder(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1]; // Trim the last item which will be a duplicate
  }
}

const newArray = new MyArray();

newArray.push("first"); // {'O': 'first'};

newArray.push("second"); // {'O': 'first', '1': 'second'};

newArray.push("third"); // {'O': 'first', '1': 'second', '2': 'third'};

newArray.delete(1); // {'O': 'first', '1': 'third'};

newArray.pop(); // {'O': 'first'};

console.log(newArray); // {'O': 'first', '1': 'third'};
