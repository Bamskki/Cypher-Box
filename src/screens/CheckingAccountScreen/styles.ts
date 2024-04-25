import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
  container: ViewStyle;
  innerView: ViewStyle;
  bottomView: ViewStyle;
  coinOsImage: ImageStyle;
  tabView: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  gradient: ViewStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  innerView: {
    paddingBottom: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    height: 135,
    borderBottomWidth: 2,
    borderColor: colors.black.border,
  },
  bottomView: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 1,
    paddingVertical: 40,
    borderTopWidth: 2,
    borderTopColor: colors.gray.border,
  },
  coinOsImage: {
    alignSelf: "center",
    resizeMode: "cover",
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
    marginTop: 20,
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
    paddingVertical: 14,
  },
});
