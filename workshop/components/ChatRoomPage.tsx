import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Text,
  ScrollViewProperties
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { isEmpty } from 'ramda';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';
import { generateTempId } from '../api/utils';
import Loader from './Loader';
import { CustomInput as TextArea } from './CustomInputs';

const MAX_NUMBER_OF_LINES = 4;
const MESSAGES_POLLING_INTERVAL = 5000;

interface ChatRoomPageProps {
  chatrooms: ChatRoomMap;
  isSavingNewMessage: ChatRoomsState['isSavingNewMessage'];
  hasReceivedMessages: ChatRoomsState['hasReceivedAllChatRoomMessages'];
  navigation: NavigationParams;
  username: User['username'];
  onSaveNewMessage: (message: MessagePayload) => void;
  onFetchChatRoomMessages: (roomId: MessagePayload['roomId']) => any;
  onRequestChatRoomMessages: (
    hasReceived: ChatRoomsState['hasReceivedAllChatRoomMessages']
  ) => any;
  onAddNewMessage: (
    message: MessagePayload,
    roomId: MessagePayload['roomId']
  ) => void;
}

interface ChatRoomPageState {
  currentMessage: MessagePayload['text'];
  roomId: MessagePayload['roomId'];
}

const MessageList = ({
  chatrooms,
  roomId
}: {
  chatrooms: ChatRoomMap;
  roomId: MessagePayload['roomId'];
}) => {
  const messages = roomId ? chatrooms[roomId].messages : null;
  let messageList = null;

  console.log({ messages });

  if (messages && !isEmpty(messages)) {
    messageList = (
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
  }

  return messageList;
};

export default class ChatRoomPage extends React.PureComponent<
  ChatRoomPageProps,
  ChatRoomPageState
> {
  private messagePollInterval: any;
  private scrollView: any;

  constructor(props: ChatRoomPageProps) {
    super(props);

    this.messagePollInterval = React.createRef();
    this.scrollView = React.createRef();
  }

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
    const { username, onSaveNewMessage, onAddNewMessage } = this.props;
    const messagePayload: MessagePayload = {
      from: username,
      text: currentMessage,
      roomId
    };

    // add new message to the queue for the user to see
    // generate a temporary string ID for the iterator to identify the key
    onAddNewMessage({ id: generateTempId(), ...messagePayload }, roomId);
    // save new message to the database
    onSaveNewMessage(messagePayload);
    // clear out the input after message has been sent
    this.setState({
      currentMessage: ''
    });
  };

  private fetchChatRoomMessages = () => {
    const { onFetchChatRoomMessages } = this.props;
    const { roomId } = this.state;

    if (roomId.length > 0) {
      onFetchChatRoomMessages(roomId);
    }
  };

  componentDidMount() {
    const { onRequestChatRoomMessages } = this.props;
    onRequestChatRoomMessages(false);
    this.fetchChatRoomMessages();

    this.messagePollInterval = setInterval(() => {
      this.fetchChatRoomMessages();
    }, MESSAGES_POLLING_INTERVAL);
  }

  componentWillMount() {
    const { navigation } = this.props;
    const {
      state: {
        params: { chatRoomId: roomId }
      }
    } = navigation;

    this.setState({
      roomId
    });
  }

  componentWillUnmount() {
    clearInterval(this.messagePollInterval);
  }

  render() {
    const { roomId } = this.state;
    const { chatrooms, hasReceivedMessages } = this.props;

    return (
      <View style={styles.pageContainer}>
        <Loader isContentReady={hasReceivedMessages} color={PRIMARY_COLOR}>
          <View style={styles.messageListContainer}>
            <ScrollView
              ref={ref => (this.scrollView = ref)}
              onContentSizeChange={(contentWidth, contentHeight) =>
                this.scrollView.scrollToEnd({ animated: true })
              }
            >
              <MessageList roomId={roomId} chatrooms={chatrooms} />
            </ScrollView>
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
        </Loader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    marginLeft: 10
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
