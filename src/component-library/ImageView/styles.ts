import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';

interface Style {
  container: ViewStyle;
  imageStyle: ImageStyle;
}

export default StyleSheet.create<Style>({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
});
