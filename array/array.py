# Arrays are just objects with integer based keys behind the scenes
class MyArray:
    def __init__(self):
        self.data = {}
        self.len = 0

    def get(self, index):
        return self.data[index]

    def push(self, item):
        self.data[self.len] = item
        self.len += 1
        return self.data

    def pop(self):
        last_item = self.data[-1]
        del self.data[-1]
        self.length -= 1
        return last_item

    def delete(self, index):
        item = self.data[index]
        self.re_sort_order(index)
        self.len -= 1
        return item

    # Array methods that require looping are O(n)
    # each time an element is added or deleted, the entire array's indices must be shifted, except from the end (push/pop)
    def re_sort_order(self, index):
        for i in range(self.len - 1):
            self.data[index] = self.data[index + 1]
        # Trim the last item which will be a duplicate
        # del self.data[-1]


my_array = MyArray()

print(my_array.push("first"))  # {'O': 'first'}

print(my_array.push("second"))  # {'O': 'first', '1': 'second'}

print(my_array.push("third"))  # {'O': 'first', '1': 'second', '2': 'third'}

print(my_array.delete(1))  # {'O': 'first', '1': 'third'}

print(my_array.pop())  # {'O': 'first'}

print(my_array.log(my_array))  # {'O': 'first', '1': 'third'}
