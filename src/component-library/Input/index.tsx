import React, { Ref, forwardRef, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  KeyboardTypeOptions,
  ViewStyle,
  ReturnKeyTypeOptions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputIOSProps,
  TextStyle,
} from 'react-native';

import { colors } from '@Cypher/style-guide';
import Text from '../Text';
import styles from './styles';

export interface Props {
  value: string;
  onChange(newValue: string): void;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  onSubmitEditing?(): void;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  returnKeyType?: ReturnKeyTypeOptions;
  onKeyPress?(e: NativeSyntheticEvent<TextInputKeyPressEventData>): void;
  blurOnSubmit?: boolean;
  style?: ViewStyle;
  isEditable?: boolean;
  onInputFocussed?(isFocussed: boolean): void;
  isRequired?: boolean;
  displayRemainingCount?: boolean;
  isWhite?: boolean;
  isLabelBold?: boolean;
  isInputWithBorder?: boolean;
  mask?: any;
  textContentType?: any;
  textInputStyle?: TextStyle;
  editable?: boolean;
}

function Input(
  {
    value,
    onChange,
    label,
    maxLength,
    onSubmitEditing,
    placeholder,
    error,
    secureTextEntry = false,
    multiline = false,
    keyboardType = 'default',
    autoCapitalize,
    returnKeyType = 'done',
    onKeyPress,
    blurOnSubmit,
    style,
    isEditable = true,
    onInputFocussed,
    isRequired,
    displayRemainingCount,
    isWhite,
    isLabelBold = false,
    isInputWithBorder = false,
    mask,
    textContentType = undefined,
    textInputStyle,
    editable = true,
  }: Props,
  ref: Ref<RNTextInput>,
) {
  const [focussed, setFocussed] = useState(false);

  const setFocussedTrue = () => {
    if (onInputFocussed) {
      onInputFocussed(true);
    }
    setFocussed(true);
  };
  const setFocussedFalse = () => {
    if (onInputFocussed) {
      onInputFocussed(false);
    }
    setFocussed(false);
  };

  const returnIndexForTest = () => {
    if (label) {
      return `input${label}`;
    } else {
      return `input`;
    }
  };
  function onFormSubmitted() {
    // do something with textValue, update state
    if (label?.includes('Email address')) {
      onChange(value?.toLowerCase());
    }
  }

  const handleChange = (event) => {
    let result = event;
    if (label?.includes('Reference')) {
      result = event?.replace(/[^A-Za-z0-9 ]/g, '');
    }
    onChange(result);
  };

  return (
    <View style={[styles.container, style && style]}>
      {/* {label && (
        <Text bold={isLabelBold} style={styles.labelText}>
          {label}
        </Text>
      )} */}
      <RNTextInput
        ref={ref}
        style={[
          styles.textInput,
          multiline && styles.textMultiline,
          // focussed && isInputWithBorder
          //   ? styles.textNormalInputFocussed
          //   : styles.textInputFocussed,
          // isInputWithBorder && !focussed && styles.normalInput,
          error ? styles.textInputError : {},
          textInputStyle && textInputStyle,
        ]}
        value={value}
        onFocus={setFocussedTrue}
        onBlur={setFocussedFalse}
        blurOnSubmit={blurOnSubmit}
        onChangeText={handleChange}
        onSubmitEditing={onSubmitEditing}
        placeholder={label}
        placeholderTextColor={colors.gray.placeholder}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        onKeyPress={onKeyPress}
        allowFontScaling={false}
        testID={returnIndexForTest()}
        accessibilityLabel={returnIndexForTest()}
        textContentType={textContentType}
        editable={editable}
      />

      {displayRemainingCount && (
        <View style={styles.remianingCountView}>
          <Text style={{ marginTop: 5 }}>{`${value?.length}/${maxLength}`}</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default forwardRef(Input);
