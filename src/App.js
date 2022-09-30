import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import RoomList from './RoomList';
import UserSet from './UserSet';
import Room from './Room';
import Player from './Components/player';

global.roomList = [{ roomName: '첫번째 방' }, { roomName: '두번째 방' }];

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:index" element={<Room />} />
          <Route path="/setUser" element={<UserSet />} />
          <Route path="/roomList" element={<RoomList />} />
          <Route path="/player" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
