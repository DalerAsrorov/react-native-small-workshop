import { transformData } from './utils';

const shouldUseLocale: boolean = false;
const LOCAL_API =
  'http://localhost:5000/react-native-small-workshop/us-central1';
const REMOTE_API =
  'https://us-central1-react-native-small-workshop.cloudfunctions.net';
const REQUEST_BASE: string = shouldUseLocale ? LOCAL_API : REMOTE_API;
const REQUEST_DEF_PARAMS: RequestInit = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const stringifyJson = JSON.stringify;

export const createChatRoom = ({
  owner,
  themeColor,
  name
}: ChatRoomProps): Promise<{ success: boolean }> => {
  return fetch(`${REQUEST_BASE}/createChatRoom`, {
    method: 'post',
    body: stringifyJson({
      name,
      owner,
      themeColor
    }),
    ...REQUEST_DEF_PARAMS
  })
    .then(response => response.json())
    .then(({ success }) => success)
    .catch(error => console.log('Error creating chat room', error));
};

export const saveNewMessage = ({
  from,
  text,
  roomId
}: MessagePayload): Promise<{ success: boolean }> => {
  return fetch(`${REQUEST_BASE}/addMessageToChatRoom`, {
    method: 'post',
    body: stringifyJson({
      text,
      from,
      roomId
    }),
    ...REQUEST_DEF_PARAMS
  })
    .then(response => response.json())
    .then(({ success }) => success)
    .catch(error =>
      console.log(
        `Error adding a new message to chatroom with ID - ${roomId}:`,
        error
      )
    );
};

export const getAllChatRooms = (): Promise<ChatRoomMap> => {
  return fetch(`${REQUEST_BASE}/getChatRooms`, {
    method: 'get',
    ...REQUEST_DEF_PARAMS
  })
    .then(response => response.json())
    .then(data => transformData(data))
    .catch(error => error);
};

export const fetchAllChatRoomMessages = (
  roomId: ChatRoomProps['id']
): Promise<Array<MessagePayload>> => {
  return fetch(`${REQUEST_BASE}/getChatRoomMessages`, {
    method: 'post',
    body: stringifyJson({
      roomId
    }),
    ...REQUEST_DEF_PARAMS
  })
    .then(response => response.json())
    .catch(error =>
      console.log(
        `Error fetching messages for the chatroom with ID - ${roomId}:`,
        error
      )
    );
};

export const deleteChatRoom = (
  roomId: ChatRoomProps['id']
): Promise<{ success: boolean }> => {
  return fetch(`${REQUEST_BASE}/deleteChatRoom`, {
    method: 'delete',
    body: stringifyJson({
      roomId
    }),
    ...REQUEST_DEF_PARAMS
  })
    .then(response => response.json())
    .catch(error =>
      console.log(`Error removing the chat room with id - ${roomId}:`, error)
    );
};
