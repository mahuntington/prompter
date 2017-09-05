const socket = io.connect('/');
const button = document.querySelector('button')
socket.on('prompt sent', function (data) {
    button.removeAttribute("disabled");
    document.querySelector('dd').innerHTML = data;
});
button.addEventListener('click', (event)=>{
    button.setAttribute("disabled",true);
});
