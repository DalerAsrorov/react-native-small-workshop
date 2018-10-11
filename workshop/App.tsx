import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import rootReducer from './reducers';
import ConnectedLogin from './containers/ConnectedLogin';
import ConnectedChatRoomsFeed from './containers/ConnectedChatRoomsFeed';

const store = createStore(rootReducer, applyMiddleware(thunk));

const StackNavigator = createStackNavigator({
  Login: {
    screen: ConnectedLogin
  },
  ChatRoomsFeed: {
    screen: ConnectedChatRoomsFeed
  }
});

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}
