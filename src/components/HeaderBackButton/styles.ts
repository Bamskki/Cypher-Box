import { ImageStyle, StyleSheet } from 'react-native';

interface Styles {
  headerBackButton: ImageStyle;
}

export default StyleSheet.create<Styles>({
  headerBackButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 30,
    marginLeft: 20,
    zIndex:1
  },
});
