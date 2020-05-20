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
    ws.send(`Hi, \n Thanks for joining me for a chat. How are you today?`)

    ws.on('message', (message) => {
      console.log('received: %s', message)

      const trimmedMessage = message.trim().toLowerCase()
      const wellnessMatch = /(i('?| a)m)?.*(fine|good|(very well)|well|ok(ay)?|alright|great|cool|sweet|not( too)? bad)( thank(you|s))?.*/i

      let iGetIt = false
      let response = ''

      const clientWellness = trimmedMessage.match(wellnessMatch)
      if(clientWellness){
        console.log(clientWellness)
        response += `Good to hear you're ${clientWellness[3]}. `
        iGetIt = true
      }
      

      if(trimmedMessage.includes('how are you?', trimmedMessage.length-16)){
        ws.send(response += `I'm fine, Thanks for asking. `)
        return
      }

      if(trimmedMessage.includes('?', trimmedMessage)){
        ws.send(`Hmmmm. I don't know, but you could try Google!`)
        return
      }

      response += iGetIt? '' : `What you just said was so enlightening. I'm learning so much about you. `

      ws.send(response)

    })
  })
}

module.exports = { startWsServer }