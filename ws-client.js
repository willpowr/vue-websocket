const wsUri = 'ws://localhost:8080/'

let websocket
let chat
let inputBox
let logBox
let log
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
  log = document.getElementById('log')
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
  writeToScreen(false, `⇗ ${message}`);
  websocket.send(message)
}

function writeToLog(message) {
  logBox.value += message + '\n'
}

function writeToScreen(inbound, message) {
  let bubble = document.createElement("div")
  bubble.className = "bubble"
  bubble.className += inbound ? " inbound" : "outbound"
  bubble.style.wordWrap = "break-word"
  bubble.innerHTML = message;
  log.appendChild(bubble);
}

window.onload = init
