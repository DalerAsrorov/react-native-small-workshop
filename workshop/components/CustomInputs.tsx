import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export const CustomInput = (props: TextInputProps) => {
  const { style: propsStyle, ...restTextInputProps } = props;

  return (
    <TextInput style={[styles.input, propsStyle]} {...restTextInputProps} />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginVertical: 8,
    textAlign: 'center'
  }
});
