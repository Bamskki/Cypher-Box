import { StyleSheet, TextStyle } from 'react-native';

import { colors, textSizes } from '@Cypher/style-guide';

interface Styles {
  default: TextStyle;
  headline: TextStyle;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  header: TextStyle;
  subHeader: TextStyle;
  bold: TextStyle;
  semibold: TextStyle;
  italic: TextStyle;
  center: TextStyle;
  white: TextStyle;
  blue: TextStyle;
}

export default StyleSheet.create<Styles>({
  default: {
    fontSize: textSizes.default,
    lineHeight: 18,
    color: colors.white,
    fontFamily: 'Lato-Medium',
  },
  headline: {
    fontSize: textSizes.headline,
    lineHeight: 50,
    fontFamily: 'Lato-Bold',
  },
  h1: {
    fontSize: textSizes.h1,
    lineHeight: 50,
    fontFamily: 'Lato-Bold',
  },
  h2: {
    fontSize: textSizes.h2,
    lineHeight: 28,
    // fontFamily: 'Lato-Bold',
  },
  h3: {
    fontSize: textSizes.h3,
    lineHeight: 24,
  },
  h4: {
    fontSize: textSizes.h4,
    lineHeight: 20,
  },
  header: {
    fontSize: textSizes.header,
    lineHeight: 45,
    fontFamily: 'Lato-Bold',
  },
  subHeader: {
    fontSize: textSizes.subHeader,
    lineHeight: 32,
  },
  bold: {
    fontFamily: 'Lato-Bold',
  },
  semibold: {
    fontFamily: 'Lato-Semibold',
  },
  italic: {
    fontFamily: 'Lato-Italic',
  },
  center: {
    textAlign: 'center',
  },
  white: {
    color: colors.white,
  },
  blue: {
    color: colors.primary,
  },
});
