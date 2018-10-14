import { connect } from 'react-redux';
import { createNewChatroom } from '../actions';
import ChatRoomsFeed from '../components/ChatRoomsFeed';

const mapStateToProps = (state: AppState) => ({
  myChatRooms: state.chatrooms.myChatRooms,
  isLoggedIn: state.user.isLoggedIn,
  username: state.user.username
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsFeed);
