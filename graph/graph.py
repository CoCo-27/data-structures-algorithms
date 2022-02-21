class Graph:
    def __init__(self, type):
        self.adjacency_list = {}
        self.node_count = 0
        self.type = type

    def add_vertex(self, node):
        self.adjacency_list[node] = []
        self.node_count += 1

    def add_edge(self, node1, node2):
        if not self.validate(node1, node2):
            return

        self.adjacency_list[node1].append(node2)

        if self.type == 'directed':
            self.adjacency_list[node2].append(node1)

    # check if edge already exists between these 2 vertices
    # so we don't add duplicates
    def validate(self, node1, node2):
        for node in self.adjacency_list[node1]:
            if node == node2:
                print(f"Edge already exists between {node1} and {node2}!")
                return False

        if self.type == 'directed':
            for node in self.adjacency_list[node2]:
                if node == node1:
                    print(f"Edge already exists between {node2} and {node1}!")
                    return False

        return True

    def print_graph(self):
        for vertex in self.adjacency_list:
            for edges in self.adjacency_list[vertex]:
                print(f"{vertex} -> {edges}")


print('\n\nUndirected Graph:')

undirected = Graph('undirected')

undirected.add_vertex('tk')
undirected.add_vertex('yulia')
undirected.add_vertex('penny')

undirected.add_edge('tk', 'yulia')
undirected.add_edge('tk', 'penny')
undirected.add_edge('yulia', 'tk')

# not added, error: "Edge already exists between tk and yulia!"
undirected.add_edge('tk', 'yulia')

print(undirected.adjacency_list)
print(undirected.print_graph())

# UndirectedGraph {
#     'adjacency_list': {
#         'tk': ['yulia', 'penny'],
#         'yulia': ['tk'],
#         'penny': []
#     },
#     'node_count': 3
# }

print('\n\nDirected Graph:')

directed = Graph('directed')

directed.add_vertex('tk')
directed.add_vertex('yulia')
directed.add_vertex('penny')

directed.add_edge('tk', 'yulia')
directed.add_edge('tk', 'penny')

# not added, error: "Edge already exists between yulia and tk!"
directed.add_edge('yulia', 'tk')

print(directed.adjacency_list)
print(directed.print_graph())

# DirectedGraph {
#     'adjacency_list': {
#         'tk': ['yulia', 'penny'],
#         'yulia': ['tk'],
#         'penny': ['tk']
#     },
#     'node_count': 3
# }
