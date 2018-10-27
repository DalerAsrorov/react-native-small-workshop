import { connect } from 'react-redux';
import ChatRoomPage from '../components/ChatRoomPage';
import {
  saveNewMessage,
  fetchAllChatRoomMessages,
  addNewChatRoomMessage
} from '../actions';

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
  },
  onAddNewMessage(message: MessagePayload) {
    dispatch(addNewChatRoomMessage(message));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomPage);
