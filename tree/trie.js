class Trie {
  constructor() {
    this.root = null;
    this.children = {};
    // type Node {
    //   [letter]: {
    //     children: Node,
    //   }
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
      const next = node[char];

      charIndex++;

      // Node exists keep going
      if (next) {
        tail = next.children;
        traverse(next.children);
      }
      // No more nodes in path but more chars of word left
      else if (!next && charIndex < word.length - 1) {
        const nextNode = new this.Node(word[charIndex + 1]);
        tail = nextNode.children;
        traverse(nextNode);
      }
      // Insert new node
      else {
        tail[char] = new this.Node(char);
      }
    };

    traverse(this.children);
  }

  find(word) {
    let charIndex = 0;

    function traverse(node) {
      const char = word[charIndex];
      const next = node[char];

      // No chars left in word
      if (charIndex === word.length - 1) {
        // Found!
        return true;
      }
      // Chars left in both word and path
      else if (next) {
        charIndex++;
        return traverse(next.children);
      }
      // Chars left in word but not in path
      else {
        // Not found
        return false;
      }
    }

    return traverse(this.children);
  }
}

const trie = new Trie();

trie.insert("not");

//console.log(trie.find("not"));

console.log(JSON.stringify(trie));
