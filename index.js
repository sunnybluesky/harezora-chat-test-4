const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

server.listen(3000,()=>{
    io.emit("reload")
});

io.on('connection',(socket)=>{
   // ルームに参加する
   socket.on('join-room', (data)=>{
      socket.join(data.roomId);
   });
   // 待ち受け
   socket.on('send-room-msg', (data)=>{
      // クライアントに送信
      io.to(data.roomId).emit('msg', data);
   });

   
   
   // クライアントが切断したときの処理
   socket.on('disconnect', () => {
      console.log('Disconnected:', socket.id);
   });
})