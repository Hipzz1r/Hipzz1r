import { atom } from 'recoil';

export const ATOM_RoomList = atom({
  key: 'todoListState',
  default: {
    NORMAL: [],
    CYPHER: [],
    BATTLE: [],
    CREW: [],
  },
});
