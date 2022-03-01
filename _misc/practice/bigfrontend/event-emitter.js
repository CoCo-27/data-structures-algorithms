class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback, once = false) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({ callback, once });

    const cbIndex = this.events.length;

    return {
      release: () => {
        this.events[eventName].splice(cbIndex, 1);
      },
    };
  }

  once(eventName, callback) {
    this.subscribe(eventName, callback, true);
  }

  emit(eventName, ...args) {
    this.events[eventName]?.forEach(({ callback, once }, index) => {
      callback(...args);

      if (once) {
        this.events[eventName].splice(index, 1);
      }
    });
  }
}
