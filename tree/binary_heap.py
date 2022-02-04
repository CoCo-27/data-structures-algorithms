import math


class BinaryHeap():
    def __init__(self, type):
        self.type = type
        self.values = []

    # Formula to find the parent of a node (n = index of node):
    #   (n - 1) / 2 floored
    def get_parent(self, current_index):
        return math.floor((current_index - 1) / 2)

    # Formula to find the children of a node (n = index of node):
    #   left child  = (n * 2) + 1
    #   right child = (n * 2) + 2
    def get_left_child(self, current_index):
        return current_index * 2 + 1

    def get_right_child(self, current_index):
        return current_index * 2 + 2

    def dfs(self, current_index, nodes=[]):
        nodes.append(self.values[current_index])

        left_child_index = self.get_left_child(current_index)
        right_child_index = self.get_right_child(current_index)

        if left_child_index <= len(self.values) - 1:
            self.dfs(left_child_index)

        if right_child_index <= len(self.values) - 1:
            self.dfs(right_child_index)

        return nodes

    def insert(self, val):
        # Step 1: insert the value to the end of the list
        self.values.append(val)

        # Step 2: keep bubbling the node up until it reaches the right spot
        # starting index is the last elem since we just pushed the new val to the end of the list
        self.bubble_up(len(self.values) - 1)

    def bubble_up(self, current_index):
        if current_index == 0:
            return

        current_node = self.values[current_index]

        parent_index = self.get_parent(current_index)
        parent_node = self.values[parent_index]

        if (self.type == "max" and current_node > parent_node) or (self.type == "min" and current_node < parent_node):
            # Swap
            self.values[current_index] = parent_node
            self.values[parent_index] = current_node

            self.bubble_up(parent_index)

    # This method is only for a max heap
    def extract_max(self):
        # Step 1: remove and return the first value (in a max heap the first node is the largest)
        max_value = self.values.pop(0)

        # If this was the last value in the list there's no need to do Steps 2 or 3
        if len(self.values) == 0:
            return max_value

        # Step 2: move the last value to the front of the heap temporarily
        self.values.insert(0, self.values.pop())

        # Step 3: bubble down the newly inserted last node to it's rightful place until the root node once again holds the largest value
        # starting index is 0 since we just prepended the last item to the front of the list
        self.bubble_down(0)

        return max_value

    def bubble_down(self, current_index):
        current_node = self.values[current_index]

        left_child_index = self.get_left_child(current_index)
        right_child_index = self.get_right_child(current_index)

        left_child = self.values[left_child_index]
        right_child = self.values[right_child_index]

        if left_child > right_child:
            larger_child = left_child
            larger_child_index = left_child_index
        else:
            larger_child = right_child
            larger_child_index = right_child_index

        if larger_child > current_node:
            # Swap
            self.values[current_index] = larger_child
            self.values[larger_child_index] = current_node

            self.bubble_up(larger_child_index)


print("\n<<<-------------- Max Heap ----------->>>\n")

# https://i.imgur.com/SE1ULLs.png

max_heap = BinaryHeap("max")

max_heap.insert(41)
max_heap.insert(39)
max_heap.insert(33)
max_heap.insert(18)
max_heap.insert(27)
max_heap.insert(12)
max_heap.insert(55)  # Bubbles up to the right spot


print("Nodes:", max_heap.values)  # [55, 39, 41, 18, 27, 12, 33]

print("Dfs:", max_heap.dfs(0))  # [55, 39, 18, 27, 41, 12, 33]

print("Extract Max:", max_heap.extract_max())  # 55

print("Nodes:", max_heap.values)  # [41, 39, 33, 18, 27, 12]


print("\n<<<-------------- Min Heap ----------->>>\n")

# https://i.imgur.com/L1Rn6dO.png

min_heap = BinaryHeap("min")

min_heap.insert(2)
min_heap.insert(3)
min_heap.insert(6)
min_heap.insert(5)
min_heap.insert(9)
min_heap.insert(8)
min_heap.insert(1)  # Bubbles up to right spot

print("Nodes:", min_heap.values)  # [1, 3, 2, 5, 9, 8, 6]

print("Dfs:", min_heap.dfs(0))  # [1, 3, 5, 9, 2, 8, 6]
