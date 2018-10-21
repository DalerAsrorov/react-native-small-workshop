import React from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';
import { List, ListItem, ListItemProps } from 'react-native-elements';
import { NavigationParams } from 'react-navigation';
import { SECONDARY_COLOR } from '../colors';

/**
 * TODO: Use List and ListItem components along
 * with FlatList to create the list of chatrooms
 * https://github.com/DalerAsrorov/react-native-small-workshop/issues/9
 */

interface ChatRoomsFeedProps {
  username: string;
  navigation: NavigationParams;
  myChatRooms: Array<ChatRoomProps>;
}

export default class ChatRoomsFeed extends React.PureComponent<
  ChatRoomsFeedProps,
  {}
> {
  render() {
    const { navigation, myChatRooms } = this.props;

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
