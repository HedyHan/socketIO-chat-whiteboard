'use strict';

const socket = io("ws://localhost:3000");
const $input = document.getElementById('input');
const $submit = document.getElementById('submit');
const $messages = document.getElementById('messages');

socket.on('connect', function () {

        console.log("Connection open ...");
        let info = 'Connection opened.';
        createMessage(info, true);
        socket.send("Remote User Connected.");
    }
);

socket.on('message', function (data) {
    createMessage(data)
});

socket.on('close', function () {
    console.log("Connection closed.");
});

$submit.addEventListener('click', function () {
    let msg = $input.value;
    if (msg.length) {
        socket.send(msg);
        $input.value = "";
        createMessage(msg, true)
    }
});

function createMessage(msg, isLocalUser) {
    let line = document.createElement("li");
    line.innerHTML = (isLocalUser) ? 'Local: ' + msg : 'Remote: ' + msg;
    $messages.appendChild(line);
}



