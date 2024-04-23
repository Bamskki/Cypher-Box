import { colors, textSizes, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  text: TextStyle;
  space: TextStyle;
  textInput: any;
  actionImage: ImageStyle;
  inputMain: ViewStyle;
  input: ViewStyle;
  linear: ViewStyle;
  buttons: ViewStyle;
  label: TextStyle;
  center: ViewStyle;
  dollar: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    marginHorizontal: 40,
  },
  text: {
    textAlign: "justify",
  },
  space: {
    paddingVertical: 10,
  },
  textInput: {
    color: colors.white,
    fontSize: textSizes.h2,
    fontWeight: "bold",
    left: 10,
  },
  inputMain: {
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: colors.gray.borderLight,
    borderRadius: 15,
    height: 60,
    marginHorizontal: 50,
    marginVertical: 15,
    flexDirection: "row",
  },
  input: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  linear: {
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 15,
    marginVertical: 12,
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    marginVertical: 10,
  },
  actionImage: {},
  label: {
    alignSelf: "center",
    paddingLeft: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  dollar: {
    paddingTop: 2,
  },
});
