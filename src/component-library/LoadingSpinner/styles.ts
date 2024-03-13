import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
