const socket = io.connect('/');
socket.on('users connected', function (data) {
    document.querySelector('dd').innerHTML = data;
});
