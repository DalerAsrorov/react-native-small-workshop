import { connect } from 'react-redux';
import ChatRoomPage from '../components/ChatRoomPage';
import { saveNewMessage, fetchAllChatRoomMessages } from '../actions';

const mapStateToProps = (state: AppState) => ({
  username: state.user.username,
  isSavingMessage: state.chatrooms.isSavingNewMessage,
  messages: state.chatrooms.messages
});

const mapDispatchToProps = (dispatch: any) => ({
  onSaveNewMessage({ from, text, roomId }: MessagePayload) {
    dispatch(saveNewMessage({ from, text, roomId }));
  },
  onFetchChatRoomMessages(chatRoomId: ChatRoomProps['id']) {
    dispatch(fetchAllChatRoomMessages(chatRoomId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomPage);
