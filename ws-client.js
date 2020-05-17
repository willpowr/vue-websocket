const wsUri = 'ws://localhost:8080/'

let websocket
let chat
let inputBox
let logContent
let wsIsOpen = false
let connectedLed
let connectButton

function getTimeStamp() {
  const event = new Date(Date.now());
  const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}; 
  return (event.toLocaleDateString(undefined, options));
}

function appendLog(element) {
  logContent.appendChild(element)
  logContent.scrollTop = logContent.scrollHeight
}


function toggleWsConnection() {
  

  if(wsIsOpen){
    websocket.close()
    connectedLed.classList.remove('on')
    inputBox.setAttribute('readonly', !wsIsOpen)

  } else {
    createWebsocket()
    connectedLed.classList.add('on')
    inputBox.removeAttribute('readonly')

  }

}

function resetInput() {
  inputBox.value = ''
  inputBox.focus()
}

function init() {
  connectButton = document.getElementById('connect')
  connectButton.addEventListener("click", toggleWsConnection, false);
  connectedLed = document.getElementById('connected-led')

  chat = document.getElementById('chat')
  inputBox = document.getElementById('input-box')

  // Send message if the user presses enter in the the inputBox field.
  inputBox.onkeydown = (e) => {
    if (!e) {
      e = window.event;
    }
    let keyCode = e.keyCode || e.which;
    if (keyCode == 13 && !e.shiftKey) {
      doSend();
      return false;
    }
  }

  logContent = document.getElementById('log-content')
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
  chat.style.display = 'table'
  connectButton.innerText = 'Disconnect'
  resetInput()
}

function onClose(evt) {
  writeToLog('Disconnected')
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
  resetInput()
}

function writeToLog(logMessage) {
  const logItem = document.createElement("p")
  logItem.innerHTML = `${logMessage} : ${getTimeStamp()}`
  appendLog(logItem)
}

function writeMessage(inbound, message) {
  const bubble = document.createElement("div")
  bubble.classList.add("bubble")
  let direction = inbound ? "inbound" : "outbound"
  bubble.classList.add(direction)
  bubble.style.wordWrap = "break-word"
  bubble.innerHTML = message
  appendLog(bubble)
}

window.onload = init
