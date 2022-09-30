// socketio.js

import { io } from "socket.io-client";
import axios from 'axios';

export let socket = io("https://localhost:8443/room", { transports: ["websocket"] });

export const initSocketConnection = async(ind) => {
  socket.connect();

  var result = await axios.get('https://localhost:8443/user',{withCredentials: true});
  result.data.roomIndex = ind;
  socket.emit('con', result.data);
  if (socket) return;
};

// 이벤트 명을 지정하고 데이터를 보냄
export const sendSocketMessage = (cmd, body = null) => {
  if (socket == null || socket.connected === false) {
    initSocketConnection();
  }
  socket.emit("message", {
    cmd: cmd,
    body: body,
  });
};


let cbMap = new Map();

// 해당 이벤트를 받고 콜백 함수를 실행함
export const socketInfoReceived = (cbType, cb) => {
  cbMap.set(cbType, cb);
  
  if (socket.hasListeners("message")) {
    socket.off("message");
  }

  socket.on("message", ret => {
    for (let [, cbValue] of cbMap) {
      cbValue(null, ret);
    }
  });
};

// 소켓 연결을 끊음
export const disconnectSocket = () => {
  if (socket == null || socket.connected === false) {
    return;
  }
  socket.disconnect();
  socket = undefined;
};