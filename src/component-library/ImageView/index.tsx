import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

interface Props {
  onPress?(): void;
  style?: any;
  imageStyle?: any;
  image: any;
  disable?: boolean;
}

export default function ImageView({
  onPress,
  image,
  style,
  imageStyle,
  disable = true,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      disabled={disable}>
      <Image
        source={image}
        style={[styles.imageStyle, imageStyle]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
