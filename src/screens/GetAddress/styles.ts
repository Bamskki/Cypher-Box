import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    text: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    create: TextStyle;
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
    bitcoinimg: ImageStyle;
    height: ViewStyle;
    new: TextStyle;
    img: ImageStyle;
    current: ImageStyle;
    bitcointxt: ViewStyle;
    topup: ViewStyle;
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
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 25,
        height: 47,
    },
    buttonText: {
        color: colors.pink.main,
        fontSize: 16,
        fontFamily: 'Lato-Bold',
    },
    create: {
        color: colors.pink.main,
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        flex: 1,
        textAlign: 'center'
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 10,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
    line: {
        height: 2,
        width: 15,
        backgroundColor: colors.white,
        marginHorizontal: 2
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
        color: '#8C8C8C',
        fontFamily: 'Lato-Bold',
        fontSize: 18,
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
        marginTop: 10
    },
    inner: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    bitcoinimg: {
        width: 55,
        height: 55,
        alignSelf: 'center',
        marginTop: 5
    },
    height: {
        height: 47,
    },
    new: {
        fontSize: 18,
    },
    img: {
        position: 'absolute',
        width: 28,
        height: 22,
        right: 20
    },
    current: {
        position: 'absolute',
        right: 0,
        width: 40,
        height: 40,
        zIndex: 1,
    },
    bitcointxt: {
        alignSelf: 'center',
        paddingHorizontal: 50,
    },
    topup: {
        paddingHorizontal: 25,
        marginTop: 5,
        marginBottom: 20
    },
})