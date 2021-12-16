/*
    Rules:
        1. Has 0, 1, or 2 nodes
        2. Kept in a sorted order of some kind
        3. All children to the left of a parent node are smaller than it's value and all children to the right are larger

    BST's are great for searching as opposed to an unsorted tree since you don't need to visit each nnde, it's a devide and conquer approach

    Complexity: O(log n) for both insert and search
*/

function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

class BinarySearchTree {
  constructor(value) {
    this.root = value ? new TreeNode(value) : null;
  }

  insert(insertVal) {
    const newNode = new TreeNode(insertVal);

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

  find(findVal) {
    if (!this.root) {
      return false;
    }

    let found = false;

    function traverseTree(node) {
      if (node.value === findVal) {
        found = true;
        return;
      }

      if (findVal < node.value) {
        // Keep going down left
        if (node.left) {
          traverseTree(node.left);
        } else {
          // Reached the end
          return false;
        }
      } else {
        // Keep going down right
        if (node.right) {
          traverseTree(node.right);
        } else {
          // Reached the end
          return false;
        }
      }
    }

    traverseTree(this.root);

    return found;
  }
}

const bst = new BinarySearchTree(10);

bst.insert(11);
bst.insert(9);
bst.insert(11);
bst.insert(13);

console.log(bst.find(13));
console.log(JSON.stringify(bst));
