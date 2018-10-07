import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { PRIMARY_COLOR } from '../colors';

export default class Login extends React.PureComponent {
  private handleUsernameInput = (username: string) => {
    console.log({ username });
  };

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.usernameInput}
          onChangeText={this.handleUsernameInput}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  usernameInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginVertical: 8,
    textAlign: 'center'
  }
});
