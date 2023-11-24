"use strict";

const queryExe = require('./common');

class DicomStorage {

    static async saveToDatabase(studyInstanceUid, pixelData) {
        const query = "INSERT INTO DICOMFILE_TB (PATIENT_CD, IMG_DATA) VALUES (?, ?);"; // string, blob
        try {
            await queryExe(query, [studyInstanceUid, pixelData]);
    
            return { success: true, msg: "데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }

    static async getDicomDataById(id) {
        const query = "SELECT studyInstanceUid, pixelData FROM DICOM WHERE id = ?;";
        try {
            [rows, fields] = await queryExe(query, [id]);
            if (rows) {
                return { success: true, data: rows };
            }
            return { success: true, msg: "일치하는 데이터가 없습니다." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
