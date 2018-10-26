import {
  createChatRoom,
  getAllChatRooms,
  fetchAllChatRoomMessages as fetchAllChatRoomMessagesApi,
  saveNewMessage as saveNewMessageApi
} from '../api';

export const REQUEST_CREATE_NEW_CHATROOM = 'REQUEST_CREATE_NEW_CHATROOM';
export const requestCreateNewChatRoom = (shouldCreate: boolean = true) => ({
  type: REQUEST_CREATE_NEW_CHATROOM,
  payload: shouldCreate
});

export const ADD_MY_NEW_CHATROOM_TO_QUEUE = 'ADD_MY_NEW_CHATROOM_TO_QUEUE';
export const addMyNewChatroomToQueue = (chatroom: ChatRoomProps) => ({
  type: ADD_MY_NEW_CHATROOM_TO_QUEUE,
  payload: chatroom
});

export const createNewChatroom = ({
  name,
  owner,
  themeColor
}: ChatRoomProps) => (dispatch: any) => {
  dispatch(requestCreateNewChatRoom());

  return createChatRoom({ name, owner, themeColor }).then(snapshot => {
    dispatch(addMyNewChatroomToQueue({ name, owner, themeColor }));
    dispatch(requestCreateNewChatRoom(false));
  });
};

export const RECEIVE_ALL_CHATROOMS = 'RECEIVE_ALL_CHATROOMS';
export const receiveAllChatrooms = (chatrooms: Array<ChatRoomProps>) => ({
  type: RECEIVE_ALL_CHATROOMS,
  payload: chatrooms
});

export const fetchAllChatRooms = () => (dispatch: any) => {
  return getAllChatRooms().then((chatrooms: Array<ChatRoomProps>) => {
    dispatch(receiveAllChatrooms(chatrooms));
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

export const RECEIVE_ALL_CHATROOM_MESSAGES = 'RECEIVE_ALL_CHATROOM_MESSAGES';
export const receiveAllChatroomMessages = (
  messages: Array<MessagePayload>
) => ({
  type: RECEIVE_ALL_CHATROOM_MESSAGES,
  payload: messages
});

export const fetchAllChatRoomMessages = (roomId: ChatRoomProps['id']) => (
  dispatch: any
) => {
  return fetchAllChatRoomMessagesApi(roomId).then(
    (messages: Array<MessagePayload>) => {
      dispatch(receiveAllChatroomMessages(messages));
    }
  );
};
