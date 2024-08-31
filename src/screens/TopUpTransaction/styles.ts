import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  priceView: ViewStyle;
  keyText: TextStyle;
  qrimage: ImageStyle;
  heigth: ViewStyle;
  main: ViewStyle;
  destination: TextStyle;
  senderText: TextStyle;
  label: TextStyle;
  heigth2: TextStyle;
  editButton: ViewStyle;
  linearGradientStroke: ViewStyle;
  linearGradient3: ViewStyle;
  background: ViewStyle;
  linearGradient4: ViewStyle;
  modal: ViewStyle;
  row: ViewStyle;
  background2: ViewStyle;
  bottomView: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    padding: 22,
  },
  priceView: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 16,
  },
  keyText: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Lato-Medium",
  },
  qrimage: {
    width: 51,
    height: 51,
    position: "absolute",
    right: 0,
  },
  heigth: {
    height: 84,
  },
  main: {
    width: "70%",
    alignSelf: "center",
    height: 84,
  },
  destination: {
    width: "64%",
    alignSelf: "center",
    marginTop: 16,
  },
  senderText: {
    height: 78,
    fontSize: 20,
  },
  label: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 1,
  },
  heigth2: {
    fontSize: 14,
  },
  editButton: {
    width: 103,
    height: 60,
  },
  linearGradientStroke: {
    height: 45,
    width: "40%",
    marginLeft: 10,
    marginTop: -30,
    // marginVertical: 20,
    borderRadius: 18,
  },
  linearGradient3: {
    height: 45,
    borderRadius: 18,
  },
  background2: {
    backgroundColor: colors.gray.dark,
    flex: 1,
    margin: 2,
    borderRadius: 25,
    paddingHorizontal: 3,
  },
  background: {
    backgroundColor: colors.gray.dark,
    flex: 1,
    margin: 2,
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modal: {
    height: 200,
    width: "45%",
    marginVertical: 20,
    borderRadius: 25,
    alignSelf: "center",
  },
  row: {
    backgroundColor: colors.black.default,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  linearGradient4: {
    height: 200,
    borderRadius: 25,
  },
  bottomView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
    height: 50,
    left: 0,
    right: 0,
    backgroundColor: colors.gray.dark,
  },
});
