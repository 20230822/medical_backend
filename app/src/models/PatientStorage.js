"use strict";

const queryExe = require('./common');

class DicomStorage {

    static async savePatientInfo(client) {
        const query1 = "INSERT INTO PATIENT_TB (PATIENT_CD, SEX, PATIENT_NM, REGION, HOSPITAL, BIRTH_DT, AGE, WEIGHT, HEIGHT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        const query2 = "INSERT INTO MANAGEMENT_TB (PATIENT_CD, PARTICIPANTS, MEMO) VALUES (?, ?, ?);";
        try {
            await queryExe(query1, [client.Patient_cd, client.Sex, client.Patient_nm, client.Region, client.Hospital, client.Birth_dt, client.Age, client.Weight, client.Height]);
            await queryExe(query2, [client.Patient_cd, client.Participants, client.Memo]);
    
            return { success: true, msg: "데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            return { success: false, msg: error };
        }
    }
}

module.exports = DicomStorage;
