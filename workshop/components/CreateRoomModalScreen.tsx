import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { compose, isEmpty, trim } from 'ramda';
import { CustomInput, CustomButton } from './CustomInputs';
import { PRIMARY_COLOR } from '../colors';
import Loader from './Loader';

interface CreateRoomModalScreenProps {
  username: User['username'];
  chatrooms: ChatRoomMap;
  isCreatingChatRoom: boolean;
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
    const isNewRoomNameEmpty = compose(
      isEmpty,
      trim
    )(newRoomName);

    if (!isNewRoomNameEmpty) {
      onCreateChatRoom({
        name: newRoomName,
        owner: username,
        themeColor
      });
    }
  };

  componentWillReceiveProps(nextProps: CreateRoomModalScreenProps) {
    // After chatroom creation request is complete
    // return back to the chatrooms feed page
    if (this.props.isCreatingChatRoom && !nextProps.isCreatingChatRoom) {
      this.props.navigation.goBack();
    }
  }

  render() {
    const { isCreatingChatRoom } = this.props;

    return (
      <View style={styles.container}>
        <Loader isContentReady={!isCreatingChatRoom}>
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
        </Loader>
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
