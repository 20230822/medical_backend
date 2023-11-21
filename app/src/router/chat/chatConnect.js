
const process =  {
    connect : (socket) =>{
        io.on('connection' , (socket) =>{
            console.log('접속');
            msg ={
                name : "내가",
                msg : "보내용"
            }
            io.emit('chat', msg);
            io.on('chat', (data) =>{
                console.log(data.msg);
            })
        })
    },
}

module.exports = {
    process
};
