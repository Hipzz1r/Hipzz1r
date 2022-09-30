var express = require("express");
var router = express.Router();

peers = {};

module.exports = function (io) {
    //네임스페이스 설정
    const room = io.of("/room");

    room.on("connection", function (socket) {
        var roomId;
        var sessId;
        peers[socket.id] = socket;

        // Asking all other clients to setup the peer connection receiver
        for (let id in peers) {
            if (id === socket.id) continue;
            console.log("sending init receive to " + socket.id);
            peers[id].emit("initReceive", socket.id);
        }

        socket.on("con", function (data) {
            console.log(data);
            roomId = data.roomIndex;
            socket.join(roomId);
            sessId = data.sessionID;
            console.log("Connect from Client: " + data.sessionID);
            global.roomList[roomId].user.push(data);
            socket.broadcast.to(roomId).emit("join", global.roomList[roomId].user);
        });

        var req = socket.request;
        // console.log(socket.avatar)
        // console.log("session");
        // console.log(socket.request.session);
        //roomId를 그냥 파라미터로 받기
        //var roomId = req.data.roomId;

        var joinMessage = {
            user: socket.userId,
            category: socket.avatarcategory,
            nickname: socket.usernickname,
        };
        //socket.broadcast.to(3).emit('join', data);

        socket.on("onFacialExpression", function (data) {
            socket.to(roomId).emit("onFacialExpression", data);
        });

        socket.on("onUserExit", function (data) {
            console.log("user exit" + data.userId);
            var leaveMessage = {
                user: data.userId,
            };

            socket.to(roomId).emit("exit", leaveMessage);
            //나가도 그냥 두자
            //global.roomList[roomId].remove();
            socket.leave(roomId);
        });

        socket.on("disconnect", function () {
            if (roomId != undefined) {
                const idx = global.roomList[roomId].user.findIndex(function (item) {
                    return item.sessionID === sessId;
                }); // findIndex = find + indexOf
                if (idx > -1) global.roomList[roomId].user.splice(idx, 1);
                if (global.roomList[roomId].user == undefined) global.roomList[roomId].user = [];
                socket.broadcast.to(roomId).emit("join", global.roomList[roomId].user);
            }
            socket.broadcast.emit("removePeer", socket.id);
            socket.leave(roomId);
            delete peers[socket.id];
        });

        // Initiate the connection process as soon as the client connects

        /**
         * relay a peerconnection signal to a specific socket
         */
        socket.on("signal", (data) => {
            console.log("sending signal from " + socket.id + " to ", data);
            if (!peers[data.socket_id]) return;
            peers[data.socket_id].emit("signal", {
                socket_id: socket.id,
                signal: data.signal,
            });
        });

        /**
         * Send message to client to initiate a connection
         * The sender has already setup a peer connection receiver
         */
        socket.on("initSend", (init_socket_id) => {
            console.log("INIT SEND by " + socket.id + " for " + init_socket_id);
            peers[init_socket_id].emit("initSend", socket.id);
        });
    });
    return router;
};
