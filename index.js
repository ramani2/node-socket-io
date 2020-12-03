const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('listening on *:' + port);
});

const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});