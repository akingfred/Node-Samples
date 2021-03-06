const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
server.listen(3000);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
   console.log('클라이언트 접속');

   socket.on('message', (data) => {
      console.log('message from client : ', data['message']);
      socket.emit('echo', data);
   });

   socket.on('disconnect', () => {
      console.log('Disconnected');
   });
});

// 키보드 입력
const is = process.stdin;

// System Namespace
var system = io.of('/system');
system.on('connection', (socket) => {
   console.log('emergency namespace connected');

   is.on('data', (chunk) => {
      console.log('emergency namespace!');
      socket.emit('message', { msg: chunk.toString() });
   });
});