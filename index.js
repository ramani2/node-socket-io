const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('listening on *:' + port);
});

const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/video', (req, res) => {
  res.sendFile(__dirname + '/public/video.html');
});

io.on('connection', (socket) => {
  console.log('user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
  /* socket.on('stream', (stream) => {
    console.log(stream);
    // Send message to everyone but sender
    socket.broadcast.emit('stream', stream);
  }); */
});