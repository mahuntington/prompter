const socket = io.connect('/');
const button = document.querySelector('button');
socket.on('prompt sent', function (prompt) {
    if(prompt !== document.querySelector('dd').innerHTML){
        button.removeAttribute("disabled");
        document.querySelector('dd').innerHTML = prompt;
    }
});
button.addEventListener('click', (event)=>{
    button.setAttribute("disabled",true);
    socket.emit('prompt completed');
});
window.addEventListener("beforeunload", (e)=>{
    if(button.getAttribute("disabled")){
        socket.emit('remove completed');
    }
});
