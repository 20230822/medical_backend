const bodyParser = require('body-parser');
const express = require('express')
var logger = require('morgan');
const cors = require('cors');


const app = express()
const port = 3000

app.use(logger('dev'));
app.use(express.json)
app.use(express.urlencoded({
    extended:false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}))
app.use(cors({
    origin:['http://loclahost:3000'],
    methods : ['GET' , 'POST', 'PUT' , 'DELETE'],
    credential : true // 쿠키사용
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});