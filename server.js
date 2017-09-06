const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const socketserver = require('socket.io')(http);
app.use(express.static('public'));

let usernames = [];
let currentComplete = [];
let currentPrompt = "Nothing Yet";
socketserver.on('connection', (socket)=>{
    socketserver.emit('prompt sent', currentPrompt);
    socketserver.emit('username list', usernames);
    socketserver.emit('prompt completed', currentComplete);

    socket.on('prompt sent', (prompt)=>{
        currentComplete = [];
        currentPrompt = prompt;
        socketserver.emit('prompt sent', currentPrompt);
        socketserver.emit('prompt completed', currentComplete);
    });
    socket.on('prompt completed', (username)=>{
        currentComplete.push(username);
        socketserver.emit('prompt completed', currentComplete);
    });
    socket.on('remove completed', (username)=>{
        currentComplete = currentComplete.filter((currentElement)=>{
            return currentElement !== username;
        });
        socketserver.emit('prompt completed', currentComplete);
    });
    socket.on('user joined', (username)=>{
        usernames.push(username);
        socketserver.emit('username list', usernames);
        socketserver.emit('prompt completed', currentComplete);
    });
    socket.on('user dropped', (username)=>{
        usernames = usernames.filter((currentElement)=>{
            return currentElement !== username;
        });
        socketserver.emit('username list', usernames);
        socketserver.emit('prompt completed', currentComplete);
    });
    socket.on('reset class', ()=>{
        usernames = [];
        currentComplete = [];
        currentPrompt = "Nothing Yet";
        socketserver.emit('username list', usernames);
        socketserver.emit('prompt completed', currentComplete);
        socketserver.emit('prompt sent', currentPrompt);
    });
});

http.listen(PORT);
