const clients = require('./clients');

class EventHandler {
  constructor(config) {
    this.handler = new clients[config.handler](config);
  }

  watch(events) {
    this.handler.watch(events)
  }
}

module.exports = EventHandler;