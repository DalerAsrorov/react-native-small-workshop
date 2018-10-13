import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { CustomInput, CustomButton } from './CustomInputs';
import { PRIMARY_COLOR } from '../colors';

interface CreateRoomModalScreenProps {
  username: string;
  onCreateChatRoom: (chatRoom: ChatRoomProps) => void;
}

interface CreateRoomModalScreenState {
  themeColor: string;
  newRoomName: string;
}

export default class CreateRoomModalScreen extends React.Component<
  CreateRoomModalScreenProps,
  CreateRoomModalScreenState
> {
  state = {
    themeColor: PRIMARY_COLOR,
    newRoomName: ''
  };

  private handleRoomNameChange = (text: string) => {
    this.setState({
      newRoomName: text
    });
  };

  private handleRoomCreate = () => {
    const { username, onCreateChatRoom } = this.props;
    const { newRoomName, themeColor } = this.state;

    console.log({ username, newRoomName, themeColor, onCreateChatRoom });

    onCreateChatRoom({
      id: newRoomName,
      owner: username,
      themeColor
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomInput
          onChangeText={this.handleRoomNameChange}
          autoCapitalize="none"
          placeholder="New Chatroom Name"
        />
        <CustomButton
          title="Create"
          onPress={this.handleRoomCreate}
          color="primary"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
  }
});
