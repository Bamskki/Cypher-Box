import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

import { colors } from '@Cypher/style-guide';

import styles from './styles';

interface Props {
  color?: string;
  small?: boolean;
  style?: ViewStyle;
}

function LoadingSpinner({
  small = false,
  color = colors.white,
  style,
}: Props) {
  const size = small ? 'small' : 'large';
  return (
    <View style={[styles.container, style && style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default LoadingSpinner;
