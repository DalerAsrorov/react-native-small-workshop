import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  NativeSyntheticEvent,
  NativeTouchEvent
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';

interface ChatRoomsFeedProps {
  username: string;
  navigation: NavigationParams;
  chatrooms: Array<ChatRoomProps>;
  hasReceivedChatRooms: boolean;
  onFetchAllChatRooms: () => void;
}

const ChatFeedList = ({
  onChatRoomClick,
  isShown,
  chatrooms
}: {
  isShown: boolean;
  chatrooms: Array<ChatRoomProps>;
  onChatRoomClick: (chatroom: ChatRoomProps['id']) => void;
}) => {
  let chatroomsList = null;

  if (isShown) {
    chatroomsList = (
      <FlatList
        data={chatrooms}
        renderItem={({ item: chatroom }: { item: ChatRoomProps }) => (
          <ListItem
            onPress={() => onChatRoomClick(chatroom.id)}
            title={chatroom.name}
            subtitle={`Created by ${chatroom.owner}`}
            leftIcon={
              <Icon
                containerStyle={styles.iconContainerStyle}
                name="chat"
                color={chatroom.themeColor}
              />
            }
          />
        )}
      />
    );
  }

  return chatroomsList;
};

export default class ChatRoomsFeed extends React.PureComponent<
  ChatRoomsFeedProps,
  {}
> {
  private handleChatRoomClick = (chatRoomId: ChatRoomProps['id']) => {
    const { navigate } = this.props.navigation;

    navigate('ChatRoomPage', { chatRoomId });
  };

  private handleNavigateToCreateModal = () => {
    const { navigation } = this.props;

    navigation.navigate('CreateRoomModal');
  };

  componentDidMount() {
    const { onFetchAllChatRooms } = this.props;

    onFetchAllChatRooms();
  }

  render() {
    const { chatrooms, hasReceivedChatRooms } = this.props;
    const shouldShowChatRooms =
      chatrooms && chatrooms.length > 0 && hasReceivedChatRooms;

    return (
      <View style={styles.container}>
        <ChatFeedList
          onChatRoomClick={this.handleChatRoomClick}
          isShown={shouldShowChatRooms}
          chatrooms={chatrooms}
        />
        <Icon
          size={30}
          onPress={this.handleNavigateToCreateModal}
          containerStyle={styles.addIconStyle}
          color={PRIMARY_COLOR}
          name="add"
          raised
          reverse
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addIconStyle: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: SECONDARY_COLOR
  },
  iconContainerStyle: {
    paddingRight: 10
  }
});
