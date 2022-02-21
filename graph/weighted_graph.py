class WeightedGraph:
    def __init__(self, type):
        self.adjacency_list = {}
        self.node_count = 0
        self.type = type

    def add_vertex(self, node):
        self.adjacency_list[node] = []
        self.node_count += 1

    def add_edge(self, node1, node2, weight):
        self.adjacency_list[node1].append([node2, weight])

        if self.type == 'directed':
            self.adjacency_list[node2].append([node1, weight])

    def print_graph(self):
        for vertex in self.adjacency_list:
            for edges in self.adjacency_list[vertex]:
                print(f"{vertex} -> {edges[0]} (edge weight: {edges[1]})")


print('\n\nUndirected Graph:')

undirected = WeightedGraph('undirected')

undirected.add_vertex('tk')
undirected.add_vertex('yulia')

undirected.add_edge('tk', 'yulia', 50)

print(undirected.print_graph())
print(undirected.adjacency_list)

# {
#     'tk': [['yulia', 50]],
#     'yulia': []
# }

print('\n\nDirected Graph:')

directed = WeightedGraph('directed')

directed.add_vertex('tk')
directed.add_vertex('yulia')

directed.add_edge('tk', 'yulia', 50)

print(directed.print_graph())
print(directed.adjacency_list)

# {
#     'tk': [['yulia', 50]],
#     'yulia': [['tk', 50]]
# }
