"use strict";
const maria = require('../database/maria');
const queryExe = require('./common');

class DicomStorage {

    static async savePatientInfo(client) {
        let conn;
        
        try {
            conn = await maria.getConnection();
            await conn.beginTransaction();

            const check_query = "SELECT COUNT(*) FROM PATIENT_TB WHERE PATIENT_CD = ?;";
            const insert_patient_query = "INSERT INTO PATIENT_TB (PATIENT_CD, SEX, PATIENT_NM, REGION, HOSPITAL, BIRTH_DT, AGE, WEIGHT, HEIGHT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
            const insert_mamagement_query = "INSERT INTO MANAGEMENT_TB (PATIENT_CD, PARTICIPANTS, MEMO) VALUES (?, ?, ?);";
            
            let[rows, fields] = await conn.query(check_query, [client.Patient_cd]);
            const {COUNT : count} = rows[0];

            if (count != 0) {
                await conn.query(insert_patient_query, [client.Patient_cd, client.Sex, client.Patient_nm, client.Region, client.Hospital, client.Birth_dt, client.Age, client.Weight, client.Height]);
                await conn.query(insert_mamagement_query, [client.Patient_cd, client.Participants, client.Memo]);
            }

            await conn.commit();
            return { success: true, msg: "트랜잭션 성공 : 데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            await conn.rollback();
            console.log(error);
            return { success: false, msg: error };
        } finally {
            conn.release();
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

    static async delPatientInfo(Patient_cd) {
        let conn;
        
        try {
            conn = await maria.getConnection();
            await conn.beginTransaction();

            const check_query = "SELECT COUNT(*) FROM PATIENT_TB WHERE PATIENT_CD = ?;";
            const insert_patient_query = "DELETE FROM PATIENT_TB WHERE PATIENT_CD = ?;";
            const insert_mamagement_query = "DELETE FROM MANAGEMENT_TB WHERE PATIENT_CD = ?;";
            
            let[rows, fields] = await conn.query(check_query, [Patient_cd]);
            const {COUNT : count} = rows[0];

            if (count != 0) {
                await conn.query(insert_patient_query, [Patient_cd]);
                await conn.query(insert_mamagement_query, [Patient_cd]);
            }

            await conn.commit();
            return { success: true, msg: "트랜잭션 성공 : 데이터가 성공적으로 저장되었습니다." };
        } catch (error) {
            await conn.rollback();
            console.log(error);
            return { success: false, msg: error };
        } finally {
            conn.release();
        }
    }
}

module.exports = DicomStorage;
