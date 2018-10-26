import React from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  TextInputProps,
  ButtonProps
} from 'react-native';
import colorMap, { SECONDARY_COLOR_NAME, GREY_COLOR_NAME } from '../colors';

interface CustomInputProps extends TextInputProps {
  borderColor?: string;
}

export const CustomInput = ({
  borderColor,
  style: propsStyle,
  ...restTextInputProps
}: CustomInputProps) => {
  const color = colorMap[borderColor || GREY_COLOR_NAME];

  return (
    <TextInput
      style={[styles.input, propsStyle, { borderColor: color }]}
      {...restTextInputProps}
    />
  );
};

export const CustomButton = ({
  color: colorProp,
  ...restButtonProps
}: ButtonProps) => {
  const color = colorMap[colorProp || SECONDARY_COLOR_NAME];

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
