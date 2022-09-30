import styled from 'styled-components';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ATOM_RoomList } from './atom';
import Room from './Components/Room';

const Title = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Rooms = styled.div`
  display: flex;
  width: 100%;
  min-height: 200px;
  gap: 10px;
`;
function RoomList() {
  const [rooms, setRooms] = useRecoilState(ATOM_RoomList);
  return (
    <RecoilRoot>
      <Title>Room List</Title>
      <Wrapper>
        <Rooms>
          {Object.keys(rooms).map((roomId) => (
            <Room roomId={roomId} key={roomId} rooms={rooms[roomId]} />
          ))}
          sdfsdf
        </Rooms>
      </Wrapper>
    </RecoilRoot>
  );
}

export default RoomList;
