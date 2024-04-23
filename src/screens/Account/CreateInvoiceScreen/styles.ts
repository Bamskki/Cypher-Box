import { colors, textSizes } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  screen: any;
  inputMain: ViewStyle;
  input: ViewStyle;
  textInput: TextStyle;
  label: ViewStyle;
  dollar: TextStyle;
  focusedInput: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  gradient: any;
  tabView: ViewStyle;
  image: ImageStyle;
  button: any;
  bottom: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  screen: {
    paddingTop: 20,
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    color: colors.white,
    fontSize: textSizes.h2,
    fontWeight: "bold",
    left: 20,
  },
  label: {
    alignSelf: "center",
    left: 70,
  },
  dollar: {
    paddingTop: 2,
  },
  focusedInput: {
    borderColor: colors.pink.default,
  },
  tab: {
    width: "49%",
  },
  tabText: {
    paddingRight: 7,
  },

  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    height: 55,
  },
  tabView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.gray.charcoal,
    height: 64,
    borderRadius: 25,
    width: "80%",
    marginVertical: 18,
    borderWidth: 1,
    borderColor: colors.black.border,
    padding: 3.5,
    shadowOpacity: 0.71,
    shadowColor: colors.black.default,
    shadowRadius: 12,
    elevation: 24,
    marginTop: 300,
  },
  image: {
    marginRight: 8,
  },
  button: {
    width: "95%",
    backgroundColor: "transparent",
    alignSelf: "center",
  },
  bottom: {
    bottom: 30,
    alignItems: "center",
  },
});
