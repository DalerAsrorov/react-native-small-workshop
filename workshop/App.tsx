import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  createSwitchNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import rootReducer from './reducers';
import ConnectedLogin from './containers/ConnectedLogin';
import ConnectedChatRoomsFeed from './containers/ConnectedChatRoomsFeed';

const store = createStore(rootReducer, applyMiddleware(thunk));

const MaterialTopNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: ConnectedChatRoomsFeed
  }
});

const StackNavigator = createSwitchNavigator(
  {
    Login: {
      screen: ConnectedLogin
    },
    MainMenu: {
      screen: MaterialTopNavigator
    }
  },
  {
    initialRouteName: 'Login'
  }
);

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
