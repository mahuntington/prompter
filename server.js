const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const socketserver = require('socket.io')(http);

app.use(express.static('public'));

let connectedUsers = 0;
socketserver.on('connection', function (socket) {
    connectedUsers++;
    socketserver.emit('users connected', connectedUsers);
    socket.on('disconnect', function() {
        connectedUsers--;
        socketserver.emit('users connected', connectedUsers);
    });
});

http.listen(PORT);
