const shouldUseLocale: boolean = true;
const REQUEST_BASE: string = shouldUseLocale
  ? 'http://localhost:5000/react-native-small-workshop/us-central1'
  : '';
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
