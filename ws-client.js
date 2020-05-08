const wsUri = 'ws://localhost:8080/'
let connected = false
let chat
let inputBox
let logBox

function init() {
  connectButton = document.getElementById('connect')  
  chat = document.getElementById('chat')  
  inputBox = document.getElementById('input-box')
  logBox = document.getElementById('log-box')
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
  writeToLog('CONNECTED')
  chat.style.display = 'block'
  connectButton.innerText = 'Disconnect'
  connected = true

}

function onClose(evt) {
  writeToLog('DISCONNECTED')
  chat.style.disabled = true
  connectButton.innerText = 'Connect'
  connected = true

}

function onMessage(evt) {
  writeToLog( `⇙ ${evt.data}` )
  // websocket.close();
}

function onError(evt) {
  writeToLog(evt.data)
}

function doSend() {
  const message = inputBox.value
  writeToLog(`⇗ ${message}`);
  websocket.send(message)
}

function writeToLog(message) {
  logBox.value += message + '\n'
}
