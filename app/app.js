"use strict";

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path'); // path 모듈 추가
var logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

// 라우터 모듈 정의
var dicomRouter = require('./src/routes/dicom/dicom');
var patientRouter = require('./src/routes/patient/patient')
require('dotenv').config();

// Express 애플리케이션 생성
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;

// Express 애플리케이션 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));

// Socket.IO 연결 설정
require('./src/controller/video/video')(io);
require('./src/controller/chat/chat')(io.of('/chat'));

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(cors({
    origin:['http://localhost:3000'],
    methods : ['GET' , 'POST', 'PUT' , 'DELETE'],
    credential : true // 쿠키사용
}))

// 라우터 경로 정의
app.use('/api/dicom', dicomRouter);
app.use('/api/patient', patientRouter);

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'src','public','video')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'src/public/video/index.html'));
})

// 라우터 등록
app.use('/api/dicom', dicomRouter);

// 서버 실행
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});