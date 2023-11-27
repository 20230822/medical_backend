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

    static async getPatientInfo(Patient_cd) {
        const query = "SELECT P.PATIENT_CD AS Patient_cd, P.SEX AS Sex, P.PATIENT_NM AS Patient_nm, P.REGION AS Region, P.HOSPITAL AS Hospital, P.BIRTH_DT AS Birth_dt, P.AGE AS Age, P.WEIGHT AS Weight, P.HEIGHT AS Height, M.PARTICIPANTS AS Participants, M.MEMO AS Memo "
        + "FROM PATIENT_TB P JOIN MANAGEMENT_TB M ON P.PATIENT_CD = M.PATIENT_CD "
        + "WHERE P.PATIENT_CD = ?;";
        try{
            [rows, fields] = await queryExe(query, [Patient_cd]);

            return { success : true, data : rows };
        }
        catch(error){
            return { success : false, msg : error } ;
        }
    }

    static async getPatients() {
        const query = "SELECT P.PATIENT_CD AS Patient_cd, P.PATIENT_NM AS Patient_nm, P.REGION AS Region, P.HOSPITAL AS Hospital, M.PARTICIPANTS AS Participants, M.MEET_DT AS Meet_dt "
        + "FROM PATIENT_TB P JOIN MANAGEMENT_TB M ON P.PATIENT_CD = M.PATIENT_CD;";
        
        try{
            [rows, fields] = await queryExe(query, []);

            return { success : true, data : rows };
        }
        catch(error){
            return { success : false, msg : error } ;
        }
    }
}

module.exports = DicomStorage;
