const WebSocket = require('ws');

function startWsServer(wsPort) {
  const wss = new WebSocket.Server({ port: wsPort }, () => {
    console.log(`Websocket server running on ws://${wss.options.host || 'localhost'}:${wss.options.port}/`)
  })

  wss.onerror = (event) => {
    console.error("WebSocket error observed:", event)
  };

  wss.on('close', (event) => {
    console.log("This conversation is over!")
  })

  wss.on('connection', (ws) => {
    ws.send(`Hi, \n Thanks for joining me for a chat. What are you saying?`)

    ws.on('message', (message) => {
      console.log('received: %s', message)
      ws.send(`You just said, "${message}"`)

    })
  })
}

module.exports = { startWsServer }