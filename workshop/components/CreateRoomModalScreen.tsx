import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { CustomInput } from './CustomInputs';

interface CreateRoomModalScreenProps {}

export default class CreateRoomModalScreen extends React.Component<
  CreateRoomModalScreenProps,
  {}
> {
  render() {
    return (
      <View style={styles.container}>
        <CustomInput placeholder="New Chatroom Name" />
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
