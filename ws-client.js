const wsUri = 'ws://localhost:8080/'

let websocket
let chat
let inputBox
let logBox
let wsIsOpen

function toggleWsConnection() {
  wsIsOpen ? websocket.close() : createWebsocket()
}

function init() {
  connectButton = document.getElementById('connect')
  connectButton.addEventListener("click", toggleWsConnection, false);
  chat = document.getElementById('chat')  
  inputBox = document.getElementById('input-box')
  logBox = document.getElementById('log-box')
  
}

function createWebsocket() {
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
  wsIsOpen = true
  chat.style.display = 'block'
  connectButton.innerText = 'Disconnect'
}

function onClose(evt) {
  writeToLog('DISCONNECTED')
  wsIsOpen = false
  chat.style.disabled = true
  connectButton.innerText = 'Connect'
}

function onMessage(evt) {
  writeToLog( `⇙ ${evt.data}` )
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

window.onload = init
