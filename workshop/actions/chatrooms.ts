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

export const createNewChatroom = ({
  name,
  owner,
  themeColor
}: ChatRoomProps) => (dispatch: any) => {
  dispatch(requestCreateNewChatRoom());

  createChatRoom({ name, owner, themeColor }).then(snapshot => {
    dispatch(addMyNewChatroomToQueue({ name, owner, themeColor }));
    dispatch(requestCreateNewChatRoom(false));
  });
};
