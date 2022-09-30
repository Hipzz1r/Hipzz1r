import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Room from './Room';

global.roomList = [{"roomName":"첫번째 방"},{"roomName":"두번째 방"}];

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/room/:index" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
