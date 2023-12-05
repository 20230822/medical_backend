"use strict";

// 공통 쿼리 실행 모듈 가져오기
const queryExe = require('./common');

class DicomStorage {
    
    // 환자코드 그리고 DICOM 파일 경로, 이름을 데이터베이스에 저장하는 정적 방법
    static async saveToDatabase(patientCd, filePath, fileName) {
        const query = "INSERT INTO DICOMFILE_TB (PATIENT_CD, FILEPATH, FILE_NM) VALUES (?, ?, ?);";

        try {
            await queryExe(query, [patientCd, filePath, fileName]);
    
            return { success: true, msg: "Data successfully stored." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }

    // 특정 환자에 대한 DICOM 파일명을 가져오는 정적 방법
    static async getFileList(patientCd) {
        const query = "SELECT FILE_NM AS File_nm FROM DICOMFILE_TB WHERE PATIENT_CD = ?;";

        try {
            const [rows, fields] = await queryExe(query, [patientCd]);
    
            return { success: true, data: rows };
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
