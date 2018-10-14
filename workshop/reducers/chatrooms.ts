import {
  REQUEST_CREATE_NEW_CHATROOM,
  ADD_MY_NEW_CHATROOM_TO_QUEUE
} from '../actions';

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
    case ADD_MY_NEW_CHATROOM_TO_QUEUE:
      return {
        ...state,
        myChatRooms: [action.payload, ...state.myChatRooms]
      };
    default:
      return state;
  }
};

export default chatrooms;
