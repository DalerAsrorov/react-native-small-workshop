import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GREY_COLOR } from '../colors';

export const EmptyStateText = ({ text }: { text: string }) => (
  <View style={styles.emptyStateView}>
    <Text style={styles.emptyStateText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyStateView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 8
  },
  emptyStateText: {
    color: GREY_COLOR,
    fontSize: 24,
    fontWeight: '600'
  }
});
