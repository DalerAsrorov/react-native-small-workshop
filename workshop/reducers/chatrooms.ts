import { clone } from 'ramda';
import { generateTempId } from '../api/utils';
import {
  REQUEST_CREATE_NEW_CHATROOM,
  ADD_MY_NEW_CHATROOM_TO_QUEUE,
  RECEIVE_ALL_CHATROOMS,
  REQUEST_SAVE_NEW_MESSAGE,
  RECEIVE_ALL_CHATROOM_MESSAGES,
  ADD_NEW_CHATROOM_MESSAGE
} from '../actions';

const DEFAULT_CHAT_ROOMS_STATE: ChatRoomsState = {
  chatrooms: {},
  messages: [],
  isCreatingChatRoom: false,
  hasReceivedChatRooms: false,
  isSavingNewMessage: false
};

const chatrooms = (state = DEFAULT_CHAT_ROOMS_STATE, action: any) => {
  let chatRoomMap: any = {};

  switch (action.type) {
    case REQUEST_CREATE_NEW_CHATROOM:
      return {
        ...state,
        isCreatingChatRoom: action.payload
      };
    case ADD_MY_NEW_CHATROOM_TO_QUEUE:
      const newChatRooom = {
        id: generateTempId(),
        ...action.payload
      };

      chatRoomMap = clone(state.chatrooms);
      chatRoomMap[newChatRooom.id] = {
        ...newChatRooom
      };

      return {
        ...state,
        chatrooms: chatRoomMap
      };
    case RECEIVE_ALL_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
        hasReceivedChatRooms: true
      };
    case REQUEST_SAVE_NEW_MESSAGE:
      return {
        ...state,
        isSavingNewMessage: action.payload
      };
    case RECEIVE_ALL_CHATROOM_MESSAGES:
      return {
        ...state,
        messages: action.payload || []
      };
    case ADD_NEW_CHATROOM_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export default chatrooms;
