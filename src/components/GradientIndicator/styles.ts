import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  linearGradient2: ViewStyle;
}

export default StyleSheet.create<Style>({
  linearGradient2: {
    width: "100%",
    borderRadius: 2,
    height: 6,
    zIndex: 99,
  },
});
