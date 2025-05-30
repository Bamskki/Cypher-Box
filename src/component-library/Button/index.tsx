import React from 'react';
import {
  Text as RNText,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import LoadingSpinner from '../LoadingSpinner';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '@Cypher/style-guide';

export interface Props extends TouchableOpacityProps {
  text: string;
  type?: 'primary' | 'secondary' | 'danger' | 'tertiary' | 'disabled';
  onPress(): void;
  loading?: boolean;
  style?: ViewStyle;
  leftIcon?: string;
  rightIcon?: string;
  textStyle?: any;
  disabled?: boolean;
}

function Button({
  text,
  type = 'primary',
  onPress,
  loading = false,
  style,
  leftIcon,
  rightIcon,
  disabled = false,
  textStyle
}: Props) {
  const onPressButton = loading ? () => { } : onPress;
  return (
    <TouchableOpacity
      accessibilityLabel={text}
      testID={text}
      style={[styles.button, style && style, disabled && { backgroundColor: colors.gray.text }]}
      onPress={onPressButton}
      disabled={disabled ? disabled : loading}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <View style={styles.row}>
          {leftIcon && (
            <View style={styles.leftIcon}>
              <Ionicons
                name={leftIcon}
                size={20}
                color={colors.black.default}
              />
            </View>
          )}
          <RNText
            textBreakStrategy="simple"
            allowFontScaling={false}
            style={[styles.text, textStyle && textStyle]}>
            {text}
          </RNText>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default Button;
