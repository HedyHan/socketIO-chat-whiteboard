'use strict';

const socket = io("ws://localhost:3000");
const whiteboard = document.getElementById('whiteboard');
const opts = {
	whiteboard,
	socket
};
const draw = new Draw(opts).init();


whiteboard.setAttribute('width', window.innerWidth);
whiteboard.setAttribute('height', window.innerHeight);