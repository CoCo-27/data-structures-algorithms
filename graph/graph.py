class Graph:
    def __init__(self, type):
        self.adjacency_list = {}
        self.node_count = 0
        self.type = type

    def add_vertex(self, node):
        self.adjacency_list[node] = []
        self.node_count += 1

    def add_edge(self, node1, node2):
        self.adjacency_list[node1].append(node2)

        if self.type == 'directed':
            self.adjacency_list[node2].append(node1)

    def print_graph(self):
        for vertex in self.adjacency_list:
            for edges in self.adjacency_list[vertex]:
                print(f"{vertex} -> {edges}")


print('\n\nUndirected Graph:')

undirected = Graph('undirected')

for num in range(1, 4):
    undirected.add_vertex(str(num))

undirected.add_edge("1", "2")
undirected.add_edge("2", "3")
undirected.add_edge("3", "1")

print(undirected.adjacency_list)
print(undirected.print_graph())

# UndirectedGraph {
#     'adjacency_list': {
#         '1': ['2'],
#         '2': ['3'],
#         '3': ['1']
#     },
#     'node_count': 3
# }

print('\n\nDirected Graph:')

directed = Graph('directed')

for num in range(1, 4):
    directed.add_vertex(str(num))

directed.add_edge("1", "2")
directed.add_edge("2", "3")
directed.add_edge("3", "1")

print(directed.adjacency_list)
print(directed.print_graph())

# DirectedGraph {
#     'adjacency_list': {
#         '1': ['2', '3'],
#         '2': ['1', '3'],
#         '3': ['2', '1']
#     },
#     'node_count': 3
# }
