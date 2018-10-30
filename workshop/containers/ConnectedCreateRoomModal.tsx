import { connect } from 'react-redux';
import { createNewChatroom } from '../actions';
import CreateRoomModalScreen from '../components/CreateRoomModalScreen';

const mapStateToProps = (state: AppState) => ({
  chatrooms: state.chatrooms.chatrooms,
  username: state.user.username,
  isCreatingChatRoom: state.chatrooms.isCreatingChatRoom
});

const mapDispatchToProps = (dispatch: any) => ({
  onCreateChatRoom(newChatRoom: ChatRoomProps) {
    dispatch(createNewChatroom(newChatRoom));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoomModalScreen);
