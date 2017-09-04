const socket = io.connect('/');
socket.on('users connected', function (data) {
    document.querySelector('dd').innerHTML = data;
});

document.querySelector('form').addEventListener('submit', (event)=>{
    event.preventDefault();
    socket.emit('prompt sent', document.querySelector('[type="text"]').value);
});
