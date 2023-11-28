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
const PORT = 8000;

// Socket.IO 연결 설정
io.on('connection', socket => {
    function log() {
        let array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('message', message => {
        log('Client said:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('create or join', room => {
        let clientsInRoom = io.of('/').adapter.rooms.get(room);
        let numClients = clientsInRoom ? clientsInRoom.size : 0;

        const roomExists = io.sockets.adapter.rooms.hasOwnProperty(room);

        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 0) {
            console.log('create room!');
            socket.join(room);
            log('Client ID ' + socket.id + ' created room ' + room);
            socket.emit('created', room, socket.id);
            console.log("생성된 방", io.of('/').adapter.rooms);
        } else if (numClients < 4 && numClients > 0) {
            console.log('join room!');
            log('Client Id' + socket.id + ' joined room ' + room);
            io.to(room).emit('join', room, socket.id);
            socket.join(room);
            socket.emit('joined', room);
        } else {
            socket.emit('full', room);
        }

        socket.on('disconnect', () => {
            Object.keys(socket.rooms).forEach(room => {
                socket.leave(room);
                console.log(`Socket ${socket.id} left room ${room}`);
            });

            console.log(`Socket ${socket.id} disconnected`);
        });
    });
});

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

// 채팅 컨트롤러 추가
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
