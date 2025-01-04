class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback());
    }
  }
}

export const eventEmitter = new EventEmitter(); 