import { connect } from 'react-redux';
import Login from '../components/Login';
import { setUserLoggedIn, setUsername } from '../actions';

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.user.isLoggedIn,
  username: state.user.username
});

const mapDispatchToProps = (dispatch: any) => ({
  onLogin() {
    dispatch(setUserLoggedIn());
  },
  onSetUsername(usernameInput: string) {
    dispatch(setUsername(usernameInput));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
