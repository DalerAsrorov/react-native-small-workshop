import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
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

  private handleColorSelect = (colorHex: string) => {
    this.setState({
      themeColor: colorHex
    });
  };

  private handleRoomCreate = () => {
    const { username, onCreateChatRoom } = this.props;
    const { newRoomName, themeColor } = this.state;

    if (newRoomName.trim().length > 1) {
      onCreateChatRoom({
        id: newRoomName,
        owner: username,
        themeColor
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.fieldWrapper}>
          <CustomInput
            onChangeText={this.handleRoomNameChange}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="New Chatroom Name"
          />
        </View>
        <ColorPicker
          style={{ flex: 3 }}
          hideSliders={true}
          onColorSelected={this.handleColorSelect}
        />
        <View style={styles.fieldWrapper}>
          <CustomButton
            title="Create Chatroom"
            onPress={this.handleRoomCreate}
            color="primary"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
  },
  fieldWrapper: {
    flex: 1,
    justifyContent: 'center'
  }
});
