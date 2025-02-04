import { colors, widths } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    button: ViewStyle;
    buttonText: ViewStyle;
    viewStyle: ViewStyle;
    hideView: ViewStyle;
    title: TextStyle;
    detail: TextStyle;
    viewBtn: TextStyle;
    centerView: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        borderColor: colors.gray.disable,
        borderWidth: 1,
        width: 300,
        height: 300,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 10,
    },
    button: {
        width: widths * 30 / 100,
        height: 30,
        margin: '2.5%',
        borderColor: colors.green,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Archivo-Bold',
    },
    viewStyle: {
        backgroundColor: colors.black.light,
        width: 102,
        height: 56,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
    hideView: {
        position: 'absolute',
        width: 300,
        height: 300,
        // flex: 1,
        // backgroundColor: '#222531',
        // opacity: 0.95,
        borderWidth: 1,
        borderColor: colors.gray.disable,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Archivo-Bold',
        fontSize: 14,
    },
    detail: {
        fontFamily: 'Archivo-Regular',
        fontSize: 12,
        marginTop: 15,
    },
    viewBtn: {
        fontFamily: 'Archivo-Bold',
        marginStart: 5,
    },
    centerView: {
        justifyContent: 'center',
    },
})
