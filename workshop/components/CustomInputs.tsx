import React from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  TextInputProps,
  ButtonProps
} from 'react-native';
import colorMap, { SECONDARY_COLOR } from '../colors';

export const CustomInput = ({
  style: propsStyle,
  ...restTextInputProps
}: TextInputProps) => (
  <TextInput style={[styles.input, propsStyle]} {...restTextInputProps} />
);

export const CustomButton = ({
  color: colorProp,
  ...restButtonProps
}: ButtonProps) => {
  const color = colorMap[colorProp || SECONDARY_COLOR];

  return <Button color={color} {...restButtonProps} />;
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginVertical: 8,
    textAlign: 'center'
  },
  button: {}
});
