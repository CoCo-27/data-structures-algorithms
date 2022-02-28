class LRUCache {
  cache: Map<number, number>;
  capacity: number;

  constructor(capacity: number) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (!this.cache.has(key) && this.cache.size === this.capacity) {
      const iterator = this.cache[Symbol.iterator]();
      const deleteKey = iterator.next().value[0];
      this.cache.delete(deleteKey);
    }
    this.cache.delete(key);
    this.cache.set(key, value);
  }
}
