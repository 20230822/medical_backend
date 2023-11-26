"use strict";

const queryExe = require('./common');

class DicomStorage {

    static async saveToDatabase(patientCd, filePath) {
        const query = "INSERT INTO DICOMFILE_TB (PATIENT_CD, FILEPATH) VALUES (?, ?);"; // string, blob
        try {
            await queryExe(query, [patientCd, filePath]);
    
            return { success: true, msg: "데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
