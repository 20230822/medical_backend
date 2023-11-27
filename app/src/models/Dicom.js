"use strict";

const dicomParser = require('dicom-parser');
const DicomStorage = require('./DicomStorage');
const fs = require("fs");
const AWS = require("aws-sdk");
const { response } = require('express');

const s3 = new AWS.S3({
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
});

class Dicom {
    constructor(body){
        this.body = body;
    }

    static async upload(client, file) {
    
        const params = {
            Bucket : "aws-ko-medical-develop",
            Key : client.Patient_cd + "/" + file.originalname,
            Body : file.buffer,
            ContentType : "application/dicom",
            overwrite: false
        };

        try {
            const data = await s3.upload(params).promise();
            const result = await DicomStorage.saveToDatabase(client.Patient_cd, params.Key, file.originalname);

            console.log(result);
            console.log(`File uploaded successfully. ${data}`);
            return { success : true };
        } catch (err) {
            if (err.code === 'EntityAlreadyExists') {
                console.log('File with the same key already exists.');
            } else {
                throw err;
            }
        }
    }

    static async uploadFiles(client, files) {
        console.log(files);
        const uploadPromises = files.map(file => this.upload(client, file));
      
        try {
            const results = await Promise.all(uploadPromises);
            // results 배열에는 각 파일에 대한 업로드 결과가 들어 있습니다.
            console.log(results);
            return { success : true };
        } catch (error) {
            console.error(`Error uploading files. ${error.message}`);
        }
    }

    static async download() {
        const s3 = new AWS.S3({
            accessKeyId : process.env.AWS_ACCESS_KEY,
            secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
        });

        const params = {
            Bucket : "aws-ko-medical-develop",
            Key : "medical/" + "dicomTest"
        };

        s3.getObject(params, (err, data) => {
            if (err) {
                throw err;
            }

            fs.writeFileSync(
                `test-download.${data.ContentType.split("/")[1]}`,
                data.Body
            );
        });

        /*
         const data = await s3.getObject(params).promise();

        // Set appropriate headers for the response
        res.setHeader('Content-Disposition', `attachment; filename=test-download.${data.ContentType.split('/')[1]}`);
        res.setHeader('Content-Type', data.ContentType);

        // Send the file data as the response
        res.send(data.Body);
        */
    }
    
}

module.exports = Dicom;
