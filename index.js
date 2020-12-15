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

// app.use(cors('*'));
// app.use(function(request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
var allowedOrigins = "*";
//  const io = io(server, {
//     origins: allowedOrigins,
//     // path : ''
// });
const io = socket(server);
const port = process.env.PORT || 8080;
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Pass to next layer of middleware
    next();
    });
// var allowedOrigins = "http://localhost:*";
//  io = io(server, {
    // origins: allowedOrigins,
    // path : path
// });

// httpServer.listen(3000);
// const io = require('socket.io')(server, {
//     cors: {
//       origin: '*',
//     }
// });

io.on('connection', onConnection); 

function onConnection(socket){

    // socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    // CREATE ROOM
    socket.on('create-room', function(data) {
        console.log('create-room: '+ data.room);
        socket.join(data.room);
    });

    // PUBLISH DATA
    // socket.on('drawing', function(data){
    //     console.log('data-published: ', data.room, data);
    //     socket.to(data.room).emit('data: ', data);
    // });
    socket.on('drawing', (data) => socket.to(data.room).broadcast.emit('drawing', data));
    socket.on('insession-emit', (data) => socket.broadcast.emit('insession-emit', data));

    // DESTROY ROOM
    socket.on('disconnect-room', () => {
        console.log('user disconnected');
    });

}


server.listen(port, () => console.log(`server is running on port ${port}`));