import math


class Node():
    def __init__(self, val, priority):
        self.val = val
        self.priority = priority


# Implemented as a Min Binary Heap
class priority_queue():
    def __init__(self):
        self.values = []

    def get_parent(self, index):
        return math.floor((index - 1) / 2)

    def get_left_child(self, index):
        return index * 2 + 1

    def get_right_child(self, index):
        return index * 2 + 2

    def enqueue(self, val, priority):
        new_node = Node(val, priority)

        # Step 1: insert the new value to the end of the list
        self.values.append(new_node)

        # Step 2: keep syncing the node up until it reaches the right spot
        self.sync_up(len(self.values) - 1)  # we start at the end of the list

    def sync_up(self, index):
        if index == 0:
            return

        element = self.values[index]

        parent_index = self.get_parent(index)
        parent = self.values[parent_index]

        # In a min heap the smaller the priority is, the higher it is
        # and the smaller values are above the larger ones, so if the element's priority is smaller than it's parent then we need to swap them
        # and keep moving the new value up the tree this way until it reaches the right spot
        if element.priority < parent.priority:
            self.values[parent_index] = element
            self.values[index] = parent

            self.sync_up(parent_index)

    def dequeue(self):
        if len(self.values) == 0:
            return None

        # Step 1: remove and return the first value (in a min heap the first node is the highest priority)
        first_node = self.values[0]

        if len(self.values) == 1:
            return self.values.pop()
        else:
            # Step 2: move the last value to the front of the heap temporarily
            last_node = self.values.pop()
            self.values[0] = last_node

            # Step 3: keep syncing the node down until it reaches the right spot
            self.sync_down(0)  # we start at the beginning of the list

        return first_node

    def sync_down(self, index):
        length = len(self.values)
        element = self.values[index]

        left_child_index = self.get_left_child(index)
        right_child_index = self.get_right_child(index)

        swap_index = None

        if left_child_index < length:
            left_child = self.values[left_child_index]

            if left_child.priority < element.priority:
                swap_index = left_child_index

        if right_child_index < length:
            right_child = self.values[right_child_index]

            if (not swap_index and right_child.priority < element.priority) or (swap_index and right_child.priority < left_child.priority):
                swap_index = right_child_index

        if swap_index:
            self.values[index] = self.values[swap_index]
            self.values[swap_index] = element

            self.sync_down(swap_index)

    def print(self):
        if len(self.values) == 0:
            return print("Empty")

        for node in self.values:
            print((node.val, node.priority))


priority_queue = priority_queue()

priority_queue.enqueue("common cold", 5)
priority_queue.enqueue("gunshot wound", 1)
priority_queue.enqueue("high fever", 4)
priority_queue.enqueue("broken arm", 2)
priority_queue.enqueue("glass in foot", 3)

print(priority_queue.print())
# ('gunshot wound', 1)
# ('broken arm', 2)
# ('high fever', 4)
# ('common cold', 5)
# ('glass in foot', 3)

print("Dequeue:", priority_queue.dequeue().val)  # gunshot wound
print("Dequeue:", priority_queue.dequeue().val)  # broken arm
print("Dequeue:", priority_queue.dequeue().val)  # glass in foot
print("Dequeue:", priority_queue.dequeue().val)  # high fever
print("Dequeue:", priority_queue.dequeue().val)  # common cold

print(priority_queue.print())  # 'Empty'
