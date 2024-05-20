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
        borderRadius: 20,
        height: 60, 
    },
    shadow:{
        shadowColor: colors.black.default,
        // shadowOffset: { width: 5, height: 10 },
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 8,
        borderColor: "transparent", // Required to show shadows on Android for some reason !?!?
        height: 60, 
        borderRadius: 20,
        // width: '100%'
    }
})
