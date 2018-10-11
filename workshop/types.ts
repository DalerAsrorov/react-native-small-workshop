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
}

interface ChatRoomProps {
  id: string;
  owner: User['username'];
  themeColor: string;
}
