"use strict";

// Dicom 모델 가져오기
const Dicom = require('../../models/Dicom');

// 다양한 작업을 처리하기 위한 메서드로 프로세스 개체 정의
const process = {
    // 파일 업로드를 처리하는 기능
    upload: async (req, res) => {
        try {
            const response = await Dicom.uploadFiles(req.body, req.files);
            if (response.success) {
                // Respond { success, msg }
                res.status(200).json(response);
            } else {
                // Respond { success, msg }
                res.status(400).json(response.msg);
            }
        } catch (error) {
            // Respond { server error, error message }
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    // 파일 다운로드를 처리하는 기능
    download: async (req, res) => {
        try {
            const response = await Dicom.download();
            if (response.success) {
                // Respond { success, data }
                res.status(200).json(response);
            } else {
                // Respond { success, data }
                res.status(400).json(response.msg);
            }
        } catch (error) {
            // Respond { server error, error message }
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    // DICOM 파일명 나열을 처리하는 기능
    list: async (req, res) => {
        try {
            const dicom = new Dicom(req.body);
            const response = await dicom.list();
            if (response.success) {
                // Respond { success, data }
                res.status(200).json(response);
            } else {
                // Respond { success, data }
                res.status(400).json(response.msg);
            }
        } catch (error) {
            // Respond { server error, error message }
            console.error(error);
            res.status(500).json(error.message);
        }
    }
};

// 프로세스 객체 내보내기
module.exports = {
    process
};
