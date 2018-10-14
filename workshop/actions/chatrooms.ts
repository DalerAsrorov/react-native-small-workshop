import { createChatRoom } from '../api';

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

export const createNewChatroom = ({ id, owner, themeColor }: ChatRoomProps) => (
  dispatch: any
) => {
  dispatch(requestCreateNewChatRoom());

  createChatRoom({ id, owner, themeColor }).then(snapshot => {
    dispatch(addMyNewChatroomToQueue({ id, owner, themeColor }));
    dispatch(requestCreateNewChatRoom(false));
  });
};
