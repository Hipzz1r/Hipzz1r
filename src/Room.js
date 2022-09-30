import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {
  initSocketConnection,
  disconnectSocket,
  sendSocketMessage,
  socket,
} from './socketio';

const Title = styled.h1``;

function Room() {
  const [indexValid, setIndexValid] = useState(false);
  const [users, setUsers] = useState([
    { sessionID: '1', avatar: '/Images/Monster1.png' },
  ]);
  const params = useParams();

  socket.on('join', (data) => {
    var original = users;
    console.log(data);

    setUsers(data);
  });

  useEffect(() => {
    if (global.roomList.length > params.index) {
      setIndexValid(true);
      initSocketConnection(params.index);
      setTimeout(() => {
        axios
          .get('https://localhost:8443/room', { withCredentials: true })
          .then((response) => {
            // console.log(response.data);
            setUsers(response.data[params.index].user);
          });
      }, 200);
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  return indexValid ? (
    <div>
      <div
        style={{
          position: 'absolute',
          left: '0px',
          right: '0px',
          top: '0px',
          bottom: '0px',
        }}
      >
        <img
          src="/Images/background.jpg"
          style={{ position: 'absolute', width: '100vw', height: '100vh' }}
        />
      </div>
      <Title style={{ position: 'absolute', left: '20px', color: 'white' }}>
        {global.roomList[params.index].roomName}
      </Title>
      {users.map((item, index) => {
        if (index == 0)
          return (
            <div
              style={{
                position: 'absolute',
                left: '0px',
                right: '0px',
                top: '0px',
                bottom: '0px',
                margin: 'auto',
                width: '500px',
                height: '500px',
              }}
            >
              <img key={index} src={item.avatar} />
            </div>
          );
        if (index % 2 == 1)
          return (
            <div
              style={{
                position: 'absolute',
                left: 400 - 100 * (index / 2 + 0.5) + 'px',
                top: 300 + 30 * (index / 2 + 0.5) + 'px',
              }}
            >
              <img
                key={index}
                src={item.avatar}
                style={{ width: '300px', height: '300px' }}
              />
            </div>
          );
        if (index % 2 == 0)
          return (
            <div
              style={{
                position: 'absolute',
                right: 400 - (100 * index) / 2 + 'px',
                top: 300 + (30 * index) / 2 + 'px',
              }}
            >
              <img
                key={index}
                src={item.avatar}
                style={{ width: '300px', height: '300px' }}
              />
            </div>
          );
        else return <img key={index} src={item.avatar} />;
      })}
    </div>
  ) : (
    <div>
      <Title>방을 다시 선택해주세요</Title>
    </div>
  );
}

export default Room;
