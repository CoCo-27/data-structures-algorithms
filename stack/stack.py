class Stack:
    def __init__(self):
        self.data = []

    def push(self, val):
        self.data.append(val)
        return self.data

    def pop(self):
        self.data.pop()
        return self.data

    def peek(self):
        return self.data[-1]


stack = Stack()
print(stack.push(1))  # [1]
print(stack.push(2))  # [1, 2]
print(stack.peek())  # 2
print(stack.pop())  # [1]
