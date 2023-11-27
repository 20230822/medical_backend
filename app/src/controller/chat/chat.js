const ChatMsg = require('../../models/chat/ChatMsg');
const EVENT = require('./chatEnum');
const PatientStorage = require('../../models/PatientStorage');
const ChatMsgStorage = require('../../models/chat/ChatMsgStorage');


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
    io.on(EVENT.CONNECTION , async (socket) =>{
        socket.on( EVENT.ENTER , async (patient_cd , acknowledgmentEnterRoom) =>{
            //접속하면 환자 code db에서 존재하는지 확인
            const result = await PatientStorage.getPatientInfo(patient_cd); 
            if(result.success == true){
                if(result.data.length > 0){  //존재하는 환자면
                    socket.join(patient_cd); //방에 참가
                    //이전 채팅 기록 가져오기

                    const rows = await ChatMsgStorage.getEnterChatLog(patient_cd);
                    acknowledgmentEnterRoom(true);
                    await socket.emit(EVENT.MSG_LOG, rows);
                    
                    io.to(patient_cd).emit( EVENT.JOIN , `누군가 ${patient_cd}에 들어왔습니다.`); //방에 참가했다는 메시지
                    console.log('누군가', patient_cd, '에 들어와습니다.');
                }
                else{ //존재하는 환자가 아니면
                    acknowledgmentEnterRoom(false);
                    socket.emit( EVENT.ERROR , '존재하지 않는 환자입니다.');
                }
            }else{  //환자 불러오는 중 에러
                console.log(result.error);
                acknowledgmentEnterRoom(false);
                socket.emit(EVENT.ERROR , result.error);
            }

            //메시지 보냈을때
            socket.on( EVENT.MESSAGE , async (data, acknowledgment) => {
                try {
                    const msg = JSON.parse(data);
                    const chatMsg = new ChatMsg(msg.user_id, msg.content, msg.patient_cd, formatDate());
                    const check = await chatMsg.sendChatMsg(); //db저장 후
                    acknowledgment(check); //콜백
                    io.to(patient_cd).emit('message', msg); //방사람들에게 전달
                    if(check == false){
                        socket.emit('error', "메시지 형태가 잘못되었습니다.");
                    }
                } catch (error) {
                    console.log(error);
                    acknowledgment(false);
                    socket.emit(EVENT.ERROR , result.error);
                }
            });

            //이전 기록 불러오기
            socket.on('upper_message', async (data, acknowledgment) =>{
                try {
                    //받은 메시지를 기준으로 위의 20개를 받아옴
                    const msg = JSON.parse(data);
                    const result = await ChatMsgStorage.getUpperChatLog(msg);
                    acknowledgment(true);
                    await socket.emit(EVENT.MSG_LOG, result);  //데이터 전달

                } catch (error) {
                    console.log(error);
                    acknowledgment(false);
                    socket.emit(EVENT.ERROR , result.error);
                }
            });
           

            socket.on('day_log', async (patient_cd ,day, acknowledgment) =>{
                try{
                    const result = await ChatMsgStorage.getChatLogByDay(patient_cd, day);
                    acknowledgment(true);
                    socket.emit(EVENT.MSG_LOG, result);
                }catch(error){
                    console.log(error);
                    acknowledgment(false);
                    socket.emit(EVENT.ERROR , result.error);
                }
            });



            //에러 발생이벤트 받았을때
            socket.on( EVENT.ERROR, (error) =>{
                console.log(error);
            });

            //나갔을때
            socket.on(EVENT.DISCONNECT, ()=>{
                io.to(patient_cd).emit('join', `누군가 ${patient_cd}에서 나갔습니다.`);
            }); 
        } );      
    });
}