import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';
import rootReducer from './reducers';
import CreateModalScreen from './components/CreateRoomModalScreen';
import ConnectedLogin from './containers/ConnectedLogin';
import ConnectedChatRoomsFeed from './containers/ConnectedChatRoomsFeed';

const store = createStore(rootReducer, applyMiddleware(thunk));

const MaterialTopNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: ConnectedChatRoomsFeed
  }
});

const RootStackNavigator = createStackNavigator(
  {
    Login: {
      screen: ConnectedLogin
    },
    MainMenu: {
      screen: MaterialTopNavigator
    },
    CreateRoomModal: {
      screen: CreateModalScreen
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
