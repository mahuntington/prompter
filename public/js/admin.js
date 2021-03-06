let enteredPwd;
let students;
while(enteredPwd !== 'lemme in'){
    enteredPwd = prompt("Enter admin password");
}
const socket = io.connect('/');

socket.on('prompt completed', function (usernames) {
    document.querySelector('#current-complete').innerHTML = usernames.length;
    const roster = document.querySelector('#completed-list ul');
    roster.innerHTML = "";
    for(user of usernames){
        const newLi = document.createElement('li');
        newLi.innerHTML = user;
        roster.appendChild(newLi);
    }

    //uncompleted
    const uncompleted = students.filter((student)=>{
        return usernames.indexOf(student) < 0;
    });
    const uncompletedUl = document.querySelector('#uncompleted-list ul');
    uncompletedUl.innerHTML = "";
    for(user of uncompleted){
        const newLi = document.createElement('li');
        newLi.innerHTML = user;
        uncompletedUl.appendChild(newLi);
    }
});

socket.on('prompt sent', function (prompt) {
    document.querySelector('#current-prompt').innerHTML = prompt;
    if(prompt !== "Nothing Yet"){
        document.querySelector('[type="text"]').value = '';
    }
});

socket.on('username list', function (usernames) {
    students = usernames;
    document.querySelector('#num-users').innerHTML = usernames.length;
    const roster = document.querySelector('#roster ul');
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

document.querySelector('#reset').addEventListener('click', (event)=>{
    event.preventDefault();
    socket.emit('reset class');
});

document.querySelector('#refresh').addEventListener('click', (event)=>{
    event.preventDefault();
    socket.emit('refresh roster');
});
