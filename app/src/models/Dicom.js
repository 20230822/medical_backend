"use strict";

const dicomParser = require('dicom-parser');
const DicomStorage = require('./DicomStorage');
const fs = require("fs");
const AWS = require("aws-sdk");
const { response } = require('express');

class Dicom {
    constructor(body){
        this.body = body;
    }
    
    static async upload(file) {
        console.log(file);
        const s3 = new AWS.S3({
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
        });
    
        const params = {
            Bucket : "aws-ko-medical-develop",
            Key : "medical/" + file.originalname,
            Body : file.buffer,
            ContentType : "application/dicom"
        };
    
        try {
            const data = await s3.upload(params).promise();
            console.log(`File uploaded successfully. ${data}`);
            return data;  // You might want to return the uploaded data
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = Dicom;
