import React from 'react';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { SECONDARY_COLOR, PRIMARY_COLOR } from '../colors';

interface ChatRoomsFeedProps {
  username: string;
  onCreateChatRoom: (chatroom: ChatRoomProps) => any;
  navigation: NavigationParams;
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
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('CreateRoomModal')}
          title="Create"
        />
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
