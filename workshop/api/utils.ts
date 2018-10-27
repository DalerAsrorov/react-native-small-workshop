import { isEmpty } from 'ramda';

export const generateTempId = () => String(Date.now());

export const transformData = (chatrooms: Array<ChatRoomProps>): ChatRoomMap =>
  chatrooms.reduce((accum: any, curr) => {
    if (!isEmpty(curr)) {
      const { id, ...restProps } = curr;
      const chatId = id ? id : generateTempId();

      accum[chatId] = { id, ...restProps };
    }

    return accum;
  }, {});
