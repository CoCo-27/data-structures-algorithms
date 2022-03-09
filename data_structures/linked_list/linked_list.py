class ListNode:
    def __init__(self, val):
        self.val = val
        self.next = None


class LinkedList:
    def __init__(self, val):
        if val:
            node = ListNode(val)
            self.head = node
            self.tail = node
            self.len = 1
        else:
            self.head = None
            self.tail = None
            self.len = 0

    def add(self, val):
        node = ListNode(val)
        if not self.head:
            self.head = node
        else:
            self.tail.next = node
        self.tail = node
        self.len += 1

    def remove(self, val):
        # if head is the val to remove
        if self.head.val == val:
            self.head = self.head.next
            self.len -= 1
            return

        node = self.head
        last_node = self.head
        while node:
            if node.val == val:
                last_node.next = node.next
                self.len -= 1
                return
            last_node = node
            node = node.next

    def reverse(self):
        if self.len == 1:
            return

        first = self.head
        second = self.head.next

        while second:
            next_node = second.next
            second.next = first
            first = second
            second = next_node

        self.head.next = None
        self.head = first

    def print_all(self):
        node = self.head
        while node:
            print(node.val)
            node = node.next


linked_list = LinkedList(1)

linked_list.add(8)
linked_list.add(3)
linked_list.remove(8)
linked_list.add(2)

linked_list.print_all()  # 1 -> 2 -> 3
linked_list.reverse()
linked_list.print_all()  # 3 -> 2 -> 1

print(linked_list.len)  # 3
