import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors } from "@Cypher/style-guide";

interface Style {
  container: ViewStyle;
  topView: ViewStyle;
  thresholdImage: ImageStyle;
  bottomView: ViewStyle;
  text: TextStyle;
  space: TextStyle;
  button: any;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topView: {
    paddingBottom: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    height: 100,
  },
  thresholdImage: {
    marginTop: 30,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  text: {
    textAlign: "justify",
  },
  space: {
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
});
