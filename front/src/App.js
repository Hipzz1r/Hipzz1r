import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import UserSet from './UserSet';
import RoomList from './RoomList';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/setUser" element={<UserSet />} />
          <Route path="/RoomList" element={<RoomList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
