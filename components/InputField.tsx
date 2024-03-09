import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
    onChangeText: (text: string) => void;
}
  
const InputField: React.FC<InputFieldProps> = ({ value, placeholder, onChangeText, ...rest }) => {
    return (
    <TextInput
        testID="InputField"
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default InputField;
