import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    descption: TextStyle;
    title: TextStyle;
    button: ViewStyle;
    btnText: ViewStyle;
    createAccount: ViewStyle;
    text: TextStyle;
    login: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
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
        fontFamily: 'Archivo-SemiBold',
        color: colors.white,
        margin: 15,
        fontSize: 18,
    },
    title: {
        color: colors.pink.light,
        fontFamily: 'Archivo-SemiBold',
        fontSize: 18,
    },
    createAccount: {
        flexDirection: 'column',
        marginTop: 10,
        alignSelf: 'center'
    },
    text: {
        fontSize: 18,
        textAlign: 'center'
    },
    login: {
        fontSize: 18,
        color: colors.pink.light,
        textAlign: 'center',
        marginStart: 5,

    },
    button: {
        backgroundColor: colors.pink.light,
        borderWidth: 0,
        marginHorizontal: 20,
    },
    btnText: {
        fontFamily: 'Archivo-Bold',
        color: colors.white,
        fontSize: 16,
    },
})
