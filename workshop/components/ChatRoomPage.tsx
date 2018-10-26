import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';
import { CustomInput as TextArea } from './CustomInputs';

interface ChatRoomPageProps {
  username: User['username'];
  navigation: NavigationParams;
}

const MAX_NUMBER_OF_LINES = 4;

export default class ChatRoomPage extends React.PureComponent<
  ChatRoomPageProps,
  {}
> {
  state = {
    currentMessage: ''
  };

  private handleMessageInput = (text: string) => {
    this.setState({
      currentMessage: text
    });
  };

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
      <View style={styles.container}>
        <TextArea
          style={styles.messageInput}
          multiline={true}
          numberOfLines={MAX_NUMBER_OF_LINES}
          onChangeText={this.handleMessageInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0
  },
  messageInput: {
    textAlign: 'left',
    paddingHorizontal: 10
  }
});
