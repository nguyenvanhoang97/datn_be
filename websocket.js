const WebSocketServer = require('websocket').server;
const http = require('http');
const cors = require('cors');
const express = require('express')

const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(3001, console.log('Server run 3001'))

const server = http.createServer(function (request, response) {
  
});
server.listen(3000, function () { });
let data = {}
let dataTest = {
  humidity: 65,
  temperature: 12,
  soil_moisture: 68,
  status_motor: 1
}

wsServer = new WebSocketServer({
  httpServer: server
});
let kitConnect = null

wsServer.on('request', function (request) {
  const connection = request.accept(null, request.origin);

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      const { utf8Data } = message
      data = utf8Data
      connection.send(utf8Data)
      kitConnect = connection
    }
  });

  connection.on('close', function () {
    kitConnect = null
  });
});

app.get('/', (req, res) => {
  if (kitConnect) {
    res.send({
      status: 200,
      data: data
    });
  } else {
    res.send({
      status: 200,
      data: dataTest
    })
  }
})
app.post('/sendMotor', (req, res) => {
  console.log(req.body.status);
  if (kitConnect) {
    kitConnect.send(req.body.status)
    if (req.body.status === 'MOTOR_ON') {
      res.send('MOTOR_ON')
    } else {
      res.send('MOTOR_OFF')
    }
  } else {
    res.send('MOTOR_ERROR')
  }
})
app.post('/sendAuto', (req, res) => {
  console.log(req.body.status);
  if (kitConnect) {
    kitConnect.send(req.body.status)
    if (req.body.status === 'AUTO_ON') {
      res.send('AUTO_ON')
    } else {
      res.send('AUTO_OFF')
    }
  } else {
    res.send('AUTO_ERROR')
  }
})