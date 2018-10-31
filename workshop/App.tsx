import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import rootReducer from './reducers';
import ConnectedCreateRoomModalScreen from './containers/ConnectedCreateRoomModal';
import ConnectedLogin from './containers/ConnectedLogin';
import ConnectedChatRoomsFeed from './containers/ConnectedChatRoomsFeed';
import ConnectedChatRoomPage from './containers/ConnectedChatRoomPage';

const store = createStore(rootReducer, applyMiddleware(thunk));

const RootStackNavigator = createStackNavigator(
  {
    Login: {
      screen: ConnectedLogin
    },
    ChatRoomPage: {
      screen: ConnectedChatRoomPage
    },
    Home: {
      screen: ConnectedChatRoomsFeed
    },
    CreateRoomModal: {
      screen: ConnectedCreateRoomModalScreen
    }
  },
  {
    initialRouteName: 'Login',
    mode: 'modal'
  }
);

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    );
  }
}
