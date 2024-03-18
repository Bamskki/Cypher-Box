import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    text: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    orView: ViewStyle;
    inputView: ViewStyle;
    line: ViewStyle;
    or: TextStyle;
    cannottext: TextStyle;
    input: TextStyle;
    desc: TextStyle;
    bottomText: TextStyle;
    number: TextStyle;
    code: ViewStyle;
    inner: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    text: {
        fontSize: 45,
        fontFamily: 'Lato-Semibold',
        lineHeight: 60,
        alignSelf: 'center',
        marginTop: 20,
    },
    number: {
        fontSize: 20,
        fontFamily: 'Lato-Semibold',
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom:20,
        paddingHorizontal: 25,
        height: 43,
    },
    buttonText: {
        color: colors.pink.main,
        fontSize: 16,
        fontFamily: 'Lato-Bold',
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop:15,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
    line: {
        height: 2,
        width: 25,
        backgroundColor: colors.white
    },
    or: {
        marginStart: 10,
        marginEnd: 10
    },
    cannottext: {
        marginBottom: 20,
        // marginTop:10,
        alignSelf: 'center'
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 5,
        width: '35%',
        height: 30,
        marginEnd: 20,
        textAlign: 'center',
        color: colors.gray.text
    },
    desc: {
        textAlign: 'center',
        // marginBottom: 20
    },
    bottomText: {
        paddingHorizontal: 25,
        marginBottom: 10
    },
    code: {
        height: 68,
        marginTop:10
    },
    inner: {
        flex: 1,
        justifyContent: 'space-evenly',
    }
})