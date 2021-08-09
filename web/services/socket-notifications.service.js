const ioServer = require('socket.io');
const NotificationService = require("./notification.service");

const notificationService = new NotificationService();

function socketOperations(httpApp, config){
    let io = ioServer(httpApp, config);
    io.on('connection', async function (socket) {
        
        socket.on('register', async data => {
            console.log(data);
            socket.join(data.user_id);
        });

        socket.on('message', async data => {
            try{
                console.log(data,"----");
                io.to(data.user_id).emit('message-receive',{
                    user_id: data.user_id,
                    command: "read-message"
                });
            } catch(e){
                console.error(e);
            }
        });

        socket.on('disconnecting', () => {
            
        });
      
        socket.on('disconnect', () => {
            console.log(socket.rooms);
        });
    });
}

module.exports = { socketOperations };