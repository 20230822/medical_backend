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

    patients : async (req, res) => {
        try {
            const response = await Patient.patients();

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

const update = {
    del : async (req, res) => {
        try {
            
            const patient = new Patient(req.body);
            const response = await patient.del();

            if (response.success === true){
                res.status(200).json(response);
            } else {
                res.status(400).json(response.msg);
            }
        } catch(error) {
            console.log(error);
            res.status(500).json;
        }
    }
}

module.exports = {
    process, update
}