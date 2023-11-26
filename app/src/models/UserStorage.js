"use strict";
const maria = require('../database/maria');
const queryExe = require('./common');

class UserStorage {
    static async getUserInfo(id) {
        const query = "SELECT USER_ID, USER_PW FROM USER_TB WHERE USER_ID = ?;";
        try{
            [rows, fields] = await queryExe(query, [id]);

            if(rows.length > 0) //값이 있다면
            {
                return rows[0];
            }
            return { success : false, data : '회원정보가 없습니다.' };
        }
        catch(error){
            return { success : false, msg : error } ;
        }
    }
}

module.exports = UserStorage;
