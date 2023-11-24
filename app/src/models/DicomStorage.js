"use strict";

const SqlString = require('sqlstring');

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

    static async getDicomDataByStudyInstanceUid(id) {
        const query = "SELECT IMG_DATA AS `pixelData` FROM DICOMFILE_TB WHERE PATIENT_CD = ?;";
        try {
            [rows, fields] = await queryExe(query, [id]);
            
            if (rows) {
                return { success: true, data: rows};
            } else {
                return { success: true, msg: "일치하는 데이터가 없습니다." };
            }
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
