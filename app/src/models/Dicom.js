"use strict";

const dicomParser = require('dicom-parser');

const DicomStorage = require('./DicomStorage');
const { response } = require('express');

class Dicom {
    constructor(body){
        this.body = body;
    }

    
    static async upload(file) {
        try {
            const fileData = Buffer.from(new Uint16Array(file.Buffer));
            // DICOM 파일이라는 가정하에 진행
            const dicomData = file.buffer; // // 파일 버퍼에서 DICOM 데이터를 추출
            const byteArray = new Uint8Array(dicomData); // 구문 분석을 위해 DICOM 데이터를 Uint8Array로 변환
            const options = { TransferSyntaxUID: '1.2.840.10008.1.2' }; // 전송 구문 UID를 포함하여 구문 분석 옵션을 지정
            const dataSet = dicomParser.parseDicom(byteArray, options); // dicomParser 라이브러리를 사용하여 DICOM 데이터를 구문 분석
 
            // Extract relevant data for storage
            const studyInstanceUid = dataSet.string('x0020000d'); // 구문 분석된 DICOM 데이터에서 연구 인스턴스 UID를 추출
            const pixelDataElement = dataSet.elements.x7fe00010; // 구문 분석된 DICOM 데이터에서 픽셀 데이터 요소를 추출

            const rowsTag = 'x00280010';  // Rows tag
            const columnsTag = 'x00280011';  // Columns tag

            // 이미지의 높이와 너비 추출
            const rows = dataSet.uint16(rowsTag);
            const columns = dataSet.uint16(columnsTag);
            console.log("rows : " + rows);
            console.log("columns : " + columns);

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
    
    async download() {
        const client = this.body;
        const fileName = "test1";
        try {
            // ... (your existing code)
            const dicomData = await DicomStorage.getDicomDataByStudyInstanceUid(client.studyInstanceUid);

            console.log(dicomData.data[0].pixelData);

            const png = new PNG({
                width: 512,
                height: 512,
            });
            const pixelData = dicomData.data[0].pixelData;
            // 픽셀 데이터를 PNG 이미지에 설정
            for (let i = 0; i < pixelData.length; i++) {
                const pixelValue = pixelData[i];

                // 픽셀 값을 0에서 65535 사이에서 0에서 255 사이의 값으로 정규화
    const normalizedValue = Math.floor((pixelValue / 65535) * 255);

                png.data[i] = normalizedValue;
            }

            // PNG 이미지를 파일로 저장
            const pngFilePath = 'image.png';
            png.pack().pipe(fs.createWriteStream(pngFilePath))
                .on('finish', () => console.log('PNG image saved successfully'))
                .on('error', (error) => console.error('Error saving PNG image:', error));


            return { success: true, msg: 'DICOM instance saved successfully' };
        } catch (error) {
            console.error('Error processing DICOM file:', error);
            res.status(500).json({ success: false, msg: error.message });
        }
    }
    
}

module.exports = Dicom;
