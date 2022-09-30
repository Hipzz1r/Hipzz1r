import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ATOM_RoomList } from '../atom';
import Modal from './Modal';

const Title = styled.h3`
  font-size: 26px;
  text-align: center;
  margin-bottom: 4px;
`;

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function Room({ roomId, rooms }) {
  const setRooms = useSetRecoilState(ATOM_RoomList);
  const [makeRoom, setMakeRoom] = useState(false);
  return (
    <Wrapper>
      <Title>{roomId}</Title>
      <button onClick={() => setMakeRoom((prev) => !prev)}>방만들기</button>
      {makeRoom && (
        <Modal closeModal={() => setMakeRoom((prev) => !prev)}>wow</Modal>
      )}
    </Wrapper>
  );
}

export default Room;
