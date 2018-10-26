import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';
import {
  CustomInput as TextArea,
  CustomButton as Button
} from './CustomInputs';

interface ChatRoomPageProps {
  isSavingNewMessage: ChatRoomsState['isSavingNewMessage'];
  navigation: NavigationParams;
  username: User['username'];
  onSaveNewMessage: (message: MessagePayload) => void;
}

interface ChatRoomPageState {
  currentMessage: MessagePayload['messageText'];
  roomId: MessagePayload['roomId'];
}

const MAX_NUMBER_OF_LINES = 4;

export default class ChatRoomPage extends React.PureComponent<
  ChatRoomPageProps,
  ChatRoomPageState
> {
  state = {
    currentMessage: '',
    roomId: ''
  };

  private handleMessageInput = (text: string) => {
    this.setState({
      currentMessage: text
    });
  };

  private handleSaveMessage = () => {
    this.saveNewMessage();
  };

  private saveNewMessage = () => {
    const { currentMessage, roomId } = this.state;
    const { username, onSaveNewMessage } = this.props;

    onSaveNewMessage({
      from: username,
      messageText: currentMessage,
      roomId
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    const {
      state: {
        params: { chatRoomId: roomId }
      }
    } = navigation;

    this.setState({
      roomId
    });
    // TODO: Use chatroomId param from navigation state to fetch
    // all the messages of this chat room

    console.log({ roomId });
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
        <View style={styles.sendButtonWrapepr}>
          <Button
            title="Send"
            color="primary"
            onPress={this.handleSaveMessage}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'row'
  },
  sendButtonWrapepr: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    flex: 1
  },
  messageInput: {
    textAlign: 'left',
    paddingHorizontal: 10,
    flex: 3
  }
});
