// https://i.imgur.com/Cn0as1p.png
class Trie {
  constructor() {
    this.root = null;
    this.children = {};
    // type Node {
    //   children: Node,
    // }
    this.Node = function () {
      return {
        children: {},
      };
    };
  }

  insert(word) {
    let charIndex = 0;
    let tail = this.children;

    const traverse = (node) => {
      const char = word[charIndex];
      const curNode = node[char];

      // console.log(`-- traverse char "${char}" --`);

      charIndex++;

      const isNotLastLetter = charIndex !== word.length;

      // Node exists so skip adding and move onto the next char in word
      if (curNode) {
        // console.log('node exists, moving on to next letter...');

        if (isNotLastLetter) {
          tail = curNode.children;
          traverse(curNode.children);
        }
      }
      // Insert new node
      else {
        // console.log('node does not exist, adding new node!');

        const newNode = new this.Node(char);

        tail[char] = newNode;
        tail = newNode.children;

        if (isNotLastLetter) {
          traverse(newNode);
        }
      }
    };

    traverse(this.children);
  }

  find(word) {
    let charIndex = 0;
    let tail = this.children;

    const traverse = (node) => {
      const char = word[charIndex];
      const curNode = node[char];

      // console.log(`-- traverse char "${char}" --`);

      charIndex++;

      const isNotLastLetter = charIndex !== word.length;

      // Node exists!
      if (curNode) {
        // console.log(`${char} found!`);

        // If not the last letter move onto the next char in word
        // If it's the last letter we reached the end and all nodes have been found
        if (isNotLastLetter) {
          tail = curNode.children;
          return traverse(curNode.children);
        }
      }
      // Does not exist, exit function at the first occurance of a missing node
      else {
        // console.log(`${char} NOT found!`);
        return false;
      }

      return true;
    };

    return traverse(this.children);
  }
}

const trie = new Trie();

trie.insert("not");
// console.log('\n<<<------------------------->>>\n');
trie.insert("no");
// console.log('\n<<<------------------------->>>\n');
trie.insert("note");
// console.log('\n<<<------------------------->>>\n');
trie.insert("noise");

trie.insert("bat");
trie.insert("bait");
trie.insert("baits");

console.log(trie.find("no")); // true
console.log(trie.find("noise")); // true
console.log(trie.find("noisy")); // false

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
