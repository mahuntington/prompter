const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const socketserver = require('socket.io')(http);

app.use(express.static('public'));

let connectedUsers = 0;
let currentComplete = 0;
socketserver.on('connection', (socket)=>{
    connectedUsers++;
    socketserver.emit('users connected', connectedUsers);
    socket.on('disconnect', ()=>{
        connectedUsers--;
        socketserver.emit('users connected', connectedUsers);
    });
    socket.on('prompt sent', (prompt)=>{
        currentComplete = 0;
        socketserver.emit('prompt sent', prompt);
    });
    socket.on('prompt completed', ()=>{
        currentComplete++;
        socketserver.emit('prompt completed', currentComplete);
    });
});

http.listen(PORT);
