import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationParams } from 'react-navigation';
import { SECONDARY_COLOR } from '../colors';

interface ChatRoomsFeedProps {
  username: string;
  navigation: NavigationParams;
}

export default class ChatRoomsFeed extends React.PureComponent<
  ChatRoomsFeedProps,
  {}
> {
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
