import { connect } from 'react-redux';
import {
  createNewChatroom,
  fetchAllChatRooms,
  deleteChatRoom
} from '../actions';
import ChatRoomsFeed from '../components/ChatRoomsFeed';

const mapStateToProps = (state: AppState) => ({
  hasReceivedChatRooms: state.chatrooms.hasReceivedChatRooms,
  chatrooms: state.chatrooms.chatrooms,
  username: state.user.username
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetchAllChatRooms() {
    dispatch(fetchAllChatRooms());
  },
  onRequestDeleteChatRoom(roomId: ChatRoomProps['id']) {
    dispatch(deleteChatRoom(roomId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsFeed);
