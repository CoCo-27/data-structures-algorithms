// https://i.imgur.com/Cn0as1p.png
class Trie {
  constructor() {
    this.root = null;
    this.children = {};
    // type Node {
    //   isEnd: bool
    //   children: Node
    // }
    this.Node = function (isEnd = false) {
      return {
        isEnd,
        children: {},
      };
    };
  }

  insert(word) {
    let i = 0;
    let tail = this.children;

    const traverse = (node) => {
      const letter = word[i];
      const curNode = node[letter];
      const isLastLetter = i === word.length - 1;

      i++;

      if (curNode) {
        // Letter already exists and it's the end of the word, mark node as a word ending
        if (isLastLetter) {
          curNode.isEnd = true;
        }
        // Letter already exists, go onto the next letter...
        else {
          tail = curNode.children;
          traverse(tail);
        }
      }
      // Letter doesn't exist, add new!
      else {
        const newNode = new this.Node(isLastLetter);

        tail[letter] = newNode;
        tail = newNode.children;

        // More letters left, keep going...
        if (!isLastLetter) {
          traverse(newNode);
        }
      }
    };

    traverse(tail);
  }

  find(word) {
    let i = 0;
    let tail = this.children;

    const traverse = (node) => {
      const letter = word[i];
      const curNode = node[letter];
      const isLastLetter = i === word.length - 1;

      i++;

      if (curNode) {
        // Found!
        if (isLastLetter) {
          return true;
        }
        // Matching so far, keep going...
        else {
          tail = curNode.children;
          return traverse(tail);
        }
      }
      // Not Found!
      else {
        return false;
      }
    };

    return traverse(tail);
  }

  // Return ALL words found while traversing a given path
  findTillNow(word) {
    let i = 0;
    let tail = this.children;

    let letters = "";
    const foundWords = [];

    const traverse = (node) => {
      const letter = word[i];
      const curNode = node[letter];
      const isLastLetter = i === word.length - 1;

      letters += letter;

      i++;

      if (curNode) {
        // Each time a word end is found (isEnd = true) along the way push the letters up till now into the found words array
        if (curNode.isEnd) {
          foundWords.push(letters);
        }

        // Keep going...
        if (!isLastLetter) {
          tail = curNode.children;
          traverse(tail);
        }
      }
    };

    traverse(tail);

    return foundWords;
  }

  // Return ALL words found while traversing path AND all words still remaining in the given path
  findAllRemaining(word) {
    // TODO: ?
  }
}

const trie = new Trie();

const words = ["not", "no", "note", "noise", "bat", "bait", "baits"];
words.forEach((word) => trie.insert(word));

console.log(trie.find("no")); // true
console.log(trie.find("noise")); // true
console.log(trie.find("noisy")); // false

console.log(trie.findTillNow("note")); // ['no', 'not', 'note']
console.log(trie.findAllRemaining("n")); // ['no', 'not', 'note', 'noise']

console.log(JSON.stringify(trie));

/*
{
  "root": null,
  "children": {
      "n": {
          "children": {
              "o": {
                  "children": {
                      "t": {
                          "children": {
                              "e": {
                                  "children": {}
                              }
                          }
                      },
                      "i": {
                          "children": {
                              "s": {
                                  "children": {
                                      "e": {
                                          "children": {}
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      },
      "b": {
          "children": {
              "a": {
                  "children": {
                      "t": {
                          "children": {}
                      },
                      "i": {
                          "children": {
                              "t": {
                                  "children": {
                                      "s": {
                                          "children": {}
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  }
}
*/
