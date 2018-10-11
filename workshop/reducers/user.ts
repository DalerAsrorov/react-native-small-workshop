import { SET_USERNAME, SET_USER_LOGGED_IN } from '../actions';

const DEFAULT_USER_STATE: User = {
  isLoggedIn: false,
  username: ''
};

const user = (state = DEFAULT_USER_STATE, action: any) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    default:
      return state;
  }
};

export default user;
