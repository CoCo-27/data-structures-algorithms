class MyURLSearchParams {
  constructor(init) {
    if (init.match(/\?/)) {
      init = init.split("?")[1];
    }
    this.params = init.split("&").map((param) => {
      const [key, value] = param.split("=");
      return {
        key,
        value,
      };
    });
    this._prepValue = (value) =>
      typeof value === "undefined" ? "undefined" : value.toString();
  }

  append(name, value) {
    this.params.push({
      key: name,
      value: this._prepValue(value),
    });
  }

  delete(name) {
    this.params = this.params.filter(({ key }) => key !== name);
  }

  entries() {
    const entries = this.params.map(({ key, value }) => [key, value]);
    return entries[Symbol.iterator]();
  }

  forEach(callback) {
    this.params.forEach(({ key, value }) => {
      callback.apply(this, [value, key]);
    });
  }

  get(name) {
    name = name.split("?")[1] || name;
    return this.params.find(({ key }) => key === name)?.value || null;
  }

  getAll(name) {
    return this.params
      .filter(({ key }) => key === name)
      .map(({ value }) => value);
  }

  has(name) {
    return this.params.some(({ key }) => key === name);
  }

  keys() {
    const keys = this.params.map(({ key }) => key);
    return keys[Symbol.iterator]();
  }

  set(name, value) {
    const firstIndex = this.params.findIndex(({ key }) => key === name);

    // Doesn't exist, create new
    if (firstIndex === -1) {
      this.params.push({
        key: name,
        value: this._prepValue(value),
      });
    } else {
      this.params = this.params.filter(({ key }) => key === name);
      this.params.splice(firstIndex, 1, {
        key: name,
        value: this._prepValue(value),
      });
    }
  }

  sort() {
    this.params.sort((a, b) => (a.key > b.key ? 1 : -1));
  }

  toString() {
    let searchString = "";
    this.params.forEach(
      ({ key, value }) => (searchString += `${key}=${value}&`)
    );
    return searchString.slice(0, searchString.length - 1);
  }

  values() {
    const values = this.params.map(({ value }) => value);
    return values[Symbol.iterator]();
  }
}
