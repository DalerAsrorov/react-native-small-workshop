import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import * as R from 'ramda';
import { CustomInput, CustomButton } from './CustomInputs';
import { PRIMARY_COLOR } from '../colors';

interface CreateRoomModalScreenProps {
  username: User['username'];
  chatrooms: ChatRoomMap;
  onCreateChatRoom: (chatRoom: ChatRoomProps) => void;
  navigation: {
    goBack: () => void;
  };
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
    const isNewRoomNameEmpty = R.compose(
      R.isEmpty,
      R.trim
    )(newRoomName);

    if (!isNewRoomNameEmpty) {
      onCreateChatRoom({
        name: newRoomName,
        owner: username,
        themeColor
      });
    }
  };

  componentWillReceiveProps(
    nextProps: CreateRoomModalScreenProps,
    prevState: CreateRoomModalScreenState
  ) {
    const prevMessagesN = R.length(R.keys(this.props.chatrooms));
    const nextMessagesN = R.length(R.keys(nextProps.chatrooms));

    if (R.gt(nextMessagesN, prevMessagesN)) {
      this.props.navigation.goBack();
    }
  }

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
