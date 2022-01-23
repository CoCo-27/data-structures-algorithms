// A hash table is just an array in the background, the key is converted to a numeric index using a hash function (relative to the size of the array)
// this is the position where the value is stored, we also store the key in case we need to do collision resolution
// collisions happen when the same index is generated for 2 different keys, this is much more likely if the array size is small
// in this case we need to store both key and value and loop through these to update only the one that matters
class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  // Can be any fast hash algorithm like MD5, etc.
  // The main purpose is to always return the same value given the same input
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  set(key, value) {
    const address = this._hash(key);
    let bucket = this.data[address];

    if (!bucket) {
      this.data[address] = [];
      bucket = this.data[address];
    }

    if (bucket.length > 0) {
      // Override previous key if exists
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i] = [key, value];
          return; // Exit early
        }
      }
    }

    // We prevent collisions by pushing pairs to an array
    // e.g. [["grapes", 1000], ["apples", 666]]
    bucket.push([key, value]);
  }

  get(key) {
    const address = this._hash(key);
    const bucket = this.data[address];

    // Non-existent key
    if (!bucket) return undefined;

    // In case only 1 item in bucket O(n) complexity
    // Most of the time it will be this but in our example we intentionally created a memory table with a length of "2" to trigger collisions
    // In a real life scenerio memory collisions are very rare but we must still account for them
    if (bucket.length === 1) {
      return bucket[1];
    }
    // In case of multiple items due to collision
    else {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          return bucket[i][1];
        }
      }
    }
  }

  // O(n)
  keys() {
    const keys = [];
    for (let i = 0; i < this.data.length; i++) {
      const bucket = this.data[i];
      if (bucket) {
        if (bucket.length === 1) {
          keys.push(bucket[0][0]);
        }
        // In case of collision
        else {
          for (let j = 0; j < bucket.length; j++) {
            keys.push(bucket[j][0]);
          }
        }
      }
    }
    return keys;
  }
}

const myHashTable = new HashTable(2);

myHashTable.set("grapes", 1000);
myHashTable.set("apples", 666);
myHashTable.set("apples", 9);

myHashTable.get("grapes"); // 1000
myHashTable.get("apples"); // 9

myHashTable.keys(); // ['grapes', 'apples']
