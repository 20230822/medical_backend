const ChatMsg = require('../../models/chat/ChatMsg');
const ChatRoom = require('../../models/chat/ChatRoom');

module.exports = function (io) {
    io.on('connection' , (socket) =>{
        socket.on('enter_room', (roomId) =>{
            //접속하면 roomId를 확인하고 db에서 확인
            //확인후 join이나
            io.sockets.
            socket.join(roomId);
            io.to(roomId).emit('join', `누군가 ${roomId}에 들어왔습니다.`);
            console.log('누군가', roomId, '에 들어와습니다.');
            
            
            //메시지 보냈을때
            socket.on('message', msg =>{
                socket.to(roomId).emit('message', msg);
            });
           
            //나갔을때
            socket.on('disconnect', () =>{
                io.to(roomId).emit('join', `누군가 ${roomId}에서 나갔습니다.`);
            }) 
        } );      
    });
}