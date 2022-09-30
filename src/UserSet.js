import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Components/Modal';
import Avatar from './Components/Avatar';
import { useRecoilValue } from 'recoil';
import { UserSetting } from './atom';

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

const NicknameContainer = styled.div``;

function UserSet() {
  const [nicknameMode, setNicknameMode] = useState(true);
  const [nickname, setNickname] = useState('');
  const avatar = useRecoilValue(UserSetting);
  const [avatarMode, setAvatarMode] = useState(true);

  const [signup, setSignup] = useState(true);

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      {signup ? (
        <Button onClick={() => setSignup((prev) => !prev)}>아바타 설정</Button>
      ) : (
        <>
          <Button>아바타 설정</Button>
          <Modal closeModal={() => setSignup((prev) => !prev)}>
            <Avatar />
          </Modal>
        </>
      )}

      {nicknameMode ? (
        <Button onClick={() => setNicknameMode((prev) => !prev)}>
          닉네임 설정
        </Button>
      ) : (
        <NicknameContainer>
          <Input
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            onChange={onChangeNickname}
          />
          <button onClick={() => setNicknameMode((prev) => !prev)}>취소</button>
        </NicknameContainer>
      )}
      <img src={avatar} alt="avatar" />
    </div>
  );
}

export default UserSet;
