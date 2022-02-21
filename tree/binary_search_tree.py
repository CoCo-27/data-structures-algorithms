# https://i.imgur.com/lMSJeKl.png

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, insert_val):
        new_node = Node(insert_val)

        if not self.root:
            self.root = new_node

        def traverse(node):
            # Avoid inserting duplicates
            if insert_val == node.val:
                return

            if insert_val < node.val:
                # Keep going down left
                if node.left:
                    traverse(node.left)
                else:
                    # Reached the end
                    node.left = new_node
            else:
                # Keep going down right
                if node.right:
                    traverse(node.right)
                else:
                    # Reached the end
                    node.right = new_node

        traverse(self.root)

    def bfs_iterative(self):
        queue = [self.root]
        result = []

        while len(queue):
            node = queue.pop(0)

            result.append(node.val)

            if node.left:
                queue.append(node.left)

            if node.right:
                queue.append(node.right)

        return result

    def bfs_recursive(self, queue, result=[]):
        if len(queue) == 0:
            return result

        node = queue.pop(0)

        result.append(node.val)

        if node.left:
            queue.append(node.left)

        if node.right:
            queue.append(node.right)

        return self.bfs_recursive(queue, result)

    # In-Order returns the result in numeric order in a BST e.g. 1, 2, 3..
    def dfs_in_order(self, node, nodes=[]):
        if node.left:
            self.dfs_in_order(node.left)

        nodes.append(node.val)  # <-- in order (in = BETWEEN)

        if node.right:
            self.dfs_in_order(node.right)

        return nodes

    # Pre-Order starts with the parent and then grabs child nodes from left to right
    def dfs_pre_order(self, node, nodes=[]):
        nodes.append(node.val)  # <-- pre order(pre = BEFORE)

        if node.left:
            self.dfs_pre_order(node.left)

        if node.right:
            self.dfs_pre_order(node.right)

        return nodes

    # Post-order grabs a left child then right then parent
    def dfs_post_order(self, node, nodes=[]):
        if node.left:
            self.dfs_post_order(node.left)

        if node.right:
            self.dfs_post_order(node.right)

        nodes.append(node.val)  # <-- post order(post = AFTER)

        return nodes


bst = BinarySearchTree()

bst.insert(50)
bst.insert(40)
bst.insert(60)
bst.insert(55)
bst.insert(70)
bst.insert(65)
bst.insert(30)


#   BFS Iterative:
#     level by level from left to right
#     https: // www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/8344808

print("bfs (iterative):", bst.bfs_iterative())  # [50, 40, 60, 30, 55, 70, 65]


#   BFS recursive:
#     level by level from left to right
#     https: // www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/learn/lecture/12429754

# [50, 40, 60, 30, 55, 70, 65]
print("bfs (recursive):", bst.bfs_recursive([bst.root]))


#   DFS(In Order):
#     returns all values in numeric order (in a BST):
#     https: // www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082114

# [30, 40, 50, 55, 60, 65, 70] <- in numeric order
print("dfs (inorder):", bst.dfs_in_order(bst.root))


#   DFS(Pre Order):
#     go all the way down the left side, then up to the nearest parent, then down the right side and so on
#     https: // www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082104

# [50, 40, 30, 60, 55, 70, 65]
print("dfs (preorder):", bst.dfs_pre_order(bst.root))


#   DFS(Post Order):
#     visit all children of a node before visiting the node itself
#     https: // www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11082110

# [30, 40, 55, 65, 70, 60, 50]
print("dfs (postorder):", bst.dfs_post_order(bst.root))


#   In-order vs Pre-order vs Post-order:
#     https: // i.imgur.com/RAqe8Ek.jpg
#     https: // www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/learn/lecture/12429762
