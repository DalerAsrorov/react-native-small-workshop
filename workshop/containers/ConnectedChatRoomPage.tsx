import { connect } from 'react-redux';
import ChatRoomPage from '../components/ChatRoomPage';

const mapStateToProps = (state: AppState) => ({
  username: state.user.username
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomPage);
