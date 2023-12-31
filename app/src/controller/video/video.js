const PatientStorage = require('../../models/PatientStorage');
module.exports=function(io){
    io.on('connection', socket => {
        function log() {
            let array = ['Message from server:'];
            array.push.apply(array, arguments);
            socket.emit('log', array);
        }
        
        socket.on('message', message => {
            log('Client said : ', message);
            socket.broadcast.emit('message', message);
        })
    
        socket.on('create or join', async (room , acknowledgment) => {
            //patient cd를 받아서 db에 확인하고
            
            const result = await PatientStorage.getPatientInfo(room);
            console.log(result, 'result');
            if(result.success == true){
                if(result.data.length > 0){  //존재하는 환자면
                    acknowledgment(true);
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
                    } else if (numClients < 2 && numClients > 0) {
                        console.log('join room!');
                        log('Client Id' + socket.id + ' joined room ' + room);
                        io.to(room).emit('join', room, socket.id);
                        socket.join(room);
                        socket.emit('joined', room);
                    } else {
                        socket.emit('full',room);
                    }
                }
                else{
                    acknowledgment(false);
                }
            }
            else{
                acknowledgment(false);
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
}