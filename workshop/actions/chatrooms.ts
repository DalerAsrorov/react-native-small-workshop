import {
  createChatRoom,
  getAllChatRooms,
  fetchAllChatRoomMessages as fetchAllChatRoomMessagesApi,
  saveNewMessage as saveNewMessageApi,
  deleteChatRoom as deleteChatRoomApi
} from '../api';

export const REQUEST_CREATE_NEW_CHATROOM = 'REQUEST_CREATE_NEW_CHATROOM';
export const requestCreateNewChatRoom = (shouldCreate: boolean = true) => ({
  type: REQUEST_CREATE_NEW_CHATROOM,
  payload: shouldCreate
});
export const createNewChatroom = ({
  name,
  owner,
  themeColor
}: ChatRoomProps) => (dispatch: any) => {
  dispatch(requestCreateNewChatRoom());

  return createChatRoom({ name, owner, themeColor }).then(snapshot => {
    dispatch(fetchAllChatRooms());
    dispatch(requestCreateNewChatRoom(false));
  });
};

export const RECEIVE_ALL_CHATROOMS = 'RECEIVE_ALL_CHATROOMS';
export const receiveAllChatrooms = (chatrooms: ChatRoomMap) => ({
  type: RECEIVE_ALL_CHATROOMS,
  payload: chatrooms
});

export const fetchAllChatRooms = () => (dispatch: any) => {
  return getAllChatRooms().then((chatrooms: ChatRoomMap) => {
    dispatch(receiveAllChatrooms(chatrooms));
    return chatrooms;
  });
};

export const REQUEST_SAVE_NEW_MESSAGE = 'REQUEST_SAVE_NEW_MESSAGE';
export const requestSaveNewMessage = (isSavingNewMessage: boolean = true) => ({
  type: REQUEST_SAVE_NEW_MESSAGE,
  payload: isSavingNewMessage
});

export const saveNewMessage = (messagePayload: MessagePayload) => (
  dispatch: any
) => {
  dispatch(requestSaveNewMessage(true));

  return saveNewMessageApi(messagePayload).then(() => {
    dispatch(requestSaveNewMessage(false));
  });
};

export const ADD_NEW_CHATROOM_MESSAGE = 'ADD_NEW_CHATROOM_MESSAGE';
export const addNewChatRoomMessage = (
  message: MessagePayload,
  roomId: MessagePayload['roomId']
) => ({
  type: ADD_NEW_CHATROOM_MESSAGE,
  payload: {
    message,
    roomId
  }
});

export const REQUEST_ALL_CHATROOM_MESSAGES = 'REQUEST_ALL_CHATROOM_MESSAGES';
export const requestAllChatRoomMessages = (hasReceivedMessages: boolean) => ({
  type: REQUEST_ALL_CHATROOM_MESSAGES,
  payload: hasReceivedMessages
});

export const RECEIVE_ALL_CHATROOM_MESSAGES = 'RECEIVE_ALL_CHATROOM_MESSAGES';
export const receiveAllChatroomMessages = (
  messages: Array<MessagePayload>,
  roomId: MessagePayload['roomId']
) => ({
  type: RECEIVE_ALL_CHATROOM_MESSAGES,
  payload: {
    roomId,
    messages
  }
});

export const fetchAllChatRoomMessages = (roomId: ChatRoomProps['id']) => (
  dispatch: any
) => {
  return fetchAllChatRoomMessagesApi(roomId).then(
    (messages: Array<MessagePayload>) => {
      dispatch(receiveAllChatroomMessages(messages, roomId));
    }
  );
};

export const DELETE_CHATROOM_FROM_QUEUE = 'DELETE_CHATROOM_FROM_QUEUE';
export const deleteChatRoomFromQueue = (roomId: ChatRoomProps['id']) => ({
  type: DELETE_CHATROOM_FROM_QUEUE,
  payload: roomId
});

export const deleteChatRoom = (roomId: ChatRoomProps['id']) => (
  dispatch: any
) => {
  dispatch(deleteChatRoomFromQueue(roomId));
  return deleteChatRoomApi(roomId).then(() => {
    // TODO maybe set a boolean value on success
    console.log('Deleted successfully', roomId);
  });
};
