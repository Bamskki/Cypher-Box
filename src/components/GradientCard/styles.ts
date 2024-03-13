import { colors } from "@Cypher/style-guide";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    linearGradient: ViewStyle;
    shadow: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 65,
    },
    linearGradient: {
        borderRadius: 25,
        height: 150,
        justifyContent: 'space-between',
        padding: 3,
    },
    shadow:{
        shadowColor: colors.black.default,
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 15,
        borderColor: "transparent", // Required to show shadows on Android for some reason !?!?
    }
})
