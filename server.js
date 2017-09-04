const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const socketserver = require('socket.io')(http);

app.use(express.static('public'));

socketserver.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

http.listen(PORT);
