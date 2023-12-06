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
        });
    
        socket.on('create or join', (error,room) => {

            if(room === patient_cd){
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
                console.error('invalid patient code:', room);
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