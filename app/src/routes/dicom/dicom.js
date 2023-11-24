"use strict";

var express = require('express');
var router = express.Router();
const ctrl = require('./dicom.ctrl');

const multer = require('multer');

const storage = multer.memoryStorage(); // 파일을 메모리에 저장
const upload = multer({ storage: storage });

router.post('/upload', upload.single('test'), ctrl.process.upload);
router.post('/download', ctrl.process.download);

module.exports = router;