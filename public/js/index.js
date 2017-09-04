const socket = io.connect('/');
socket.on('prompt sent', function (data) {
    console.log(data);
});
