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

// Socket.IO 연결 설정
io.on('connection', socket => {
    function log() {
        let array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }

    socket.on('message', message => {
        log('Client said : ', message);
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
            socket.emit('full',room);
            
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