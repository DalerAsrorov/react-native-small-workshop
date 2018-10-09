import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SECONDARY_COLOR } from '../colors';

interface LoginProps {
  username: string;
  onSetUsername: (usernameInput: string) => any;
  onLogin: () => any;
}

export default class Login extends React.PureComponent<LoginProps, {}> {
  private handleUsernameInput = (usernameInput: string) => {
    const { onSetUsername } = this.props;

    onSetUsername(usernameInput);
  };

  render() {
    return (
      <View style={styles.container}>
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: SECONDARY_COLOR
  },
  usernameInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginVertical: 8,
    textAlign: 'center'
  }
});
