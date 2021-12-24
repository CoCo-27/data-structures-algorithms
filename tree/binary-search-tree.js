/*
    Rules:
        1. Has 0, 1, or 2 nodes
        2. Kept in a sorted order of some kind
        3. All children to the left of a parent node are smaller than it's value and all children to the right are larger

    BST's are great for searching as opposed to an unsorted tree, since you don't need to visit each node, it's a devide and conquer approach

    Complexity: O(log n) for both insert and search on average and O(n) for worst case
*/

class BinarySearchTree {
  constructor(value) {
    this.TreeNode = function (value) {
      this.value = value;
      this.left = null;
      this.right = null;
    };
    this.root = value ? new this.TreeNode(value) : null;
  }

  insert(insertVal) {
    const newNode = new this.TreeNode(insertVal);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    function traverseTree(node) {
      // Avoid inserting duplicates
      if (insertVal === node.value) {
        return;
      }

      if (insertVal < node.value) {
        // Keep going down left
        if (node.left) {
          traverseTree(node.left);
        } else {
          // Reached the end
          node.left = newNode;
        }
      } else {
        // Keep going down right
        if (node.right) {
          traverseTree(node.right);
        } else {
          // Reached the end
          node.right = newNode;
        }
      }
    }

    traverseTree(this.root);

    return this;
  }

  bfsRecursive() {
    const nodes = [];

    function traverseTree(node, level) {
      if (nodes[level]) {
        nodes[level] = (nodes[level] + node.value) / 2;
      } else {
        nodes[level] = node.value;
      }

      console.log(level + " -> ", node.value);

      if (node.left) traverseTree(node.left, level + 1);
      if (node.right) traverseTree(node.right, level + 1);
    }

    traverseTree(this.root, 0);

    return nodes;
  }

  bfsIterative() {
    const queue = [this.root];
    const nodes = [];

    while (queue.length) {
      const node = queue.shift();

      nodes.push(node.value);
      console.log(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return nodes;
  }

  dfsRecursive(type) {
    const vals = [];

    switch (type) {
      case "pre-order":
        function traverse(node) {
          vals.push(node.value);

          if (node.left) traverse(node.left);
          if (node.right) traverse(node.right);
        }

        traverse(this.root);
        break;
      case "post-order":
        //
        break;
      case "in-order":
        //
        break;
    }

    return vals;
  }
}

const bst = new BinarySearchTree(50);

bst.insert(40);
bst.insert(60);
bst.insert(55);
bst.insert(70);
bst.insert(65);

// console.log(JSON.stringify(bst));

// console.log(bst.bfsRecursive());
// console.log('----------------');
// console.log(bst.bfsIterative());

console.log(bst.dfsRecursive("pre-order"));
