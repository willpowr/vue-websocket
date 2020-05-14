const wsUri = 'ws://localhost:8080/'

let websocket
let chat
let inputBox
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
  
  // Send message if the user presses enter in the the inputBox field.
  inputBox.onkeypress = function (e) {
    if (!e) {
      e = window.event;
    }
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
      doSend();
      return false;
    }
  }

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
  writeToLog('Connected to chat')
  wsIsOpen = true
  chat.style.display = 'block'
  connectButton.innerText = 'Disconnect'
}

function onClose(evt) {
  writeToLog('This chat session is over!')
  wsIsOpen = false
  chat.style.disabled = true
  connectButton.innerText = 'Connect'
}

function onMessage(evt) {
  writeMessage(true, evt.data)
}

function onError(evt) {
  writeToLog(evt.data)
}

function doSend() {
  const message = inputBox.value
  writeMessage(false, message)
  websocket.send(message)
  inputBox.value = ''
}

function writeToLog(logMessage) {
  const logItem = document.createElement("p")
  logItem.innerHTML = logMessage
  log.appendChild(logItem)
}

function writeMessage(inbound, message) {
  const bubble = document.createElement("div")
  bubble.classList.add("bubble")
  let direction = inbound ? "inbound" : "outbound"
  bubble.classList.add(direction)
  bubble.style.wordWrap = "break-word"
  bubble.innerHTML = message
  log.appendChild(bubble)
}

window.onload = init
