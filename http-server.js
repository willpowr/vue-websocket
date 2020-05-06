const handler = require('serve-handler');
const http = require('http');
const wsServer = require('./ws-server.js');

const httpPort = 81

const server = http.createServer((request, response) => {
  return handler(request, response);
})

server.listen(httpPort, () => {
  const parts = server._connectionKey.split(':')
  const lastPart = parts.pop()
  const port = lastPart === '0' ? http.globalAgent.defaultPort : lastPart
  const host = parts.pop() || 'localhost'
  console.log(`Webserver running on http://${host}:${port}/`)

  wsServer.startWsServer(8080)

})
