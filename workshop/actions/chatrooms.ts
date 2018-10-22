import { createChatRoom, getAllChatRooms } from '../api';

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
