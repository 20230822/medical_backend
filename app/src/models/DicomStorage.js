"use strict";

const queryExe = require('./common');

class DicomStorage {

    static async saveToDatabase(patientCd, filePath, fileName) {
        const query = "INSERT INTO DICOMFILE_TB (PATIENT_CD, FILEPATH, FILE_NM) VALUES (?, ?, ?);"; // string, blob
        try {
            await queryExe(query, [patientCd, filePath, fileName]);
    
            return { success: true, msg: "데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }

    static async getFileList(patientCd) {
        const query = "SELECT FILE_NM AS File_nm FROM DICOMFILE_TB WHERE PATIENT_CD = ?;"; // string, blob
        try {
            [rows, fields] = await queryExe(query, [patientCd]);
    
            return { success : true, data : rows };
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
