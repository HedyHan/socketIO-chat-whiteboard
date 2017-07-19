'use strict';

(function() {
	const ws = io("ws://localhost:3000");
	const $input = document.getElementById('input');
	const $submit = document.getElementById('submit');
	const $messages = document.getElementById('messages');

	ws.on('connect', function() { 

		console.log("Connection open ..."); 
		let info = 'Connection opened.';
		createMessage(info,true);
		ws.send("Remote User Connected.");
	}
	);

	ws.on('message',function(data) {
		createMessage(data)
	});

	ws.on('close',function() {
		console.log("Connection closed.");
	});       

	$submit.addEventListener('click', function(){
		let msg = $input.value;
		if(msg.length){
			ws.send(msg);
			$input.value = "";
			createMessage(msg,true)
		} 
	})

	function createMessage(msg,isLocalUser) {
		let line = document.createElement("li");
		line.innerHTML = (isLocalUser)? 'Local: ' + msg :'Remote: ' + msg;
		$messages.appendChild(line);
	}

})

