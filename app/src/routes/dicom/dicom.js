"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./dicom.ctrl');
const multer = require('multer');

// 파일을 메모리에 저장하도록 multer 구성
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 경로 정의
router.post('/upload', upload.array('file'), ctrl.process.upload);
router.post('/download', ctrl.process.download);
router.post('/list', ctrl.process.list);

module.exports = router;
