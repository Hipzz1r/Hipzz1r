import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { RoomInfo, RoomMake } from './atom';
import MakeRoom from './Components/MakeRoom';
import Modal from './Components/Modal';
import Room from './Components/Room';

const Title = styled.h1`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  gap: 10px;
  text-align: center;
  margin-top: 30px;
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

function RoomList() {
  const roomList = useRecoilValue(RoomInfo);
  const [makeRoom, setMakeRoom] = useRecoilState(RoomMake);

  return (
    <>
      <Title>RoomList</Title>
      <Button onClick={() => setMakeRoom((prev) => !prev)}>방만들기</Button>
      {makeRoom && (
        <Modal closeModal={() => setMakeRoom((prev) => !prev)}>
          <MakeRoom />
        </Modal>
      )}
      <Wrapper>
        {roomList.map((item) => (
          <Room name={item.name} type={item.type} key={item.name} />
        ))}
      </Wrapper>
    </>
  );
}

export default RoomList;
