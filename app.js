const WebSocket = require('ws')
const httpServer = require('./http-server')

httpServer.listen(5000)

const wss = new WebSocket.Server({
  port: 7000
})

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})
