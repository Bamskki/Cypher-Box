import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, textSizes } from '@Cypher/style-guide';
interface Styles {
  container: ViewStyle;
  text: TextStyle;
  dottedText: TextStyle;
  center: ViewStyle;
  noUnderline: ViewStyle;
  dottedLine: ViewStyle;
  whiteText: TextStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    alignSelf: 'flex-start',
    borderColor: colors.white,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  text: {
    backgroundColor: 'transparent',
    color: colors.white,
    fontSize: textSizes.h4,
    fontFamily: 'Lato-Medium',
    lineHeight: 18,
  },
  dottedText: {
    fontWeight: 'normal',
    color: colors.yellow,
  },
  noUnderline: {
    borderBottomWidth: 0,
  },
  dottedLine: {
    borderRadius: 1,
    height: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.black.default,
    marginBottom: -3,
  },
  whiteText: {
    color: colors.white,
  },
});
