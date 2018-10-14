interface User {
  isLoggedIn: boolean;
  username: string;
}

interface ChatRoomsState {
  myChatRooms: Array<ChatRoomProps>;
  isCreatingChatRoom: boolean;
}

interface AppState {
  user: User;
  chatrooms: ChatRoomsState;
}

interface ChatRoomProps {
  id: string;
  owner: User['username'];
  themeColor: string;
}

// 3rd party libraries that don't have integrated Typescript types
declare module 'react-native-color-picker';
