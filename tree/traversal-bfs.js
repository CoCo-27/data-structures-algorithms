/*

Breadth first search:
    Row by row (horizontal)
    Breadth = width of the tree

*/

// Recursive
function recursiveBfs(root) {
  const nodes = [];

  function traverseTree(node) {
    nodes.push(node.value);

    if (node.left) traverseTree(node.left);
    if (node.right) traverseTree(node.right);
  }

  traverseTree(root);

  return nodes;
}

// Iterative
function iterativeBfs(root) {
  const queue = [root];
  const nodes = [];

  while (queue.length) {
    const node = queue.shift();

    nodes.push(node.value);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return nodes;
}
