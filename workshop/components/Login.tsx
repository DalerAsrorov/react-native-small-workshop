import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { SECONDARY_COLOR, PRIMARY_COLOR } from '../colors';
import { CustomInput } from './CustomInputs';

interface LoginProps {
  username: string;
  onSetUsername: (usernameInput: string) => any;
  onLogin: () => any;
  navigation: { replace: (path: string) => void };
}

export default class Login extends React.PureComponent<LoginProps, {}> {
  private handleUsernameInput = (usernameInput: string) => {
    const { onSetUsername } = this.props;

    onSetUsername(usernameInput);
  };

  private handleLogin = () => {
    const { onLogin, navigation } = this.props;

    onLogin();
    navigation.replace('MainMenu');
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomInput
          autoCapitalize="none"
          autoCorrect={false}
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
  }
});
