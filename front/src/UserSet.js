import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

function UserSet() {
  return (
    <div>
      <Button>아바타 설정</Button>
      <Button>닉네임 설정</Button>
    </div>
  );
}

export default UserSet;
