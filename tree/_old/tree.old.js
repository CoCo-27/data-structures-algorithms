class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  add(data) {
    this.children.push(new Node(data));
  }

  remove(data) {
    this.children = this.children.filter((node) => node.data !== data);
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  /*
    - From left to right
    - Level by level
    - Disregard parent/child relationships, start at the top, simply just go left to right level by level
    - Any tree traversial problem that mentions the word "width" can be solved using breadth first traversal
  */
  breadthFirstTraversal(fn) {
    // Create an array to hold the nodes
    // Default value should be the root node
    const nodes = [this.root];

    while (nodes.length) {
      // Remove the first node from the array
      const node = nodes.shift();

      // If the node has any children push it to the end of the array
      nodes.push(...node.children);

      fn(node);
    }
  }

  /*
    - Also from left to right
    - Go all the way down then back up to the closest parent and back down each branch
    - Depth first traversal is the exact same algorithm as breadth first
    - the only difference is instead of pushing the children to the end of the array you add it to the begining (unshift() vs push())
  */
  depthFirstTraversal(fn) {
    const nodes = [this.root];

    while (nodes.length) {
      const node = nodes.shift();

      // If the node has any children add to the start of the array
      nodes.unshift(...node.children);

      fn(node);
    }
  }
}

// Algorithim to get the count of the number of nodes per level on a tree (i.e. width) using breadth first traversal
function getLevelWidth(root) {
  // Create 2 arrays, one to hold nodes and the other to hold counts
  // Initiate the first with the default root node and the identifier at the end, initiate the second with a "0"
  const nodes = [root, "end"]; // "end" is a unique identifier that signifies the end of a row
  const nodesCount = [0];

  // > 1 check ensures we don't continue if the traversal reaches the end
  while (nodes.length > 1) {
    const node = nodes.shift();

    if (node === "end") {
      // If we reached the end add a new count of "0" to the counter array
      // And push the identifier to the end of the nodes array
      nodesCount.push(0);
      nodes.push("end");
    } else {
      nodes.push(...node.children);
      nodesCount[nodesCount.length - 1]++; // Increment the value of the last item in the counter array
    }
  }

  return nodesCount;
}

/*------------------------------------------------ Binary Tree ------------------------------------------------*/

// Same as any other tree except a parent can only have 2 child nodes
// the node to the bottom left is called the left node and the one to the bottom right is called the right node

/*------------------------------------------------ Binary Search Tree ------------------------------------------------*/

// Same as a binary tree except the value of the left node must be smaller than the parent and the value of the
// right node must be larger than the parent

// Problem: insert a node at the appropriate spot in a binary search tree (recursive solution):
//
//   test("Node can insert correctly", () => {
//     const node = new Node(10);
//     node.insert(5);
//     node.insert(15);
//     node.insert(17);

//     expect(node.left.data).toEqual(5);
//     expect(node.right.data).toEqual(15);
//     expect(node.right.right.data).toEqual(17);
//   });

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  insert(data) {
    // If val is smaller and there is a child node on the left keep digging deeper
    if (data < this.data && this.left) {
      this.left.insert(data);
    }
    // If no left child just add one
    else if (data < this.data) {
      this.left = new Node(data);
    }
    // If val is larger and there is a child node on the right keep digging deeper
    else if (data > this.data && this.right) {
      this.right.insert(data);
    }
    // If no right child just add one
    else if (data > this.data) {
      this.right = new Node(data);
    }
  }
}

// Problem: check to see if a node exists in a binary search tree (recursive solution)
// This solution is efficient because we only need to go down one side of the tree or the other and not traverse the entire tree
// so we use a recursive solution instead of the usual Breadth first or Depth first traversal patterns:

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  contains(data) {
    // If there's a match we return the node
    if (this.data === data) {
      return this;
    }

    // Keep digging left
    if (data < this.data && this.left) {
      return this.left.contains(data); // don't forget to "return" the value
    }
    // Keep digging right
    else if (data > this.data && this.right) {
      return this.right.contains(data); // don't forget to "return" the value
    }

    // If node doesn't exist previous checks will be missed and we return null
    return null;
  }
}
