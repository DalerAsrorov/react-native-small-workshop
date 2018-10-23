import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';

interface ChatRoomPageProps {
  username: User['username'];
  navigation: NavigationParams;
}

export default class ChatRoomPage extends React.PureComponent<
  ChatRoomPageProps,
  {}
> {
  componentDidMount() {
    const { navigation } = this.props;
    const {
      state: {
        params: { chatRoomId }
      }
    } = navigation;
    // TODO: Use chatroomId param from navigation state to fetch
    // all the messages of this chat room

    console.log({ chatRoomId });
  }

  render() {
    return (
      <View>
        <Text>Test Chatrooms Page</Text>
      </View>
    );
  }
}
