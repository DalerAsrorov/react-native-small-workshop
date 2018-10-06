/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MyMessage = ({ text }: { text: string }): React.ReactElement<Element> => (
  <View>
    <Text style={styles.text}>{text}</Text>
  </View>
);

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <MyMessage text="Hello World" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: 24,
    color: 'red'
  }
});
