interface User {
  isLoggedIn: boolean;
  username: string;
}

interface ChatRoomsState {
  chatrooms: ChatRoomMap;
  isCreatingChatRoom: boolean;
  hasReceivedAllChatRoomMessages: boolean;
  hasReceivedChatRooms: boolean;
  isSavingNewMessage: boolean;
}

interface ChatRoomMap {
  [id: string]: ChatRoomProps;
}

interface AppState {
  user: User;
  chatrooms: ChatRoomsState;
}

interface ChatRoomProps {
  name: string;
  owner: User['username'];
  themeColor: string;
  messages?: Array<MessagePayload>;
  id?: string;
}

interface MessagePayload {
  id?: string;
  from: User['username'];
  roomId: ChatRoomProps['id'];
  text: string;
}

// 3rd party libraries that don't have integrated Typescript types
declare module 'react-native-color-picker';
