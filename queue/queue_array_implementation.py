# not recomended, use LL for queue implementations instead, it's more performant
class Queue:
    def __init__(self):
        self.list = []

    def enqueue(self, val):
        self.list.append(val)
        return self.list

    def dequeue(self):
        self.list.pop(0)
        return self.list


queue = Queue()
print(queue.enqueue(1))  # [1]
print(queue.enqueue(2))  # [1, 2]
print(queue.dequeue())  # [2]
