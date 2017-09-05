const socket = io.connect('/');
const button = document.querySelector('button');

let username;
while(!username){
    username = prompt("Enter a username for this session");
    socket.emit('user joined', username);
}

document.querySelector('h1').innerHTML = "Welcome, "+username;

socket.on('prompt sent', function (prompt) {
    if(prompt !== document.querySelector('dd').innerHTML){
        if(prompt !== "Nothing Yet"){
            button.removeAttribute("disabled");
        }
        document.querySelector('dd').innerHTML = prompt;
    }
});

button.addEventListener('click', (event)=>{
    button.setAttribute("disabled",true);
    socket.emit('prompt completed', username);
});

window.addEventListener("beforeunload", (e)=>{
    socket.emit('user dropped', username);
    if(button.getAttribute("disabled")){
        socket.emit('remove completed', username);
    }
});
