const bodyParser = require('body-parser');
const express = require('express')
var logger = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express()
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
const chat = require('./src/router/chat/chat')


// app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/chat', chat);
app.use(cors({
    origin:['http://localhost:3000'],
    methods : ['GET' , 'POST', 'PUT' , 'DELETE'],
    credential : true // 쿠키사용
}))

server.listen(port , () =>{
  console.log(`서버 구동! ${port} 포트에서 `);
})
app.set('io',io);

