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

    static async getEnterChatLog(patient_cd){
        const query = 'SELECT USER_ID AS user, PATIENT_CD AS patient, CONTENT as content, SEND_DT as date FROM CHAT_TB WHERE PATIENT_CD = ? ORDER BY SEND_DT ASC;';
        try {
            [rows, fields] = await queryExe(query, [patient_cd]);
            
           
            return rows;

        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ChatMsgStorage;