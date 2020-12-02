// var express = require("express");
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var port = process.env.PORT || 3000;

// app.use(express.json());

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

// app.listen(port, () => {
//  console.log("Server running on port "+port);
// });
  
// http.listen(port, function(){
//     console.log('listening on *:' + port);
// });

// app.post("/create-socket", (req, res, next) => {
//     var roomname = req.body.roomname;
//     var username =  req.body.username;
    
//     io.on('connection', function(socket){
//         socket.on('create', function(roomname){
//             socket.join(roomname);
//         });
//     });

//     res.json(username+", has successfully connected on room:"+roomname);

//     // res.json(["Tony","Lisa","Michael","Ginger","Food"]);
//     // console.log(req.body);
// });


  
// io.on('connection', (socket) => {

//     socket.on('create', function(room) {
//         console.log('room-create: '+ room);
//         socket.join(room);
//     });

//     socket.on('publish', function(room, data){
//         console.log('data-publish: ', data);
//         socket.to(room).emit('data: ', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });

// });


const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
const https = require('https');
const server = https.createServer(app);
const socket = require('socket.io');
const io = socket(server);
const port = process.env.PORT || 8080;

// const io = require('socket.io')(server, {
//     cors: {
//       origin: '*',
//     }
// });

io.on('connection', onConnection); 

function onConnection(socket){
socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}


server.listen(port, () => console.log(`server is running on port ${port}`));