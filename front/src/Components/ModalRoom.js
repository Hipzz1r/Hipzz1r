import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ATOM_RoomList } from '../atom';
import '../styles/modal.css';
const Input = styled.input``;
function ModalRoom(props) {
  const setRooms = useSetRecoilState(ATOM_RoomList);
  const [roomName, setRoomName] = useState('');
  function closeModal() {
    props.closeModal();
  }
  const onChangeRoom = (e) => {
    setRoomName(e.target.value);
  };

  const newRoom = {
    id: Date.now(),
    roomName: roomName,
  };

  setRooms((allRooms) => {
    return {
      ...allRooms,
      [props.roomId]: [newRoom, ...allRooms[props.roomId]],
    };
  });

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        <Input
          id="roomName"
          name="roomName"
          placeholder="방제를 입력해주세요"
          onChange={onChangeRoom}
        />
      </div>
    </div>
  );
}

export default ModalRoom;
