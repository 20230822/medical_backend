"use strict";

const dicomParser = require('dicom-parser');
const fs = require('fs');
const path = require('path');

const DicomStorage = require('./DicomStorage');
const { response } = require('express');

class Dicom {
    constructor(body){
        this.body = body;
    }

    
    static async upload(file) {
        const client = this.body;
        try {
            const fileData = Buffer.from(new Unit16Array(file.Buffer));
            
            await DicomStorage.saveToDatabase(client.studyInstanceUid, fileData);

            return { success: true, msg: 'DICOM instance saved successfully' };
        } catch (error) {
            console.error('Error processing DICOM file:', error);
            return { success: false, msg: error.message };
        }
    }
    
    async download() {
        const client = this.body;
        const fileName = "test1";
        try {
            // ... (your existing code)
            const dicomData = await DicomStorage.getDicomDataByStudyInstanceUid(client.studyInstanceUid);
            console.log(dicomData.data[0].pixelData);
            const dataArray = dicomData.data[0].pixelData;
            // Assume you have the studyInstanceUid and pixelData from the uploaded DICOM file
            // const fileName = `${client.studyInstanceUid}.dcm`;
    
            // Specify the absolute file path
            const absoluteFilePath = `${fileName}.png`;

            // Save the DICOM pixelData to a file on the server
            // fs.writeFileSync(absoluteFilePath, dataArray);





            // const dataSet = dicomParser.parseDicom(dataArray);

            // 이미지 데이터 추출
            // const pixelDataElement = dataSet.elements.x7fe00010;
            // const pixelData = new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / 2);
            
            // 이미지 크기 및 비트 깊이 가져오기
            const rows = string('x00280010');
            const columns = string('x00280011');
            const bitsAllocated = string('x00280100');
            
            // PNG 이미지 생성
            const png = new PNG({ width: columns, height: rows });
            
            // 흑백 이미지의 경우
            if (bitsAllocated === 8) {
              for (let i = 0; i < pixelData.length; i++) {
                const value = pixelData[i];
                png.data[i * 4] = value;
                png.data[i * 4 + 1] = value;
                png.data[i * 4 + 2] = value;
                png.data[i * 4 + 3] = 255; // 알파 채널
              }
            }
            
            // 컬러 이미지의 경우 (가정)
            // TODO: 컬러 이미지를 처리하는 코드를 추가해야 함
            
            // PNG 파일로 저장
            const filePath = 'output.png';
            const stream = fs.createWriteStream(filePath);
            png.pack().pipe(stream);





    
            // Send a response to the client
            return { success: true, msg: 'DICOM instance saved successfully' };
        } catch (error) {
            console.error('Error processing DICOM file:', error);
            res.status(500).json({ success: false, msg: error.message });
        }
    }
    
}

module.exports = Dicom;
