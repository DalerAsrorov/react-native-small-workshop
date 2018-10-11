import { REQUEST_CREATE_NEW_CHATROOM } from '../actions';

const DEFAULT_USER_STATE: ChatRoomsState = {
  myChatRooms: [],
  isCreatingChatRoom: false
};

const chatrooms = (state = DEFAULT_USER_STATE, action: any) => {
  switch (action.type) {
    case REQUEST_CREATE_NEW_CHATROOM:
      return {
        ...state,
        isCreatingChatRoom: action.payload
      };
    default:
      return state;
  }
};

export default chatrooms;
