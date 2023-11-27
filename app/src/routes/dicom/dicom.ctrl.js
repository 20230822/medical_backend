"use strict";

const Dicom = require('../../models/Dicom');
const response = require('../../../app');

const process = {
    upload : async (req, res) => {
        try {
            const response = await Dicom.uploadFiles(req.body, req.files);
            
            console.log(response.success);
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

    download : async (req, res) => {
        try {
            const response = await Dicom.download();

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

    list : async (req, res) => {
        try {
            
            const dicom = new Dicom(req.body);
            const response = await dicom.list();

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
    process
}