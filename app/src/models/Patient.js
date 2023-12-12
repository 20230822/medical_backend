"use strict";

const PatientStorage = require('./PatientStorage');
const { response } = require('express');

class Patient {
    constructor(body){
        this.body = body;
    }

    async add() {
        const client = this.body;
        try {
            //데이터 저장
            const result = await PatientStorage.savePatientInfo(client);
            console.log(result);

            return { success: true, msg: 'PatientInfo saved successfully' };
        } catch (error) {
            console.error('Error processing PatientInfo:', error);
            return { success: false, msg: error.message };
        }
    }

    async detailInfo() {
        const client = this.body;
        try {
            //데이터 저장
            const response = await PatientStorage.getPatientInfo(client.Patient_cd);
            console.log(response);

            return response;
        } catch (error) {
            console.error('Error processing PatientInfo:', error);
            return { success: false, msg: error.message };
        }
    }

    static async patients() {
        try {
            //데이터 저장
            const response = await PatientStorage.getPatients();
            console.log(response);

            return response;
        } catch (error) {
            console.error('Error processing PatientInfo:', error);
            return { success: false, msg: error.message };
        }
    }

    async del() {
        const client = this.body;
        try {
            //데이터 저장
            const result = await PatientStorage.delPatientInfo(client.Patient_cd);
            console.log(result);
            
            return { success: true, msg: 'PatientInfo Delete successfully' };
        } catch (error) {
            console.error('Error delete PatientInfo:', error);
            return { success: false, msg: error.message };
        }
    }
}

module.exports = Patient;
