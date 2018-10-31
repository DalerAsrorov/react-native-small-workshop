import React from 'react';
import {
  SegmentedControlIOS as SegmentedControl,
  FlatList,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  NativeSegmentedControlIOSChangeEvent
} from 'react-native';
import SwipeOut from 'react-native-swipeout';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import Loader from './Loader';
import { EmptyStateText } from './common';
import { isEmpty, values } from 'ramda';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../colors';

interface ChatRoomsFeedProps {
  username: User['username'];
  navigation: NavigationParams;
  chatrooms: ChatRoomMap;
  hasReceivedChatRooms: boolean;
  onFetchAllChatRooms: () => void;
  onRequestDeleteChatRoom: (roomId: ChatRoomProps['id']) => void;
}

interface ChatRoomsFeedState {
  segmentIndex: number;
}

const swipeButtons = ({
  onDelete,
  roomId
}: {
  onDelete: (id: ChatRoomProps['id']) => void;
  roomId: ChatRoomProps['id'];
}) => [
  {
    text: 'Delete',
    color: SECONDARY_COLOR,
    backgroundColor: 'red',
    onPress: () => onDelete(roomId)
  }
];

const ChatFeedList = ({
  onRoomDelete,
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
  onRoomDelete: (roomId: ChatRoomProps['id']) => void;
}) => {
  let chatroomsList = <EmptyStateText text="No chatrooms added yet." />;

  if (isShown) {
    const allChatRooms = values(chatrooms);
    const shownChatRooms = shouldShowMyChatRoomsOnly
      ? allChatRooms.filter(chatroom => chatroom.owner === currentUser)
      : allChatRooms;

    chatroomsList = (
      <FlatList
        data={shownChatRooms}
        renderItem={({ item: chatroom }: { item: ChatRoomProps }) => (
          <SwipeOut
            autoClose={true}
            right={swipeButtons({
              onDelete: onRoomDelete,
              roomId: chatroom.id
            })}
          >
            <ListItem
              containerStyle={styles.listItem}
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
          </SwipeOut>
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
    this.setState({
      segmentIndex: event.nativeEvent.selectedSegmentIndex
    });
  };

  private handleChatRoomDelete = (roomId: ChatRoomProps['id']) => {
    const { onRequestDeleteChatRoom } = this.props;

    onRequestDeleteChatRoom(roomId);
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
            onRoomDelete={this.handleChatRoomDelete}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: SECONDARY_COLOR
  },
  iconContainerStyle: {
    paddingRight: 10
  },
  listItem: {
    backgroundColor: SECONDARY_COLOR
  }
});
