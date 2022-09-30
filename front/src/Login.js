import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  const userObj = {
    id,
    pw,
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Title>힙찔힙찔</Title>
      <form onSubmit={onSubmit}>
        <Input
          id="id"
          name="id"
          placeholder="아이디를 입력해주세요"
          onChange={onChangeId}
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={onChangePw}
        />
        <Link to="/setUser">
          <Button type="submit" disabled={id === '' || pw === ''}>
            로그인
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
