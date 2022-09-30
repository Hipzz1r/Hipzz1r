import { atom } from 'recoil';

export const RoomInfo = atom({
  key: 'RoomInfoState',
  default: [],
});

export const RoomMake = atom({
  key: 'RoomMakeState',
  default: false,
});

export const UserSetting = atom({
  key: 'UserSettingState',
  default: '',
});
