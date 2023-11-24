"use strict";

const bodyParser = require('body-parser');
const express = require('express')
var logger = require('morgan');
const cors = require('cors');
const path = require('path');

require('dotenv').config();


// 라우터 모듈 정의
var dicomRouter = require('./src/routes/dicom/dicom');
var patientRouter = require('./src/routes/patient/patient')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));

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

app.get('/', (req, res) => {
  res.send('Hello World!')
});

server.listen(port , () =>{
  console.log(`서버 구동! ${port} 포트에서 `);
})

