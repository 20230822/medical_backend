"use strict";

const Patient = require('../../models/Patient');
const response = require('../../../app');

const process = {
    add : async (req, res) => {
        try {
            const patient = new Patient(req.body);
            const response = await patient.add();

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

    detailInfo : async (req, res) => {
        try {
            const patient = new Patient(req.body);
            const response = await patient.detailInfo();

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