import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
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
  themeColorHsv: object;
  newRoomName: string;
}

export default class CreateRoomModalScreen extends React.Component<
  CreateRoomModalScreenProps,
  CreateRoomModalScreenState
> {
  state = {
    themeColorHsv: {},
    newRoomName: ''
  };

  private handleRoomNameChange = (text: string) => {
    this.setState({
      newRoomName: text
    });
  };

  private handleColorChange = (themeColorHsv: object) => {
    this.setState({
      themeColorHsv
    });
  };

  private handleRoomCreate = () => {
    const { username, onCreateChatRoom } = this.props;
    const { newRoomName, themeColorHsv } = this.state;
    const isNewRoomNameEmpty = compose(
      isEmpty,
      trim
    )(newRoomName);

    if (!isNewRoomNameEmpty) {
      const themeColor = !isEmpty(themeColorHsv)
        ? fromHsv(themeColorHsv)
        : PRIMARY_COLOR;

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
            onColorChange={this.handleColorChange}
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
