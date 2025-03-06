const io= require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('User connected',socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('send-message', ({senderId,receiverId,message}) => {
        socket.to(receiverId).emit('receive-message', {
            senderId,
            message,
        });
    });
});