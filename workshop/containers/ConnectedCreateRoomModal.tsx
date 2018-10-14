import { connect } from 'react-redux';
import { createNewChatroom } from '../actions';
import CreateRoomModalScreen from '../components/CreateRoomModalScreen';

const mapStateToProps = (state: AppState) => ({
  myChatRooms: state.chatrooms.myChatRooms,
  username: state.user.username
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
