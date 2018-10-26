import { connect } from 'react-redux';
import ChatRoomPage from '../components/ChatRoomPage';
import { saveNewMessage, fetchAllChatRoomMessages } from '../actions';

const mapStateToProps = (state: AppState) => ({
  username: state.user.username,
  isSavingMessage: state.chatrooms.isSavingNewMessage,
  messages: state.chatrooms.messages
});

const mapDispatchToProps = (dispatch: any) => ({
  onSaveNewMessage({ from, messageText, roomId }: MessagePayload) {
    dispatch(saveNewMessage({ from, messageText, roomId }));
  },
  onFetchChatRoomMessages(chatRoomId: ChatRoomProps['id']) {
    fetchAllChatRoomMessages(chatRoomId);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomPage);
