const socket = io.connect('/');
socket.on('users connected', function (data) {
    document.querySelector('#num-users').innerHTML = data-1;
});

socket.on('prompt completed', function (data) {
    document.querySelector('#current-complete').innerHTML = data;
});

document.querySelector('form').addEventListener('submit', (event)=>{
    event.preventDefault();
    document.querySelector('#current-complete').innerHTML = 0;
    socket.emit('prompt sent', document.querySelector('[type="text"]').value);
});
