# https://i.imgur.com/Cn0as1p.png
# https://codesandbox.io/s/trie-autocomplete-5b38n
class Trie():
    def __init__(self):
        self.root = None
        self.children = {}

    def node(self, is_end=False):
        return {
            'children': {},
            'is_end': is_end
        }

    def insert(self, word):
        i = 0
        tail = self.children

        def traverse(node):
            nonlocal i, tail

            letter = word[i]
            is_last_letter = i == len(word) - 1

            i += 1

            if letter in node:
                cur_node = node[letter]

                # Letter already exists and it's the end of the word, mark node as a word ending
                if is_last_letter:
                    cur_node.is_end = True

                # Letter already exists, go onto the next letter...
                else:
                    tail = cur_node['children']
                    traverse(node)

            # Letter doesn't exist, add new!
            else:
                new_node = self.node(is_last_letter)

                tail[letter] = new_node
                tail = new_node['children']

                # More letters left, keep going...
                if not is_last_letter:
                    traverse(new_node)

        return traverse(tail)

    def find(self, word):
        i = 0
        tail = self.children

        def traverse(node):
            nonlocal i, tail

            letter = word[i]
            is_last_letter = i == len(word) - 1

            i += 1

            if letter in node:
                # Found!
                if is_last_letter:
                    return True
                # Matching so far, keep going...
                else:
                    cur_node = node[letter]
                    tail = cur_node['children']
                    return traverse(tail)

            # Not Found!
            else:
                return False

        return traverse(tail)

    # Return ALL words found while traversing a given path
    def find_till_now(self, word):
        i = 0
        tail = self.children
        letters = ''
        found_words = []

        def traverse(node):
            nonlocal i, tail, letters, found_words

            letter = word[i]
            is_last_letter = i == len(word) - 1

            letters += letter
            i += 1

            if letter in node:
                cur_node = node[letter]

                # Each time a word end is found(is_end=True) along the way push the letters up till now into the found words array
                if cur_node['is_end']:
                    found_words.append(letters)

                # Keep going...
                if not is_last_letter:
                    tail = cur_node['children']
                    return traverse(tail)

            return found_words

        return traverse(tail)

    # TODO: Return ALL words found while traversing path AND all words still remaining in the given path
    def find_all_remaining(word):
        pass

    def print_all(self):
        letters = ''

        def is_empty(dict):
            return not bool(dict)

        def traverse(node):
            nonlocal letters

            if is_empty(node['children']):
                return

            for key, val in node['children'].items():
                letters += key
                traverse(val)

        traverse(self.__dict__)

        return letters


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

# {
#     'n': {
#         'children': {
#             'o': {
#                 'children': {
#                     'i': {
#                         'children': {
#                             's': {
#                                 'children': {
#                                     'e': {
#                                         'children': {},
#                                         'is_end': True
#                                     }
#                                 },
#                                 'is_end': False
#                             }
#                         },
#                         'is_end': False
#                     }
#                 },
#                 'is_end': False
#             }
#         },
#         'is_end': False
#     },
#     'b': {
#         'children': {
#             'a': {
#                 'children': {
#                     'i': {
#                         'children': {
#                             't': {
#                                 'children': {
#                                     's': {
#                                         'children': {},
#                                         'is_end': True
#                                     }
#                                 },
#                                 'is_end': False
#                             }
#                         },
#                         'is_end': False
#                     }
#                 },
#                 'is_end': False
#             }
#         },
#         'is_end': False
#     }
# }
