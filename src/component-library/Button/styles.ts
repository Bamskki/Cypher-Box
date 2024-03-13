import { colors } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    text: TextStyle;
    linearGradient: ViewStyle;
    buttonText: ViewStyle;
    leftIcon: ViewStyle;
    button: ViewStyle;
    row: ViewStyle;
}

export default StyleSheet.create<Style>({
    text: {
        fontSize: 16,
        fontFamily: 'Archivo-Bold',
    },
    linearGradient: {
        backgroundColor: colors.white,
        marginHorizontal: 5,
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Archivo-Bold',
        textAlign: 'center',
    },
    leftIcon: {
        width: 25,
        height: 25,
        justifyContent: 'center',
    },
    button: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor:colors.white,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems:'center'
    },
})