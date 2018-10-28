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
  chatrooms: state.chatrooms.chatrooms
});

const mapDispatchToProps = (dispatch: any) => ({
  onSaveNewMessage({ from, text, roomId }: MessagePayload) {
    dispatch(saveNewMessage({ from, text, roomId }));
  },
  onFetchChatRoomMessages(chatRoomId: ChatRoomProps['id']) {
    dispatch(fetchAllChatRoomMessages(chatRoomId));
  },
  onAddNewMessage(message: MessagePayload, roomId: MessagePayload['roomId']) {
    dispatch(addNewChatRoomMessage(message, roomId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomPage);
