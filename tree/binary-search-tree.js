class BinarySearchTree {
  constructor() {
    this.root = null;
    this.Node = function (val) {
      this.val = val;
      this.left = null;
      this.right = null;
    };
  }

  insert(insertVal) {
    const newNode = new this.Node(insertVal);

    if (!this.root) {
      this.root = newNode;
    }

    function traverse(node) {
      // Avoid inserting duplicates
      if (insertVal === node.val) {
        return;
      }

      if (insertVal < node.val) {
        // Keep going down left
        if (node.left) {
          traverse(node.left);
        } else {
          // Reached the end
          node.left = newNode;
        }
      } else {
        // Keep going down right
        if (node.right) {
          traverse(node.right);
        } else {
          // Reached the end
          node.right = newNode;
        }
      }
    }

    traverse(this.root);
  }

  // Iterative (recursive way isn't working/seems harder)
  bfs() {
    const queue = [this.root];
    const nodes = [];

    while (queue.length) {
      const node = queue.shift();

      nodes.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return nodes;
  }

  dfsPreOrder() {
    const nodes = [];

    function traverse(node) {
      nodes.push(node.val); // <-- pre order

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return nodes;
  }

  // Code here is exactly the same as `dfsPreOrder()`
  // only difference is we push the value AFTER both recursive calls
  dfsPostOrder() {
    const nodes = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

      nodes.push(node.val); // <-- post order
    }

    traverse(this.root);

    return nodes;
  }

  // Code here is exactly the same as the others
  // only difference is we push the value AFTER the traverse left recursive call
  dfsInOrder() {
    const nodes = [];

    function traverse(node) {
      if (node.left) traverse(node.left);

      nodes.push(node.val); // <-- in order

      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return nodes;
  }
}

const bst = new BinarySearchTree();

bst.insert(50);
bst.insert(40);
bst.insert(60);
bst.insert(55);
bst.insert(70);
bst.insert(65);
bst.insert(30);

// Visualized tree: https://i.imgur.com/lMSJeKl.png

//console.log(JSON.stringify(bst));

// BFS: level by level from left to right
// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/8344808
//console.log(bst.bfs()); // [50, 40, 60, 30, 55, 70, 65]

// DFS (Pre Order): go all the way down the left side, then up to the nearest parent, then down the right side and so on
// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082104
//console.log(bst.dfsPreOrder()); // [50, 40, 30, 60, 55, 70, 65]

// DFS (Post Order): visit all children of a node before visiting the node itself
// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082110
//console.log(bst.dfsPostOrder()); // [30, 40, 55, 65, 70, 60, 50]

// DFS (In Order): go all the way down the left, then visit the node, then repeat on the right side
// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082114
console.log(bst.dfsInOrder()); // [30, 40, 50, 55, 60, 65, 70]
