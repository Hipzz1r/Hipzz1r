var express = require('express');
var router = express.Router();

module.exports = function (io) {

//네임스페이스 설정
    const room = io.of('/room');

    room.on('connection', function (socket) {
        console.log('Connect from Client: ' + socket)

        var req = socket.request;

        //roomId를 그냥 파라미터로 받기
        //var roomId = req.data.roomId;
        var roomId = 3;

        socket.join(roomId);
        var joinMessage = {
            user: socket.userId,
            category : socket.avatarcategory,
            nickname : socket.usernickname
        };
        socket.to(roomId).emit('join', joinMessage);

        socket.on('onFacialExpression', function (data) {
            socket.to(roomId).emit('onFacialExpression', data)
        });

        socket.on('onUserExit', function (data) {
            console.log('user exit' + data.userId)
            var leaveMessage = {
                message : data.userId
                ,socketId : data.socketId
            };

            socket.to(roomId).emit('exit', leaveMessage);
            socket.leave(roomId);
        });

        socket.on('disconnect', function() {
            console.log("SOCKETIO disconnect EVENT: ", socket.id, " client disconnect");
            socket.leave(roomId);
        })
    })
    return router;
}
