import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import RoomList from './RoomList';
import UserSet from './UserSet';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setUser" element={<UserSet />} />
          <Route path="/roomList" element={<RoomList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
