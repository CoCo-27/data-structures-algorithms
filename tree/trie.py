# https://i.imgur.com/Cn0as1p.png
# https://codesandbox.io/s/trie-autocomplete-5b38n
class Trie():
    def __init__(self):
        self.root = None
        self.children = {}

    def node(self, is_end=False):
        # type Node {
        #     is_end: Boolean
        #     children: Node
        # }
        return {
            'is_end': is_end,
            'children': {}
        }

    def insert(self, word):
        def traverse(node=self.children, tail=self.children, i=0):
            letter = word[i]
            cur_node = node[letter]
            is_last_letter = i == word.length - 1

            i += 1

            if cur_node:
                # Letter already exists and it's the end of the word, mark node as a word ending
                if is_last_letter:
                    cur_node.is_end = True

                # Letter already exists, go onto the next letter...
                else:
                    tail = cur_node.children
                    traverse(tail, i)

            # Letter doesn't exist, add new!
            else:
                new_node = self.node(is_last_letter)

                tail[letter] = new_node
                tail = new_node.children

                # More letters left, keep going...
                if not is_last_letter:
                    traverse(new_node, i)

        return traverse()

    def find(self, word):
        def traverse(node=self.children, tail=self.children, i=0):
            letter = word[i]
            cur_node = node[letter]
            is_last_letter = i == word.length - 1

            i += 1

            if cur_node:
                # Found!
                if is_last_letter:
                    return True
                # Matching so far, keep going...
                else:
                    tail = cur_node.children
                    return traverse(tail)

            # Not Found!
            else:
                return False

        return traverse()

    # Return ALL words found while traversing a given path
    def find_till_now(self, word):
        def traverse(node=self.children, tail=self.children, letters='', found_words=[], i=0):
            letter = word[i]
            cur_node = node[letter]
            is_last_letter = i == len(word) - 1

            letters += letter

            i += 1

            if cur_node:
                # Each time a word end is found(isEnd=True) along the way push the letters up till now into the found words array
                if cur_node.is_end:
                    found_words.append(letters)

                # Keep going...
                if not is_last_letter:
                    tail = cur_node.children
                    traverse(tail)

            return found_words

        return traverse()

        # Return ALL words found while traversing path AND all words still remaining in the given path
        def find_all_remaining(word):
            pass

    def print_all(self):
        def is_empty(dict):
            return not bool(dict)

        def traverse(node, letters=''):
            if is_empty(node.children):
                return

            for letter in node.children:
                letters += letter
                traverse(node.children[letter], letters)

            return letters

        return traverse(self.root)


trie = Trie()

words = ["not", "no", "note", "noise", "bat", "bait", "baits"]
for word in words:
    trie.insert(word)


print(trie.find("no"))  # True
print(trie.find("noise"))  # True
print(trie.find("noisy"))  # False

print(trie.find_till_now("note"))  # ['no', 'not', 'note']
# print(trie.find_all_remaining("n"))  # ['no', 'not', 'note', 'noise']

print(trie.print_all())  # noteisebatits


# /*
# {
#   "root": null,
#   "children": {
#       "n": {
#           "children": {
#               "o": {
#                   "children": {
#                       "t": {
#                           "children": {
#                               "e": {
#                                   "children": {}
#                               }
#                           }
#                       },
#                       "i": {
#                           "children": {
#                               "s": {
#                                   "children": {
#                                       "e": {
#                                           "children": {}
#                                       }
#                                   }
#                               }
#                           }
#                       }
#                   }
#               }
#           }
#       },
#       "b": {
#           "children": {
#               "a": {
#                   "children": {
#                       "t": {
#                           "children": {}
#                       },
#                       "i": {
#                           "children": {
#                               "t": {
#                                   "children": {
#                                       "s": {
#                                           "children": {}
#                                       }
#                                   }
#                               }
#                           }
#                       }
#                   }
#               }
#           }
#       }
#   }
# }
# */
