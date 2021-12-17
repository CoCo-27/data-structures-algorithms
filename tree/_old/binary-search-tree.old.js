class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let node = this.root;
    while (node) {
      // Go down left side
      if (value < node.value) {
        if (!node.left) {
          node.left = newNode;
          return;
        } else {
          node = node.left;
        }
      }
      // Go down right side
      else if (value > node.value) {
        if (!node.right) {
          node.right = newNode;
          return;
        } else {
          node = node.right;
        }
      }
    }
  }

  lookup(value) {
    if (!this.root) return null;

    let node = this.root;
    while (node) {
      if (node.value === value) {
        return node;
      }

      // Go down left side
      if (value < node.value) {
        if (!node.left) {
          // Not found
          return null;
        } else {
          // Keep digging..
          node = node.left;
        }
      }
      // Go down right side
      else if (value > node.value) {
        if (!node.right) {
          // Not found
          return null;
        } else {
          // Keep digging..
          node = node.right;
        }
      }
    }
  }

  remove(value) {
    if (!this.root) return null;

    let curNode = this.root;
    let prevNode = this.root;

    while (curNode) {
      // Found the node we need to delete
      if (curNode.value === value) {
        // If this is a leaf node just delete it (easy)
        if (!curNode.left && !curNode.right) {
          if (prevNode.value > curNode.value) {
            prevNode.left = null;
          } else {
            prevNode.right = null;
          }
        }
        // If this isn't a leaf node then it's a litle more complicated
        else {
          // TODO: revisit didn't get these...

          // No left child
          if (!curNode.left) {
            //
          }
          // No right child
          else if (!curNode.right) {
            //
          }
          // Has both left and right children
          else if (curNode.left && curNode.right) {
            //
          }
        }
      }

      prevNode = curNode;
      curNode = value < curNode.value ? prevNode.left : prevNode.right;
    }
  }
}

//        9
//   4        20
// 1    6   15   170

const tree = new BinarySearchTree();

tree.insert(9);
tree.insert(4);
tree.insert(1);
tree.insert(6);
tree.insert(20);
tree.insert(15);
tree.insert(170);

console.log(tree.lookup(1)); // TreeNode { value: 1, left: null, right: null }
console.log(tree.lookup(100)); // null

tree.remove(170);

console.log(JSON.stringify(traverse(tree.root)));

/*

  {
    "value": 9,
    "left": {
        "value": 4,
        "left": {
            "value": 1,
            "left": null,
            "right": null
        },
        "right": {
            "value": 6,
            "left": null,
            "right": null
        }
    },
    "right": {
        "value": 20,
        "left": {
            "value": 15,
            "left": null,
            "right": null
        },
        "right": {
            "value": 170,
            "left": null,
            "right": null
        }
    }
  }

*/

function traverse(node) {
  const tree = { value: node.value };
  tree.left = node.left === null ? null : traverse(node.left);
  tree.right = node.right === null ? null : traverse(node.right);
  return tree;
}
