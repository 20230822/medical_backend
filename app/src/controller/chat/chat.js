const ChatMsg = require('../../models/chat/ChatMsg');
const ChatRoom = require('../../models/chat/ChatRoom');

function formatDate() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
}

module.exports = function (io) {
    io.on('connection' , async (socket) =>{
        socket.on('enter_room', (roomId) =>{
            //접속하면 roomId를 확인하고 db에서 확인
            //확인후 join이나
    
            socket.join(roomId);
            io.to(roomId).emit('join', `누군가 ${roomId}에 들어왔습니다.`);
            console.log('누군가', roomId, '에 들어와습니다.');

            //메시지 보냈을때
            socket.on('message', async msg => {
                const data = JSON.parse(msg);
                const chatMsg = new ChatMsg(data.user_id, data.content, data.patient_cd, formatDate());
                const check = await chatMsg.sendChatMsg(); //db저장 후
                io.to(roomId).emit('message', data); //방사람들에게 전달
            });
           
            socket.on('error', (error) =>{
                console.log(error);
            });
            //나갔을때
            socket.on('disconnect', ()=>{
                io.to(roomId).emit('join', `누군가 ${roomId}에서 나갔습니다.`);
            }); 
        } );      
    });
}