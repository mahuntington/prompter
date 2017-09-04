const socket = io.connect('/');
socket.on('prompt sent', function (data) {
    document.querySelector('dd').innerHTML = data;
});
