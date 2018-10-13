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
        <CustomInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
