import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SECONDARY_COLOR } from '../colors';

interface ChatRoomsFeedProps {
  username: string;
  onCreateChatRoom: (chatroom: ChatRoomProps) => any;
}

export default class ChatRoomsFeed extends React.PureComponent<
  ChatRoomsFeedProps,
  {}
> {
  private createNewChatRoom = () => {
    const { onCreateChatRoom, username } = this.props;

    // ToDo: create a modal with a form
    // that passes these parameters
    // onCreateChatRoom({
    //   id: `${username}'s Room`,
    //   owner: username,
    //   themeColor: '#104E8B'
    // });
  };

  render() {
    return <View style={styles.container} />;
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
