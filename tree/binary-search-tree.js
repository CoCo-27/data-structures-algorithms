// https://i.imgur.com/lMSJeKl.png
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

  bfsIterative() {
    const queue = [this.root];
    const result = [];

    while (queue.length) {
      const node = queue.shift();

      result.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }

  bfsRecursive(queue, result) {
    if (!queue.length) return result;

    const node = queue.shift();

    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);

    return this.bfsRecursive(queue, result);
  }

  // In-Order returns the result in numeric order in a BST e.g. 1, 2, 3..
  dfsInOrder() {
    const nodes = [];

    function traverse(node) {
      if (node.left) traverse(node.left);

      nodes.push(node.val); // <-- in order (in = BETWEEN)

      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return nodes;
  }

  // Pre-Order starts with the parent and then grabs child nodes from left to right
  dfsPreOrder() {
    const nodes = [];

    function traverse(node) {
      nodes.push(node.val); // <-- pre order (pre = BEFORE)

      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);

    return nodes;
  }

  // Post-order grabs a left child then right then parent
  dfsPostOrder() {
    const nodes = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);

      nodes.push(node.val); // <-- post order (post = AFTER)
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

//console.log(JSON.stringify(bst));

/*
  BFS Iterative:
    level by level from left to right
    https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/8344808
*/
console.log("bfs (iterative):", bst.bfsIterative()); // [50, 40, 60, 30, 55, 70, 65]

/*
  BFS recursive:
    level by level from left to right
    https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/learn/lecture/12429754
*/
console.log("bfs (recursive):", bst.bfsRecursive([bst.root], [])); // [50, 40, 60, 30, 55, 70, 65]

/*
  DFS (In Order):
    returns all values in numeric order (in a BST):
    https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082114
*/
console.log("inorder:", bst.dfsInOrder()); // [30, 40, 50, 55, 60, 65, 70] // <- in numeric order

/*
  DFS (Pre Order):
    go all the way down the left side, then up to the nearest parent, then down the right side and so on
    https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082104
*/
console.log("preorder:", bst.dfsPreOrder()); // [50, 40, 30, 60, 55, 70, 65]

/*
  DFS (Post Order):
    visit all children of a node before visiting the node itself
    https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082110
*/
console.log("postorder:", bst.dfsPostOrder()); // [30, 40, 55, 65, 70, 60, 50]

/*
  In-order vs Pre-order vs Post-order:

    https://i.imgur.com/RAqe8Ek.jpg
  
    https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/learn/lecture/12429762
*/
