import { connect } from 'react-redux';
import ChatRoomPage from '../components/ChatRoomPage';
import { saveNewMessage } from '../actions';

const mapStateToProps = (state: AppState) => ({
  username: state.user.username,
  isSavingMessage: state.chatrooms.isSavingNewMessage
});

const mapDispatchToProps = (dispatch: any) => ({
  onSaveNewMessage({ from, messageText, roomId }: MessagePayload) {
    dispatch(saveNewMessage({ from, messageText, roomId }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomPage);
