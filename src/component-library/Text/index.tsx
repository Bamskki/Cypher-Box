import React, { ReactNode } from 'react';
import { LayoutChangeEvent, Text as RNText, TextStyle } from 'react-native';

import styles from './styles';

export interface Props {
  testID?: string;
  children?: ReactNode;
  headline?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  header?: boolean;
  subHeader?: boolean;
  bold?: boolean;
  semibold?: boolean;
  italic?: boolean;
  numberOfLines?: number;
  center?: boolean;
  onPress?(): void;
  white?: boolean;
  blue?: boolean;
  /**
   * style: only pass in margin or color styles here!!!
   * You should never need to change the size / font etc.
   * This ensures we only use agreed Text styles from the designer.
   * If you need to add another, discuss with designer.
   */
  style?: TextStyle | TextStyle[];
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

function Text({
  testID,
  children,
  onPress,
  headline = false,
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  header = false,
  subHeader = false,
  bold = false,
  semibold = false,
  italic = false,
  numberOfLines = 99,
  center = false,
  white = false,
  blue = false,
  style,
  onLayout,
}: Props) {
  return (
    <RNText
      textBreakStrategy="simple"
      testID={`text${children?.toString()}`}
      accessibilityLabel={`text${children?.toString()}`}
      numberOfLines={numberOfLines}
      adjustsFontSizeToFit
      onPress={onPress}
      onLayout={onLayout}
      allowFontScaling={false}
      style={[
        styles.default,
        headline && styles.headline,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        header && styles.header,
        subHeader && styles.subHeader,
        bold && styles.bold,
        semibold && styles.semibold,
        italic && styles.italic,
        center && styles.center,
        white && styles.white,
        blue && styles.blue,
        style && style,
      ]}>
      {children}
    </RNText>
  );
}

export default Text;
