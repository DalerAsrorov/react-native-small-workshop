import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import { SECONDARY_COLOR } from './colors';

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Login />
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
