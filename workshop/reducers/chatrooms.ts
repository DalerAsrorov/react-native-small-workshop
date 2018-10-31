import { clone } from 'ramda';
import {
  REQUEST_CREATE_NEW_CHATROOM,
  RECEIVE_ALL_CHATROOMS,
  REQUEST_SAVE_NEW_MESSAGE,
  REQUEST_ALL_CHATROOM_MESSAGES,
  RECEIVE_ALL_CHATROOM_MESSAGES,
  ADD_NEW_CHATROOM_MESSAGE,
  DELETE_CHATROOM_FROM_QUEUE
} from '../actions';

const DEFAULT_CHAT_ROOMS_STATE: ChatRoomsState = {
  chatrooms: {},
  isCreatingChatRoom: false,
  hasReceivedChatRooms: false,
  hasReceivedAllChatRoomMessages: false,
  isSavingNewMessage: false
};

const chatrooms = (state = DEFAULT_CHAT_ROOMS_STATE, action: any) => {
  let chatRoomMap: any = {};
  let roomId: string = '';
  let messages: Array<MessagePayload> = [];

  switch (action.type) {
    case REQUEST_CREATE_NEW_CHATROOM:
      return {
        ...state,
        isCreatingChatRoom: action.payload
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
    case REQUEST_ALL_CHATROOM_MESSAGES:
      return {
        ...state,
        hasReceivedAllChatRoomMessages: action.payload
      };
    case RECEIVE_ALL_CHATROOM_MESSAGES:
      chatRoomMap = clone(state.chatrooms);
      chatRoomMap[action.payload.roomId].messages = action.payload.messages;

      return {
        ...state,
        chatrooms: chatRoomMap,
        hasReceivedAllChatRoomMessages: true
      };
    case ADD_NEW_CHATROOM_MESSAGE:
      roomId = action.payload.roomId;
      chatRoomMap = clone(state.chatrooms);
      messages = chatRoomMap[roomId].messages;

      chatRoomMap[roomId].messages = [...messages, action.payload.message];

      return {
        ...state,
        chatrooms: chatRoomMap
      };
    case DELETE_CHATROOM_FROM_QUEUE:
      chatRoomMap = clone(state.chatrooms);

      delete chatRoomMap[action.payload];

      return {
        ...state,
        chatrooms: chatRoomMap
      };
    default:
      return state;
  }
};

export default chatrooms;
