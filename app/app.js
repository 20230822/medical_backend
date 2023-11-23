"use strict";

const bodyParser = require('body-parser');
const express = require('express')
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();


// 라우터 모듈 정의
var dicomRouter = require('./src/routes/dicom/dicom');
var patientRouter = require('./src/routes/patient/patient')

const app = express()
const port = 3000

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}))
app.use(cors({
    origin:['http://127.0.0.1:3000'],
    methods : ['GET' , 'POST', 'PUT' , 'DELETE'],
    credential : true // 쿠키사용
}))

// 라우터 경로 정의
app.use('/api/dicom', dicomRouter);
app.use('/api/patient', patientRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});