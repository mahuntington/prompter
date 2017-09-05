const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const socketserver = require('socket.io')(http);
let usernames = [];
app.use(express.static('public'));

let currentComplete = 0;
let currentPrompt = "Nothing Yet";
socketserver.on('connection', (socket)=>{
    socketserver.emit('prompt sent', currentPrompt);
    socketserver.emit('username list', usernames);
    socketserver.emit('users connected', usernames.length);    
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
    socket.on('user joined', (username)=>{
        usernames.push(username);
        socketserver.emit('username list', usernames);
        socketserver.emit('users connected', usernames.length);
    });
    socket.on('user dropped', (username)=>{
        usernames = usernames.filter((currentElement)=>{
            return currentElement !== username;
        });
        socketserver.emit('username list', usernames);
        socketserver.emit('users connected', usernames.length);
    });
});

http.listen(PORT);
