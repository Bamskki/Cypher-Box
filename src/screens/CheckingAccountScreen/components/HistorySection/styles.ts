import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  section: ViewStyle;
  sectionLine: ViewStyle;
  list: any;
  soap: any;
  electricity: ImageStyle;
  text: TextStyle;
  top: ViewStyle;
  bottom: ViewStyle;
  container: any;
}

export default StyleSheet.create<Style>({
  list: {
    height: 30,
  },
  container: {
    paddingBottom: 120,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 40,
    paddingVertical: 13,
  },
  sectionLine: {
    alignSelf: "center",
    height: 2,
    width: 80,
    borderWidth: 0.8,
    borderColor: colors.white,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  soap: {
    flexDirection: "column",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 25,
    marginHorizontal: 20,
    width: widths - 40,
    height: 93,
    backgroundColor: colors.tundora,
    paddingHorizontal: 18,
    marginBottom: 7,
  },
  electricity: {
    resizeMode: "contain",
    tintColor: colors.white,
    height: 26,
    width: 26,
  },
  text: {
    left: 15,
    textAlign: "center",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  bottom: {
    flexDirection: "row-reverse",
    paddingTop: 4,
  },
});
