/*

Depth first search:
    Go all the way down a column, then up then down, etc
    Depth = vertical

    Types:
        In order
        Pre order
        Post order

*/

/*

Pre order DFS:
    
    Visit a node then keep drilling down the left side until you reach the end
    then go back up to the nearest node that has a right child and repeat as above but on the right side

        10
    6       15
 3     8       20

Nodes will be visited in this order: 

    [10, 6, 3, 8, 15, 20]

*/

// Pre order
function recursivePreOrderDfs(root) {
  const vals = [];

  function traverse(node) {
    vals.push(node.value);

    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }

  traverse(root);

  return vals;
}

/*

Post order DFS:

    Visit a node then keep drilling down the left side until you reach the end
    then go back up to the nearest node that has a right child and repeat as above but on the right side

        10
    6       15
 3     8       20

Nodes will be visited in this order: 

    [10, 6, 3, 8, 15, 20]

*/

// Post order
function recursivePostOrderDfs(root) {
  //
}
