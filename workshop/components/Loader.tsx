import React, { ReactChildren } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({
  isContentReady,
  children,
  ...indicatorProps
}: {
  isContentReady: boolean;
  children: any;
}) => {
  if (!isContentReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" {...indicatorProps} />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Loader;
