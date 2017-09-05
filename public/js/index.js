const socket = io.connect('/');
const button = document.querySelector('button');

let username;
while(!username){
    username = prompt("Enter a username for this session");
    socket.emit('user joined', username);
}

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
    socket.emit('user dropped', username);
    if(button.getAttribute("disabled")){
        socket.emit('remove completed');
    }
});
