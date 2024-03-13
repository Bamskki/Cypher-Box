import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    title: ViewStyle;
    inner: ViewStyle;
    imageView: ViewStyle;
    image: ImageStyle;
    arrow: ImageStyle;
    linearGradient: ViewStyle;
    create: TextStyle;
    bitcointext: TextStyle;
    middle: TextStyle;
    text: TextStyle;
    login: TextStyle;
    view: ViewStyle;
    linearGradient2: ViewStyle;
    showLine: ViewStyle;
    check: TextStyle;
    sats: TextStyle;
    alert: TextStyle;
    blink: ImageStyle;
    btnView: ViewStyle;
    current: ImageStyle;
    bottomcard: ViewStyle;
    bottominner: ViewStyle;
    bitcoinimg: ImageStyle;
    row: ViewStyle;
    flex: ViewStyle;
    receiveView: ViewStyle;
    priceView: ViewStyle;
    alreadyView: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: 60,
        justifyContent: 'space-between',
        padding: 20,
    },
    flex: {
        flex: 1
    },
    priceView: {
        marginTop: 20,
    },
    alreadyView: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center'
    },
    receiveView: {
        flex: 1,
        marginEnd: 20,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        flex: 1,
        borderRadius: 25,
        padding: 15,
        marginEnd: -1.5,
        marginBottom: -1.5,
    },
    imageView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        borderRadius: 25,
        height: 150,
        justifyContent: 'center',
        padding: 1,
        marginTop: 20,
    },
    create: {
        marginStart: 5,
        textShadowColor: colors.shadow3,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10
    },
    image: {
        width: 25,
        height: 25
    },
    middle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    text: {
        fontSize: 18,
    },
    login: {
        fontSize: 18,
        color: colors.pink.default,
        marginStart: 5,
    },
    bitcointext: {
        marginEnd: 7,
    },
    arrow: {
        width: 50,
        height: 50,
        left: -10,
        top: 8
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        width: widths - 80,
        shadowColor: colors.black.default,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    linearGradient2: {
        marginTop: 20,
    },
    showLine: {
        borderWidth: 1,
        borderColor: colors.white,
        padding: 5,
        borderRadius: 5,
        marginBottom: 20,
        marginStart: 20,
        marginHorizontal: 20
    },
    blink: {
        width: 75,
        height: 20,
        marginTop: 10,
        marginEnd: 15,
    },
    check: {
        marginStart: 10,
    },
    sats: {
        marginStart: 20
    },
    alert: {
        color: colors.green,
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    current: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 40,
        height: 40,
        zIndex: 1,
    },
    bottomcard: {
        backgroundColor: colors.tundora,
        paddingHorizontal: 15,
        flex: 1,
        borderRadius: 25,
        padding: 15,
        marginEnd: -5,
        marginBottom: -5,
    },
    bottominner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bitcoinimg: {
        width: 35,
        height: 35
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})