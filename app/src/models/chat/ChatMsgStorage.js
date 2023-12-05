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
        const query = 
        `SELECT CHAT_PK AS chat_id, USER_ID AS user, PATIENT_CD AS patient, CONTENT as content, SEND_DT as send_date
        FROM (
            SELECT * FROM CHAT_TB
            WHERE PATIENT_CD = ?
            ORDER BY SEND_DT DESC LIMIT 20
        ) AS recent_chats
        ORDER BY send_date ASC;`;
        try {
            [rows, fields] = await queryExe(query, [patient_cd]);
            return rows;

        } catch (error) {
            console.log(error);
        }
    }

    static async getUpperChatLog(msg){
        const query = 
        `SELECT CHAT_PK AS chat_id, USER_ID AS user, PATIENT_CD AS patient, CONTENT as content, SEND_DT as send_date
        FROM (
            SELECT * FROM CHAT_TB
            WHERE PATIENT_CD = ?
            AND CHAT_PK < ?
            ORDER BY SEND_DT DESC LIMIT 20
        ) AS recent_chats
        ORDER BY send_date ASC;`;
        try {
            [rows, fields] = await queryExe(query, [msg.patient, msg.chat_id]);
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getDownChatLog(msg){
        const query = 
        `SELECT CHAT_PK AS chat_id, USER_ID AS user, PATIENT_CD AS patient, CONTENT as content, SEND_DT as send_date
        FROM (
            SELECT * FROM CHAT_TB
            WHERE PATIENT_CD = ?
            AND CHAT_PK > ?
            ORDER BY SEND_DT DESC 
        ) AS recent_chats
        ORDER BY send_date ASC LIMIT 20;`;
        try {
            [rows, fields] = await queryExe(query, [msg.patient, msg.chat_id]);
            return rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getChatLogByDay(patient_cd,day){
        const query = 
        `SELECT USER_ID AS user, PATIENT_CD AS patient, CONTENT as content, SEND_DT as send_date
        FROM CHAT_TB
        WHERE PATIENT_CD = ?
        AND DATE(SEND_DT) like ?;`
        try {
            [rows, fields] = await queryExe(query, [patient_cd, `${day}%`]);
            return rows
        } catch (error) {
            console.log(error);
        }
    }

    static async getChatKeyByContent(patient_cd, content){
        const query = 
        `SELECT CHAT_PK AS chat_id FROM CHAT_TB
        WHERE PATIENT_CD = ?
        AND CONTENT LIKE ?;`
        try {
            [rows, fields] = await queryExe(query, [patient_cd, `%${content}%`]);
            return rows
        } catch (error) {
            console.log(error);
        }
    }

    static async getChatLogByKey(patient_cd, chat_id){
        const query = 
        `SELECT CHAT_PK AS chat_id, USER_ID AS user, PATIENT_CD AS patient, CONTENT as content, SEND_DT as send_date
        FROM (
            SELECT * FROM CHAT_TB
            WHERE PATIENT_CD = ?
            AND CHAT_PK >= ?
            ORDER BY SEND_DT DESC 
        ) AS recent_chats
        ORDER BY send_date ASC LIMIT 20`
        try {
            [rows, fields] = await queryExe(query, [patient_cd, chat_id]);
            return rows
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = ChatMsgStorage;