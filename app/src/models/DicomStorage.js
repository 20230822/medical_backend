"use strict";

const queryExe = require('./common');

class DicomStorage {

    static async saveToDatabase(studyInstanceUid, fileData) {
        const query = "INSERT INTO DICOMFILE_TB (PATIENT_CD, IMG_DATA) VALUES (?, ?);"; // string, blob
        try {
            await queryExe(query, [studyInstanceUid, fileData]);
    
            return { success: true, msg: "데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
