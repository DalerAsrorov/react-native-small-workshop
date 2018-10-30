import { connect } from 'react-redux';
import { createNewChatroom, fetchAllChatRooms } from '../actions';
import ChatRoomsFeed from '../components/ChatRoomsFeed';

const mapStateToProps = (state: AppState) => ({
  hasReceivedChatRooms: state.chatrooms.hasReceivedChatRooms,
  chatrooms: state.chatrooms.chatrooms,
  username: state.user.username
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchAllChatRooms() {
    dispatch(fetchAllChatRooms());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsFeed);
