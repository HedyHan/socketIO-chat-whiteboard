const express = require('express');

const app = express();

const http = require('http');

app.use(express.static('.'));

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('message', (data) => {
        socket.broadcast.send(data);
    });

    socket.on('drawing', (data) => {
        socket.broadcast.emit('draw_remote', data);
    })
});


server.listen(3000, () => {
    console.log(`Server running at port 3000 `);
});