class WeightedGraph:
    def __init__(self, type):
        self.adjacency_list = {}
        self.node_count = 0
        self.type = type

    def add_vertex(self, node):
        self.adjacency_list[node] = []
        self.node_count += 1

    def add_edge(self, node1, node2, weight):
        if not self.validate(node1, node2):
            return

        self.adjacency_list[node1].append([node2, weight])

        if self.type == 'directed':
            self.adjacency_list[node2].append([node1, weight])

    def update_weight(self, node1, node2, new_weight):
        for node in self.adjacency_list[node1]:
            if node[0] == node2:
                node[1] = new_weight

        if self.type == 'undirected':
            for node in self.adjacency_list[node2]:
                if node[0] == node1:
                    node[1] = new_weight

    # check if edge already exists between these 2 vertices
    # so we don't add duplicates
    def validate(self, node1, node2):
        for node in self.adjacency_list[node1]:
            if node[0] == node2:
                print(f"Edge already exists between {node1} and {node2}!")
                return False

        if self.type == 'undirected':
            for node in self.adjacency_list[node2]:
                if node[0] == node1:
                    print(f"Edge already exists between {node2} and {node1}!")
                    return False

        return True

    def print_graph(self):
        for vertex in self.adjacency_list:
            for edges in self.adjacency_list[vertex]:
                print(f"{vertex} -> {edges[0]} (edge weight: {edges[1]})")


print('\n\nDirected Graph:')

directed = WeightedGraph('directed')

directed.add_vertex('tk')
directed.add_vertex('yulia')
directed.add_vertex('penny')

directed.add_edge('tk', 'yulia', 50)
directed.add_edge('tk', 'penny', 25)

# since this graph is undirected this won't throw a validation error
# and we can add a different weight to this edge than the edge between `tk -> yulia`
directed.add_edge('yulia', 'tk', 100)

# edge weight for the `tk -> yulia` is now 75
directed.update_weight('tk', 'yulia', 75)

print(directed.print_graph())
print(directed.adjacency_list)

# {
#     'tk': [['yulia', 75], ['penny', 25]],
#     'yulia': [['yulia', 100]],
#     'penny': []
# }

print('\n\nUndirected Graph:')

undirected = WeightedGraph('undirected')

undirected.add_vertex('tk')
undirected.add_vertex('yulia')

undirected.add_edge('tk', 'yulia', 50)

# not added, error: "Edge already exists between yulia and tk!"
undirected.add_edge('yulia', 'tk', 50)

# weight for both edges is now 150
undirected.update_weight('tk', 'yulia', 150)

print(undirected.print_graph())
print(undirected.adjacency_list)

# {
#     'tk': [['yulia', 150]],
#     'yulia': [['tk', 150]]
# }
