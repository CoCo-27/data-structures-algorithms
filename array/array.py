# arrays are just objects with integer based keys behind the scenes
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
        last_item = self.data[self.len - 1]
        del self.data[self.len - 1]
        self.len -= 1
        return last_item

    def delete(self, index):
        del self.data[index]
        self.len -= 1
        self.re_sort_order()
        return self.data

    # array methods that require looping are O(n)
    # each time an element is added or deleted, all of the array's indices AFTER that one must be shifted
    # adding to the end or begining (push/pop) doesn't require re-indicing
    def re_sort_order(self):
        new_data = {}
        i = 0
        for key in self.data:
            new_data[i] = self.data[key]
            i += 1
        self.data = new_data


my_array = MyArray()

print(my_array.push("zero"))  # {'O': 'zero'}
print(my_array.push("one"))  # {'O': 'zero', '1': 'one'}
print(my_array.push("two"))  # {'O': 'zero', '1': 'one', '2': 'two'}

# {'O': 'zero', '2': 'two'} -> resorted to -> {'O': 'zero', '1': 'two'}
print(my_array.delete(1))

print(my_array.pop())  # two

print(my_array.get(0))  # zero

print(my_array.data)  # {0: 'zero'}
print(my_array.len)  # 1
