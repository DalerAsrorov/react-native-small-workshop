import React from 'react';
import { StyleSheet, FlatList, View, Button, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { SECONDARY_COLOR } from '../colors';


interface ChatRoomsFeedProps {
  username: string;
  navigation: NavigationParams;
  chatrooms: Array<ChatRoomProps>;
  hasReceivedChatRooms: boolean;
  onFetchAllChatRooms: () => void;
}

const ChatFeedList = ({
  isShown,
  chatrooms
}: {
  isShown: boolean;
  chatrooms: Array<ChatRoomProps>;
}) => {
  let chatroomsList = null;

  if (isShown) {
    chatroomsList = (
      <FlatList
        data={chatrooms}
        renderItem={({ item: chatroom }: { item: ChatRoomProps }) => {
          return <ListItem title={chatroom.name} subtitle={chatroom.owner} />;
        }}
      />
    );
  }

  return chatroomsList;
};

export default class ChatRoomsFeed extends React.PureComponent<
  ChatRoomsFeedProps,
  {}
> {
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
        <Button onPress={this.handleNavigateToCreateModal} title="Create" />
        <ChatFeedList isShown={shouldShowChatRooms} chatrooms={chatrooms} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: SECONDARY_COLOR
  }
});
