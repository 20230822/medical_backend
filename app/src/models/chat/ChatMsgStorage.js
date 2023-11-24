const queryExe = require('../common');
class ChatMsgStorage{
    static async saveChatMsg(msg){
        const query = 'INSERT INTO CHAT_TB(USER_ID, PATIENT_CD, CONTENT, SEND_DT) VALUES(?, ?, ?, ?);';
        try {
            await queryExe(query, [msg.user_id, msg.patient_cd, msg.content, msg.send_dt]);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ChatMsgStorage;