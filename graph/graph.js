/*        

       2 ------------ 0
      -  -
     -    -
    -      -
   -        -
  -          -
1 ------------ 3

*/

// Three ways to write graphs:

// 1. Edge List
const graph = [
  [0, 2],
  [2, 3],
  [2, 1],
  [1, 3],
];

/*

Explanation:
    * 0 is connected to 2
    * 2 is connected to 3
    * 2 is also connected to 1
    * 1 is connected to 3

*/

// 2. Adjacency List
const graph = {
  0: [2],
  1: [2, 3],
  2: [0, 1, 3],
  3: [1, 2],
};

/*

Explanation:
    * The index represents the nodes, and the data represents the connections of that node
    * 0 is connected to 2
    * 1 is connected to 2 and 3
    * 2 is connected to 0, 1 and 3
    * 3 is connected to 1 and 2


// Array implementation (not recomended)
// The index represents the node (array implementation only works for when the nodes hold numeric and sequential values)
const graph = [
  [2],          // 0
  [2, 3],       // 1
  [0, 1, 3],    // 2
  [1, 2],       //3
];

*/

// 3. Adjacency Matrix
const graph = {
  0: [0, 0, 1, 0],
  1: [0, 0, 1, 1],
  2: [1, 1, 0, 1],
  3: [0, 1, 1, 0],
};

/*

Explanation:
    * Each array holds either 1s or 0s
        * 1 = connected
        * 0 = not connected

        *** IMPORTANT: Instead of 0 and 1s you can use any number here to describe "weights" if this is a weighted graph

    * 0 is connected to 2 only
    * 1 is connected to 2 and 3
    * 2 is connected to 0, 1 and 3
    * 3 is connected to 1 and 2

** nodes can't be connected to themselves (0)

// Array implementation (not recomended)
// The index represents the node (array implementation only works for when the nodes hold numeric and sequential values)
const graph = [
  [0, 0, 1, 0], // 0
  [0, 0, 1, 1], // 1
  [1, 1, 0, 1], // 2
  [0, 1, 1, 0], // 3
];

*/

class Graph {
  constructor() {
    this.adjacencyList = {};
    this.numberOfNodes = 0;
  }
  addVertex(node) {
    this.adjacencyList[node] = [];
    this.numberOfNodes++;
  }
  addEdge(node1, node2) {
    // Undirected Graph
    this.adjacencyList[node1].push(node2);
    this.adjacencyList[node2].push(node1);
  }
}

const myGraph = new Graph();

myGraph.addVertex("0");
myGraph.addVertex("1");
myGraph.addVertex("2");
myGraph.addVertex("3");
myGraph.addVertex("4");
myGraph.addVertex("5");
myGraph.addVertex("6");

myGraph.addEdge("3", "1");
myGraph.addEdge("3", "4");
myGraph.addEdge("4", "2");
myGraph.addEdge("4", "5");
myGraph.addEdge("1", "2");
myGraph.addEdge("1", "0");
myGraph.addEdge("0", "2");
myGraph.addEdge("6", "5");

console.log(myGraph);

/*
Graph {
  adjacencyList: {
    '0': [ '1', '2' ],
    '1': [ '3', '2', '0' ],
    '2': [ '4', '1', '0' ],
    '3': [ '1', '4' ],
    '4': [ '3', '2', '5' ],
    '5': [ '4', '6' ],
    '6': [ '5' ]
  },
  numberOfNodes: 7
}
*/
