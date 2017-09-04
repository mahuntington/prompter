const socket = io.connect('/');
socket.on('users connected', function (data) {
    console.log(data);
});
// socket.emit('my other event', { my: 'data' });
