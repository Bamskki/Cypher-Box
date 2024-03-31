import { colors } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    text: TextStyle;
    linearGradient: ViewStyle;
    buttonText: ViewStyle;
    shadow: ViewStyle;
    textShadow: ViewStyle;
    pureview: ViewStyle;
}

export default StyleSheet.create<Style>({
    text: {
        fontSize: 18,
        fontFamily: 'Archivo-SemiBold',
    },
    linearGradient: {
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Archivo-Bold',
    },
    shadow: {
        shadowColor: colors.black.default,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 8,
    },
    textShadow: {
        textShadowColor: colors.shadow25,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2
    },
    pureview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
})