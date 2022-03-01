class StringIterator {
  chars: string[];
  counts: number[];

  constructor(compressed: string) {
    this.chars = [];
    this.counts = [];

    let lastCount = "";

    for (let i = 0; i < compressed.length; i++) {
      const char = compressed[i];
      const isString = char.match(/[a-z]/i);

      if (isString) {
        this.chars.push(char);

        if (lastCount.length) {
          this.counts.push(parseInt(lastCount));
          lastCount = "";
        }
      } else {
        lastCount += char;
      }
    }

    this.counts.push(parseInt(lastCount));
  }

  next(): string {
    if (this.chars.length === 0) return " ";

    const nextValue = this.chars[0];

    this.counts[0]--;

    if (this.counts[0] === 0) {
      this.chars.shift();
      this.counts.shift();
    }

    return nextValue;
  }

  hasNext(): boolean {
    if (this.chars.length === 0) return false;

    return this.counts[0] > 0;
  }
}
