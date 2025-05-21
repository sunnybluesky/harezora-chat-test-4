// official
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketio = new Server(server);


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

server.listen(3000);

socketio.on('connection',(socket)=>{
   // ルームに参加する
   socket.on('join-room', (data)=>{
      socket.join(data.roomId);
   });
   // 待ち受け
   socket.on('send-room-msg', (data)=>{
      // クライアントに送信
      socketio.to(data.roomId).emit('msg', data);
      socket.to(data.roomId).emit('msg', data);
      socket.emit("msg",data)
   });

   
   
   // クライアントが切断したときの処理
   socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
   });
})