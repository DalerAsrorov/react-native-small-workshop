import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { SECONDARY_COLOR, PRIMARY_COLOR } from '../colors';

interface LoginProps {
  username: string;
  onSetUsername: (usernameInput: string) => any;
  onLogin: () => any;
  navigation: { navigate: (path: string) => void };
}

export default class Login extends React.PureComponent<LoginProps, {}> {
  private handleUsernameInput = (usernameInput: string) => {
    const { onSetUsername } = this.props;

    onSetUsername(usernameInput);
  };

  private handleLogin = () => {
    const { onLogin, navigation } = this.props;

    onLogin();
    navigation.navigate('MainMenu');
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
        <Button
          onPress={this.handleLogin}
          title="Login"
          color={PRIMARY_COLOR}
          accessibilityLabel="Login to chatroom application with the provided username"
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
