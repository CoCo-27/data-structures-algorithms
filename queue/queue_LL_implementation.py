class Node:
    def __init__(self, val):
        self.val = val
        self.next = None


class Queue:
    def __init__(self):
        self.first = None
        self.last = None
        self.len = 0

    def peek(self):
        return None if not self.first else self.first.val

    def enqueue(self, val):
        node = Node(val)
        if self.len == 0:
            self.first = node
            self.last = node
        else:
            self.last.next = node
            self.last = node
        self.len += 1
        return self.len

    def dequeue(self):
        if self.first == None:
            return None
        if self.first == self.last:
            self.last = None
        self.first = self.first.next
        self.len -= 1
        return self.len


queue = Queue()

print(queue.enqueue("Joy"))  # ['joy']
print(queue.enqueue("Matt"))  # ['joy', 'Matt']
print(queue.enqueue("Pavel"))  # ['joy', 'Matt', 'Pavel']

print(queue.peek())  # Joy

print(queue.dequeue())  # ['Matt', 'Pavel']
print(queue.dequeue())  # ['Pavel']

print(queue.peek())  # Pavel
