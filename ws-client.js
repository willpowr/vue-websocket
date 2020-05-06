const wsUri = 'ws://localhost:8080/'
let output

function init() {
  output = document.getElementById('log')
  testWebSocket()
}

function testWebSocket() {
  websocket = new WebSocket(wsUri)
  websocket.onopen = function (evt) {
    onOpen(evt);
  }
  websocket.onclose = function (evt) {
    onClose(evt);
  }
  websocket.onmessage = function (evt) {
    onMessage(evt);
  }
  websocket.onerror = function (evt) {
    onError(evt);
  }
}

function onOpen(evt) {
  writeToLog(JSON.stringify(evt))
  // doSend("WebSocket test2");
}

function onClose(evt) {
  writeToLog('DISCONNECTED')
}

function onMessage(evt) {
  writeToLog( evt.data )
  // websocket.close();
}

function onError(evt) {
  writeToLog(evt.data)
}

function doSend(message) {
  writeToLog('SENT: ' + message);
  websocket.send(message)
}

function writeToLog(message) {
  output.value += message + '\n'
}
