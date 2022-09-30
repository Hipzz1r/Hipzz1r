import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Components/Modal';

const Title = styled.h1``;

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

function RoomList() {
  const [makeRoom, setMakeRoom] = useState(false);
  return (
    <>
      <Title>RoomList</Title>
      <Button onClick={() => setMakeRoom((prev) => !prev)}>방만들기</Button>
      {makeRoom && (
        <Modal closeModal={() => setMakeRoom((prev) => !prev)}>asdasd</Modal>
      )}
    </>
  );
}

export default RoomList;
