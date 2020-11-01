var WebSocketServer = require('websocket').server;
var http = require('http');
const express=require('express')
const app=express()
app.listen(3001)
var server = http.createServer(function (request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(3000, function () { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});
let kitCOnnect=null
// WebSocket server
wsServer.on('request', function (request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function (message) {
    console.log(message)
    if (message.type === 'utf8') {
      // process WebSocket message
      const { utf8Data } = message
      connection.send(utf8Data)
      kitCOnnect=connection
    }
  });

  connection.on('close', function (connection) {
    kitCOnnect=null
    // close user connection
  });
});
app.get('/',(req,res)=>{
  if(kitCOnnect){
  kitCOnnect.send("DMCC")
  res.send("ok")
  }else{
    res.send("deo coonect")
  }
})