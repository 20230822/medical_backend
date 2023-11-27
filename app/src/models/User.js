"use strict";

const UserStorage = require('./UserStorage');
const { response } = require('express');

class User {
    constructor(body){
        this.body = body;
    }

    async login() {
        const client = this.body;
        try {
            console.log(client.id);
            //데이터 저장
            const { USER_ID : id, USER_PW : psword, USER_CLASS : user_class} =  await UserStorage.getUserInfo(client.id);

            if (id)
            {
                if (client.psword == psword) {
                    return { success: true, msg: '로그인 성공!', data : user_class };
                }
                return { success: false, msg: '비밀번호가 틀렸습니다.' };
            }
            return { success: false, msg: '존재하지 않는 아이디입니다.' };
        } catch (error) {
            console.error('Error processing UserInfo:', error);
            return { success: false, msg: error.message };
        }
    }
}

module.exports = User;
