import { createChatRoom } from '../api';

export const REQUEST_CREATE_NEW_CHATROOM = 'REQUEST_CREATE_NEW_CHATROOM';
export const requestCreateNewChatRoom = (shouldCreate: boolean = true) => ({
  type: REQUEST_CREATE_NEW_CHATROOM,
  payload: shouldCreate
});

export const createNewChatroom = ({ id, owner, themeColor }: ChatRoomProps) => (
  dispatch: any
) => {
  dispatch(requestCreateNewChatRoom());

  createChatRoom({ id, owner, themeColor }).then(snapshot => {
    // add the new chatroom with existing props to the queue
    // of myChatRooms
    console.log({ id, owner, themeColor });
    dispatch(requestCreateNewChatRoom(false));
  });
};
