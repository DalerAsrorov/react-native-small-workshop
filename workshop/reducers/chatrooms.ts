import {
  REQUEST_CREATE_NEW_CHATROOM,
  ADD_MY_NEW_CHATROOM_TO_QUEUE,
  RECEIVE_ALL_CHATROOMS
} from '../actions';

const DEFAULT_USER_STATE: ChatRoomsState = {
  chatrooms: [],
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
        chatrooms: [action.payload, ...state.chatrooms]
      };
    case RECEIVE_ALL_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload
      };
    default:
      return state;
  }
};

export default chatrooms;
