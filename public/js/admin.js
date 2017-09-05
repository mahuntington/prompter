let enteredPwd;
while(enteredPwd !== 'lemme in'){
    enteredPwd = prompt("Enter admin password");
}
const socket = io.connect('/');
socket.on('users connected', function (data) {
    document.querySelector('#num-users').innerHTML = data;
});

socket.on('prompt completed', function (data) {
    document.querySelector('#current-complete').innerHTML = data;
});

socket.on('username list', function (usernames) {
    const roster = document.querySelector('ul');
    roster.innerHTML = "";
    for(user of usernames){
        const newLi = document.createElement('li');
        newLi.innerHTML = user;
        roster.appendChild(newLi);
    }
});

document.querySelector('form').addEventListener('submit', (event)=>{
    event.preventDefault();
    document.querySelector('#current-complete').innerHTML = 0;
    socket.emit('prompt sent', document.querySelector('[type="text"]').value);
});
