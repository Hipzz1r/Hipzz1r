import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: lightgray;
  justify-content: space-around;
  border-radius: 5px;
  height: 100px;
  cursor: pointer;
  &:active {
    background-color: gray;

    div {
      background-color: green;
    }
  }
`;

const Title = styled.div`
  margin-top: 14px;
  font-size: 24px;
  background-color: lightgreen;
  width: 300px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-radius: 5px;
`;

const Type = styled.div`
  font-size: 18px;

  margin-top: 14px;
  width: 100px;
  height: 70px;
  line-height: 70px;
  background-color: lightgreen;
  border-radius: 5px;
`;
function Room({ name, type }) {
  return (
    <Container>
      <Title>{name}</Title>
      <Type>{type}</Type>
    </Container>
  );
}

export default Room;
