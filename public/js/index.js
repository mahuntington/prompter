const socket = io.connect('/');
const button = document.querySelector('button');

let username;
while(!username){
    username = prompt("Enter your full name for this session");
    socket.emit('user joined', username);
}

document.querySelector('h1').innerHTML = "Welcome, "+username;

socket.on('prompt sent', function (prompt) {
    if(prompt !== document.querySelector('dd').innerHTML){
        if(prompt !== "Nothing Yet"){
            button.removeAttribute("disabled");
            button.classList.remove("invisible");
        }
        document.querySelector('dd').innerHTML = prompt;
    }
});

socket.on('disconnect students', function (prompt) {
    document.querySelector('h1').innerHTML = "Thanks for attending this class!"
    document.querySelector('main').innerHTML = "";
    window.close();
});

socket.on('get usernames', function (){
    socket.emit('user joined', username);
});

socket.on('get completeds', function (){
    if(button.getAttribute("disabled")){
        socket.emit('prompt completed', username);
    }
});

button.addEventListener('click', (event)=>{
    button.setAttribute("disabled",true);
    button.classList.add("invisible");
    socket.emit('prompt completed', username);
});

window.addEventListener("beforeunload", (e)=>{
    socket.emit('user dropped', username);
    if(button.getAttribute("disabled")){
        socket.emit('remove completed', username);
    }
});
