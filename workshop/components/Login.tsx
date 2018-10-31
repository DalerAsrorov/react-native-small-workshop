import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SECONDARY_COLOR } from '../colors';
import { CustomInput, CustomButton } from './CustomInputs';

interface LoginProps {
  username: User['username'];
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
    navigation.replace('Home');
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Username"
          onChangeText={this.handleUsernameInput}
        />
        <CustomButton
          onPress={this.handleLogin}
          title="Login"
          color="primary"
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
