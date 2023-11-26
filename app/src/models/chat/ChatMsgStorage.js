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
        const query = 'SELECT USER_ID, PATIENT_CD, CONTENT, SEND_DT FROM CHAT_TB WHERE PATIENT_CD = ? ORDER BY SEND_DT ASC;';
        try {
            [rows, fields] = await queryExe(query, [patient_cd]);
            const {
                USER_ID : user,
                PATIENT_CD : patient,
                CONTENT : content,
                SEND_DT : send_dt
            } = rows
            const result = {
                user,
                patient,
                content,
                send_dt
            }
            return result;

        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ChatMsgStorage;