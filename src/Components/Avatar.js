import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserSetting } from '../atom';
import { useRecoilState } from 'recoil';

const Button = styled.div`
  position: absolute;
  bottom: 5%;
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 80%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 4px;
  background-color: #03c75a;
  &:active {
    background-color: #03c71a;
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;

  position: absolute;
  top: 47%;
  left: 5.9%;
  width: 90%;
`;
const Arrow = styled.button`
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.7);
  background-color: #fff;
  border: 0;
  outline: 0;
  cursor: pointer;

  &:active {
    color: black;
  }
`;

const AvatarContainer = styled.div`
  width: 80%;
  height: 300px;
  margin: 0 auto;
  margin-top: 100px;

  padding-left: 10px;
  border: 1px solid black;
`;
function Avatar({ chooseAvatar }) {
  const [avatarList, setAvatarList] = useState([]);
  const [avatar, setAvatar] = useRecoilState(UserSetting);
  const [curIdx, setCurIdx] = useState(0);
  const tmp = [
    '../Images/BlackMan2.png',
    '../Images/BlackMan3.png',
    '../Images/BlackMan4.png',
    '../Images/MaleBlack1.png',
    '../Images/Monster1.png',
    '../Images/Monster2.png',
    '../Images/WhiteMan.png',
    '../Images/WhiteWoman1.png',
    '../Images/WhiteWoman2.png',
    '../Images/WhiteWoman3.png',
    '../Images/WhiteWoman4.png',
  ];

  const changeAvatar = (delta) => {
    console.log(curIdx);
    // setCurIdx((curIdx + delta) % tmp.length);
    setCurIdx((prev) => (prev + delta) % tmp.length);
    // setAvatar(tmp.at(curIdx));
    // if (dirt === 'left') {
    //   if (curIdx === 0) {
    //     setCurIdx(tmp.length - 1);
    //   }
    //   setCurIdx((prev) => prev - 1);
    //   setAvatar(tmp[curIdx]);
    //   console.log('현재 인덱스:', curIdx);
    //   console.log('현재 아바타:', avatar);
    // } else if (dirt === 'right') {
    //   if (curIdx === tmp.length - 1) {
    //     setCurIdx(0);
    //   }
    //   setCurIdx((prev) => prev + 1)
    //   setAvatar(tmp[curIdx]);
    console.log('현재 인덱스:', curIdx);
    console.log('현재 아바타:', avatar);
    setAvatar(tmp[curIdx]);
  };

  // useEffect(() => {
  //   changeAvatar();
  // }, [curIdx]);

  // 아바타 받아오기
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchAvatar = async() => {
  //     try{
  //       setData(null);
  //       setLoading(true);
  //       setError(null);
  //       const res = await axios.get(
  //         'api 주소'
  //       )
  //       setData(res.data);
  //     } catch (e) {
  //       setError(e);
  //     }
  //     setLoading(false);
  //   };
  //   fetchAvatar();
  // }, [])
  return (
    <div>
      <ArrowContainer>
        <Arrow onClick={() => changeAvatar(-1)}>&lt;</Arrow>
        <Arrow onClick={() => changeAvatar(+1)}>&gt;</Arrow>
      </ArrowContainer>
      <AvatarContainer>
        <img src={avatar} />
      </AvatarContainer>
      <Button onClick={() => chooseAvatar(avatar)}>선택</Button>
    </div>
  );
}

export default Avatar;
