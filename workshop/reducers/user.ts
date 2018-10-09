import { SET_USERNAME } from '../actions';

const DEFAULT_USER_STATE = {
  isAuthenticated: false,
  username: ''
};

const user = (state = DEFAULT_USER_STATE, action: any) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};

export default user;
