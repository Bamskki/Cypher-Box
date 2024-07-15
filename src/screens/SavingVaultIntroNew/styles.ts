import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    descption: TextStyle;
    title: TextStyle;
    button: ViewStyle;
    btnText: ViewStyle;
    linearGradient: ViewStyle;
    buttonText: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 65,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    descption: {
        marginVertical: 30,
        color: colors.white,
        lineHeight: 24,
    },
    title: {
    },
    button: {
        backgroundColor: colors.green,
        borderWidth: 0,
    },
    btnText: {
        fontFamily: 'Archivo-Bold',
        color: colors.white,
        fontSize: 16,
    },
    linearGradient: {
        // flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Archivo-Medium',
        textAlign: 'center',
        padding: 10,
        color: '#FFD00F',
    },
})
