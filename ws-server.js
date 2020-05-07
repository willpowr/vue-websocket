const WebSocket = require('ws');

function startWsServer(wsPort){
  const wss = new WebSocket.Server({ port: wsPort}, () => {
    console.log(`Websocket server running on ws://${wss.options.host || 'localhost'}:${wss.options.port}/`)
  })
  
  wss.onerror = function(event) {
    console.error("WebSocket error observed:", event)
  };
  
  wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
      console.log('received: %s', message)
      ws.send(`Bouncing: ${message}`)
  
    })
  
    ws.send(`Client connected to ws://localhost}:${wsPort}/`)
  })
}

module.exports = { startWsServer }