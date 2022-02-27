class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    const cbIndex = this.events.length;

    return {
      release: () => {
        this.events[eventName].splice(cbIndex, 1);
      },
    };
  }

  emit(eventName, ...args) {
    this.events[eventName]?.forEach((cb) => {
      cb(...args);
    });
  }
}
