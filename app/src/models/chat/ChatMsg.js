const ChatMsgStorage = require('./ChatMsgStorage');

class ChatMsg{

    constructor(user_id, content, patient_cd, send_dt){
        this.user_id = user_id; //보낸 사람
        this.content = content; //보내는 메시지
        this.patient_cd = patient_cd;
        this.send_dt = send_dt;
        console.log(this);
    }

    async sendChatMsg(){
        try {
            await ChatMsgStorage.saveChatMsg(this);
            return true;
        
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = ChatMsg;

