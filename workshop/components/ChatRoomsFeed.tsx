import React from 'react';
import {
  SegmentedControlIOS as SegmentedControl,
  FlatList,
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent,
  NativeSegmentedControlIOSChangeEvent
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import Loader from './Loader';
import { isEmpty, values } from 'ramda';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';

interface ChatRoomsFeedProps {
  username: User['username'];
  navigation: NavigationParams;
  chatrooms: ChatRoomMap;
  hasReceivedChatRooms: boolean;
  onFetchAllChatRooms: () => void;
}

interface ChatRoomsFeedState {
  segmentIndex: number;
}

const ChatFeedList = ({
  onChatRoomClick,
  shouldShowMyChatRoomsOnly,
  currentUser,
  isShown,
  chatrooms
}: {
  isShown: boolean;
  shouldShowMyChatRoomsOnly: boolean;
  currentUser: ChatRoomProps['owner'];
  chatrooms: ChatRoomMap;
  onChatRoomClick: (chatroom: ChatRoomProps) => void;
}) => {
  let chatroomsList = (
    <View style={styles.chatRoomEmptyState}>
      <Text>No chatrooms added yet.</Text>
    </View>
  );

  if (isShown) {
    const allChatRooms = values(chatrooms);
    const shownChatRooms = shouldShowMyChatRoomsOnly
      ? allChatRooms.filter(chatroom => chatroom.owner === currentUser)
      : allChatRooms;

    chatroomsList = (
      <FlatList
        data={shownChatRooms}
        renderItem={({ item: chatroom }: { item: ChatRoomProps }) => (
          <ListItem
            key={chatroom.id}
            onPress={() => onChatRoomClick(chatroom)}
            title={chatroom.name}
            subtitle={`Created by ${chatroom.owner}`}
            leftIcon={
              <Icon
                key={chatroom.id}
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
  ChatRoomsFeedState
> {
  state = {
    segmentIndex: 0
  };

  private handleChatRoomClick = (chatroom: ChatRoomProps) => {
    const { navigate } = this.props.navigation;

    navigate('ChatRoomPage', { chatroom });
  };

  private handleNavigateToCreateModal = () => {
    const { navigation } = this.props;

    navigation.navigate('CreateRoomModal');
  };

  private handleSegmenIndextChange = (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>
  ) => {
    console.log({ event });

    this.setState({
      segmentIndex: event.nativeEvent.selectedSegmentIndex
    });
  };

  componentDidMount() {
    const { onFetchAllChatRooms } = this.props;

    onFetchAllChatRooms();
  }

  render() {
    const { chatrooms, hasReceivedChatRooms, username } = this.props;
    const { segmentIndex } = this.state;
    const shouldShowChatRooms = !isEmpty(chatrooms) && hasReceivedChatRooms;
    const shouldShowMyChatRoomsOnly = segmentIndex === 1;

    return (
      <View style={styles.container}>
        <Loader isContentReady={hasReceivedChatRooms} color={PRIMARY_COLOR}>
          <SegmentedControl
            values={['Public', 'My']}
            selectedIndex={segmentIndex}
            onChange={this.handleSegmenIndextChange}
            tintColor={PRIMARY_COLOR}
          />
          <ChatFeedList
            onChatRoomClick={this.handleChatRoomClick}
            isShown={shouldShowChatRooms}
            chatrooms={chatrooms}
            shouldShowMyChatRoomsOnly={shouldShowMyChatRoomsOnly}
            currentUser={username}
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
        </Loader>
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
  chatRoomEmptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
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
