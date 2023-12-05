"use strict";

const DicomStorage = require('./DicomStorage');
const fs = require("fs");
const AWS = require("aws-sdk");

// AWS 자격 증명으로 S3 인스턴스 생성
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

class Dicom {
    constructor(body) {
        this.body = body;
    }

    /**
     * 단일 파일을 S3에 업로드하고 
     * 환자코드, DICOM 파일 경로, 이름을 데이터베이스에 저장하는 정적 방법
     * @param {String} client - 환자코드
     * @param {File} file - DCM 파일
     * @returns {boolean} - success : 수행 성공 여부
     */
    static async upload(client, file) {
        const file_nm = Buffer.from(file.originalname, 'utf-8');

        const params = {
            Bucket: "aws-ko-medical-develop",
            Key: `${client.Patient_cd}/${file_nm}`,
            Body: file.buffer,
            ContentType: "application/dicom",
            overwrite: false
        };

        try {
            const data = await s3.upload(params).promise();
            const result = await DicomStorage.saveToDatabase(client.Patient_cd, params.Key, file_nm);

            console.log(result);
            console.log(`File uploaded successfully. ${data}`);
            return { success: true };
        } catch (err) {
            return { success: false };
        }
    }

    /**
     * 환자코드와 배열 형식의 파일을 업로드하는 정적 메서드
     * @param {String} client - 환자코드
     * @param {File[]} files - DCM 파일 배열
     * @returns {boolean} - success : 수행 성공 여부
     */
    static async uploadFiles(client, files) {
        console.log(files);
        const uploadPromises = files.map(file => this.upload(client, file));

        try {
            const results = await Promise.all(uploadPromises);
            console.log(results);
            return { success: true };
        } catch (error) {
            console.error(`Error uploading files. ${error.message}`);
            return { success: false };
        }
    }

    // S3에서 파일을 다운로드하는 정적 방법
    static async download() {
        const params = {
            Bucket: "aws-ko-medical-develop",
            Key: "medical/dicomTest"
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

    // 특정 환자의 파일명을 나열하는 인스턴스 메서드
    async list() {
        const client = this.body;
        try {
            const response = await DicomStorage.getFileList(client.Patient_cd);
            console.log(response);

            return response;
        } catch (error) {
            console.error('Error processing PatientInfo:', error);
            return { success: false, msg: error.message };
        }
    }
}

module.exports = Dicom;
