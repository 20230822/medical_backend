"use strict";

const dicomParser = require('dicom-parser');
const fs = require('fs');
const DicomStorage = require('./DicomStorage');
const { response } = require('express');

class Dicom {
    constructor(body){
        this.body = body;
    }

    static async upload(file) {
        try {
            // DICOM 파일이라는 가정하에 진행
            const dicomData = file.buffer; // // 파일 버퍼에서 DICOM 데이터를 추출
            const byteArray = new Uint8Array(dicomData); // 구문 분석을 위해 DICOM 데이터를 Uint8Array로 변환
            const options = { TransferSyntaxUID: '1.2.840.10008.1.2' }; // 전송 구문 UID를 포함하여 구문 분석 옵션을 지정
            const dataSet = dicomParser.parseDicom(byteArray, options); // dicomParser 라이브러리를 사용하여 DICOM 데이터를 구문 분석
 
            // Extract relevant data for storage
            const studyInstanceUid = dataSet.string('x0020000d'); // 구문 분석된 DICOM 데이터에서 연구 인스턴스 UID를 추출
            const pixelDataElement = dataSet.elements.x7fe00010; // 구문 분석된 DICOM 데이터에서 픽셀 데이터 요소를 추출
            // 픽셀 데이터를 저장용 버퍼로 변환
            // 픽셀 데이터가 Uint16Array로 표현된다고 가정
            const pixelData = Buffer.from(new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / 2));

            // DicomStorage 클래스를 사용하여 추출된 데이터를 스토리지나 데이터베이스에 저장
            const result = await DicomStorage.saveToDatabase(studyInstanceUid, pixelData);
            console.log(result);

            return { success: true, msg: 'DICOM instance saved successfully' };
        } catch (error) {
            console.error('Error processing DICOM file:', error);
            return { success: false, msg: error.message };
        }
    }

    /*
    async download() {
        const client = this.body;
        const fileName = "test";
        try {
            const studyInstanceUid = client.studyInstanceUid;
            // DicomStorage 클래스를 사용하여 데이터베이스에서 DICOM 데이터 가져오기
            const dicomData = await DicomStorage.getDicomDataByStudyInstanceUid(studyInstanceUid);

            const bufferData = dicomData.data;

            // Assuming dicomData is an array of objects with pixelData property
            const pixelData = bufferData.map(item => new Uint16Array(item.pixelData));

            // Create a new DICOM dataset
            const dataSet = new dicomParser.DataSet();

            // Set the study instance UID
            dataSet.string('x0020000d', studyInstanceUid);

            // Set the pixel data
            const pixelDataElement = {
                tag: 'x7fe00010',
                vr: 'OW', // OW for Uint16Array data
                value: pixelData.buffer,
            };

            dataSet.elements.x7fe00010 = pixelDataElement;

            // Serialize the dataset to a byte array
            const dicomArray = dicomParser.writeDataSet(dataSet);

            // Save the byte array to a DICOM file
            fs.writeFileSync('output.dcm', new Uint8Array(dicomArray));

            // ArrayBuffer를 Buffer로 변환
            const buffer = Buffer.from(uint16ArrayDataArray);

            console.log(buffer);
          
            // // DICOM 데이터를 메모리에 로드할 Uint8Array로 변환
            // const byteArray = (dicomData.data).buffer;

            // // DICOM 데이터 구문 분석
            // const options = { TransferSyntaxUID: '1.2.840.10008.1.2' };
            // const dataSet = dicomParser.createDicomDataSet(byteArray, options);

            // // 구문 분석된 DICOM 데이터에서 필요한 정보를 추출
            // const studyInstanceUidInData = dataSet.string('x0020000d');
            // const pixelDataElement = dataSet.elements.x7fe00010;

            // // 추출된 정보를 사용하여 픽셀 데이터를 파일로 저장
            // //if (studyInstanceUidInData === studyInstanceUid) {
            //     const filePath = `./downloads/${fileName}.dcm`;
            //     fs.writeFileSync(filePath, Buffer.from(new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / 2)));
            //     return { success: true, msg: 'DICOM data saved to file successfully', filePath: filePath };
            // //} else {
            // //    return { success: false, msg: 'Study Instance UID in DICOM data does not match the specified Study Instance UID' };
            // //}
        } catch (error) {
            console.error('Error downloading and saving DICOM data:', error);
            return { success: false, msg: error.message };
        }
    }
    */
}

module.exports = Dicom;
