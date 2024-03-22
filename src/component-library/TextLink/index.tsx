import React from 'react';
import {
  Text as RNText,
  TouchableOpacity,
  ViewStyle,
  View,
  TextStyle,
} from 'react-native';

import styles from './styles';

interface Props {
  text: string;
  onPress(): void;
  center?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  dotted?: boolean;
  whiteText?: boolean;
}

function TextLink({
  text,
  onPress,
  center = false,
  dotted = false,
  style,
  textStyle,
  whiteText = false,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        center && styles.center,
        dotted && styles.noUnderline,
        style && style,
      ]}
      accessibilityLabel={`${text}`}
      testID={`${text}`}
      onPress={onPress}
      accessibilityRole="button"
      activeOpacity={0.5}>
      <RNText
        textBreakStrategy="simple"
        allowFontScaling={false}
        style={[
          styles.text,
          textStyle,
          dotted && styles.dottedText,
          whiteText && styles.whiteText,
        ]}>
        {text}
      </RNText>
      {dotted && <View style={styles.dottedLine} />}
    </TouchableOpacity>
  );
}

export default TextLink;
