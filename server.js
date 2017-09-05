const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const socketserver = require('socket.io')(http);

app.use(express.static('public'));

let connectedUsers = 0;
let currentComplete = 0;
let currentPrompt = "Nothing Yet";
socketserver.on('connection', (socket)=>{
    connectedUsers++;
    socketserver.emit('users connected', connectedUsers);
    socketserver.emit('prompt sent', currentPrompt);
    socket.on('disconnect', ()=>{
        connectedUsers--;
        socketserver.emit('users connected', connectedUsers);
    });
    socket.on('prompt sent', (prompt)=>{
        currentComplete = 0;
        currentPrompt = prompt;
        socketserver.emit('prompt sent', currentPrompt);
    });
    socket.on('prompt completed', ()=>{
        currentComplete++;
        socketserver.emit('prompt completed', currentComplete);
    });
    socket.on('remove completed', ()=>{
        currentComplete--;
        socketserver.emit('prompt completed', currentComplete);
    });
});

http.listen(PORT);
