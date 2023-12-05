"use strict";

const User = require('../../models/User');
const response = require('../../../app');

const process = {
    login : async (req, res) => {
        try {
            const user = new User(req.body);
            const response = await user.login();

            if (response.success === true){
                res.status(200).json(response);
            } else {
                res.status(400).json(response.msg);
            }
        } catch(error) {
            console.log(error);
            res.status(500).json;
        }
    },
}

module.exports = {
    process
}