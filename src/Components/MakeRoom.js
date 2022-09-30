import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { RoomInfo, RoomMake } from '../atom';

const Title = styled.h1``;
const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
  `}
`;

function MakeRoom() {
  const [roomName, setRoomName] = useState('');
  const [roomType, setRoomType] = useState('');
  const [roomList, setRoomList] = useRecoilState(RoomInfo);
  const [makeRoom, setMakeRoom] = useRecoilState(RoomMake);

  const onChangeRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const onChangeRoomType = (e) => {
    setRoomType(e.target.value);
  };

  const onClick = () => {
    const newItem = {
      type: roomType,
      name: roomName,
    };
    setRoomList((oldList) => [...oldList, newItem]);
    setMakeRoom((prev) => !prev);
  };
  return (
    <>
      <Title>RoomList</Title>
      <Input
        id="roomName"
        name="roomName"
        placeholder="방제를 입력해주세요"
        onChange={onChangeRoomName}
      />
      <select name="roomType" onChange={onChangeRoomType}>
        <option value="싸이퍼">싸이퍼</option>
        <option value="랩배틀">랩배틀</option>
        <option value="크루배틀">크루배틀</option>
        <option value="일반배틀">일반</option>
      </select>
      <Button onClick={onClick}>확인</Button>
    </>
  );
}

export default React.memo(MakeRoom);
