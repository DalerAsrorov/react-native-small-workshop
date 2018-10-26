import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';
import { CustomInput as TextArea } from './CustomInputs';

interface ChatRoomPageProps {
  isSavingNewMessage: ChatRoomsState['isSavingNewMessage'];
  navigation: NavigationParams;
  username: User['username'];
  messages: ChatRoomsState['messages'];
  onSaveNewMessage: (message: MessagePayload) => void;
  onFetchChatRoomMessages: (roomId: MessagePayload['roomId']) => any;
}

interface ChatRoomPageState {
  currentMessage: MessagePayload['text'];
  roomId: MessagePayload['roomId'];
}

const MAX_NUMBER_OF_LINES = 4;

const MessageList = ({ messages }: { messages: Array<MessagePayload> }) => {
  return (
    <List>
      {messages.map((message: MessagePayload) => (
        <ListItem
          key={message.id}
          title={message.from}
          subtitle={
            <View style={styles.messageTextContainer}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          }
        />
      ))}
    </List>
  );
};

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
      text: currentMessage,
      roomId
    });

    this.setState({
      currentMessage: ''
    });
  };

  componentDidMount() {
    const { navigation, onFetchChatRoomMessages } = this.props;
    const {
      state: {
        params: { chatRoomId: roomId }
      }
    } = navigation;

    this.setState({
      roomId
    });

    onFetchChatRoomMessages(roomId);
  }

  render() {
    const { messages } = this.props;

    return (
      <View style={styles.pageContainer}>
        <View style={styles.messageListContainer}>
          <MessageList messages={messages} />
        </View>
        <View style={styles.messageBoxContainer}>
          <TextArea
            placeholder="Type message..."
            value={this.state.currentMessage}
            style={styles.messageInput}
            multiline={true}
            numberOfLines={MAX_NUMBER_OF_LINES}
            onChangeText={this.handleMessageInput}
          />
          <Icon
            onPress={this.handleSaveMessage}
            color={PRIMARY_COLOR}
            name="message"
            raised
            reverse
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16
  },
  messageTextContainer: {
    paddingVertical: 8
  },
  messageBoxContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    paddingLeft: 10
  },
  messageInput: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
    textAlign: 'left',
    flex: 4
  },
  messageListContainer: {
    flex: 4
  },
  pageContainer: {
    display: 'flex',
    flex: 1
  }
});
