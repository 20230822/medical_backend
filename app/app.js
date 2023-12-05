"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

// 라우터 모듈
const dicomRouter = require('./src/routes/dicom/dicom');
const patientRouter = require('./src/routes/patient/patient');
const userRouter = require('./src/routes/user/user');

// 익스프레스 애플리케이션 생성
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// 포트 정의
const PORT = 3000;

// 익스프레스 애플리케이션 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Socket.IO 연결 설정
require('./src/controller/video/video')(io);
require('./src/controller/chat/chat')(io.of('/chat'));

app.use(express.static(path.join(__dirname, 'src', 'public')));

// CORS 설정
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credential: true // Enable cookie usage
}));

// 라우터 경로 정의
app.use('/api/dicom', dicomRouter);
app.use('/api/patient', patientRouter);
app.use('/api/user', userRouter);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'src', 'public', 'video')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/public/video/index.html'));
});

// 서버 시작
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
