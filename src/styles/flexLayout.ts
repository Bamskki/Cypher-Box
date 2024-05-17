import { StyleSheet, ViewStyle } from 'react-native';

interface FlexStyles {
  flexOne: ViewStyle;
  flexTwo: ViewStyle;
  flexRow: ViewStyle;
  flexCol: ViewStyle;
  justifySpaceBetween: ViewStyle;
  justifySpaceAround: ViewStyle;
  justifyCenter: ViewStyle;
  justifyLeft: ViewStyle;
  alignCenter: ViewStyle;
  center: ViewStyle;
  alignSelf: ViewStyle;
}

export const flexStyles: FlexStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexCol: {
    flexDirection: 'column',
  },
  justifySpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyLeft: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignSelf: {
    alignSelf: 'center',
  },
});
