class Socket {
  constructor (events) {
    this.url = 'ws://192.168.0.15:7000'
    this.ws = new window.WebSocket(this.url)
    this.ws.onopen = events.onopen.bind(this)
    this.ws.onclose = events.onclose.bind(this)
    this.ws.onerror = events.onerror.bind(this)
    this.ws.onmessage = this._onmessage.bind(this)
    this.listeners = []
  }

  _onmessage (evt) {
    this.listeners.forEach(listener => listener(JSON.parse(evt.data)))
  }

  send (messageJSON) {
    this.ws.send(JSON.stringify(messageJSON))
  }

  addListener (listener) {
    this.listeners.push(listener)
  }
}
Object.freeze(Socket)
