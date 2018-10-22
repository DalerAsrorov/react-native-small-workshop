interface User {
  isLoggedIn: boolean;
  username: string;
}

interface ChatRoomsState {
  chatrooms: Array<ChatRoomProps>;
  isCreatingChatRoom: boolean;
  hasReceivedChatRooms: boolean;
}

interface AppState {
  user: User;
  chatrooms: ChatRoomsState;
}

interface ChatRoomProps {
  name: string;
  owner: User['username'];
  themeColor: string;
}

// 3rd party libraries that don't have integrated Typescript types
declare module 'react-native-color-picker';
