import { StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { colors } from '@Cypher/style-guide';

interface Styles {
  container: ViewStyle;
  textInput: ViewStyle;
  textInputFocussed: ViewStyle;
  textNormalInputFocussed: ViewStyle;
  textInputError: ViewStyle;
  errorText: TextStyle;
  labelText: TextStyle;
  textMultiline: TextStyle;
  textDisabledInput: ViewStyle;
  remianingCountView: ViewStyle;
  normalInput: ViewStyle;
}

export default StyleSheet.create<Styles>({
  container: {
    margin: 3,
  },
  textInput: {
    borderRadius: 17.5,
    // borderWidth: 1,
    height: 54,
    paddingHorizontal: 15,
    // borderColor: colors.white,
    backgroundColor: colors.gray.dark,
    shadowColor: colors.white,
    color: colors.white,
    fontSize: 22,
    fontFamily: 'Lato-SemiBold',
    textAlign: 'center',
  },
  normalInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 15,
    borderColor: colors.gray.light,
    backgroundColor: colors.white,
  },
  textInputFocussed: {
    borderColor: colors.white,
    shadowColor: colors.white,
    shadowRadius: 3,
    shadowOpacity: 1,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
    }),
  },
  textNormalInputFocussed: {
    borderColor: 'red',
    shadowColor: 'red',
    shadowRadius: 3,
    shadowOpacity: 1,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
      },
    }),
  },
  textInputError: {
    borderColor: colors.red,
  },
  errorText: {
    marginTop: 10,
    color: colors.red,
  },
  labelText: {
    marginBottom: 5,
  },
  textMultiline: {
    paddingTop: 15,
    paddingBottom: 15,
    height: 144,
    textAlignVertical: 'top',
  },
  textDisabledInput: {
    borderColor: colors.gray.light,
    backgroundColor: colors.gray.default,
  },
  remianingCountView: {
    alignItems: 'flex-end',
  },
});
