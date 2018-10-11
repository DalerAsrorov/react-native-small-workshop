import { combineReducers } from 'redux';
import user from './user';
import chatrooms from './chatrooms';

export default combineReducers({
  user,
  chatrooms
});
