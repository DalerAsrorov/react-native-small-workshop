import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginUser, setUsername } from '../actions';

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.user.isAuthenticated,
  username: state.user.username
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogin() {
    dispatch(loginUser());
  },
  onSetUsername(usernameInput: string) {
    dispatch(setUsername(usernameInput));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
