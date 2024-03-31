import { colors, widths, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    flex: ViewStyle;
    title: ViewStyle;
    loading: ViewStyle;
    priceView: ViewStyle;
    imageView: ViewStyle;
    imageViews: ViewStyle;
    image: ImageStyle;
    arrow: ImageStyle;
    linearGradient: ViewStyle;
    createView: ViewStyle;
    bitcointext: TextStyle;
    middle: TextStyle;
    text: TextStyle;
    login: TextStyle;
    view: ViewStyle;
    showLine: ViewStyle;
    check: TextStyle;
    sats: TextStyle;
    alert: TextStyle;
    blink: ImageStyle;
    btnView: ViewStyle;
    current: ImageStyle;
    bottominner: ViewStyle;
    bitcoinimg: ImageStyle;
    row: ViewStyle;
    alreadyView: ViewStyle;
    scan: ImageStyle;
    shadow: TextStyle;
    shadowTop: any;
    shadowBottom: any;
    shadowView: ViewStyle;
    shadowTopBottom: any;
    shadowBottomBottom: any;
    shadowViewBottom: ViewStyle;
    height: ViewStyle;
    top: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
        padding: 20,
    },
    flex: {
        flex: 1
    },
    loading: {
        marginTop: 20,
    },
    priceView: {
        marginTop: 20,
        paddingBottom: 60,
    },
    alreadyView: {
        flexDirection: 'row',
        marginTop: 10,
        alignSelf: 'center'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginEnd: 10,
    },
    imageViews: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        marginTop: 20,
        height: 132,
        justifyContent: 'flex-start',
    },
    createView: {
        marginTop: 20,
    },
    image: {
        width: 33,
        height: 33,
    },
    scan: {
        width: 51,
        height: 51,
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
        ...shadow.text25,
    },
    arrow: {
        width: 50,
        height: 50,
        left: -5,
        top: 10
    },
    view: {
        flexDirection: 'row',
        padding: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    showLine: {
        borderWidth: 1,
        borderColor: colors.white,
        padding: 5,
        borderRadius: 5,
        marginVertical: 10,
        marginStart: 25,
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
        ...shadow.text25,
    },
    sats: {
        marginStart: 25,
        ...shadow.text25,
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
        right: -5,
        width: 40,
        height: 40,
        zIndex: 1,
    },
    bottominner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    bitcoinimg: {
        width: 35,
        height: 35,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    shadow: {
        ...shadow.text25,
    },
    shadowTop: {
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowColor: "#F558C9",
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 151,
        backgroundColor: colors.primary,
        padding: 15,
        paddingHorizontal: 30,
    },
    shadowTopBottom: {
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowColor: "#FFFFFF",
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 151,
        backgroundColor: colors.tundora,
        padding: 15,
        paddingStart: 20,
        paddingEnd: 10,
    },
    shadowBottom: {
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 1,
        shadowColor: "#4F2844",
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 150,
        justifyContent: 'center',
        position: 'absolute',
    },
    shadowBottomBottom: {
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 1,
        shadowColor: "#242424",
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 150,
        justifyContent: 'center',
        position: 'absolute',
    },
    shadowView: {
        shadowOffset: { width: -8, height: -8 },
        shadowOpacity: 0.48,
        shadowColor: '#27272C',
        shadowRadius: 12,
        elevation: 24,
        borderRadius: 25,
        width: widths - 40,
        height: 151,
        marginTop: 20,
        borderColor: "transparent",
        backgroundColor: colors.white,
    },
    shadowViewBottom: {
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.71,
        shadowColor: '#0C0C0C',
        shadowRadius: 12,
        elevation: 24,
        borderRadius: 25,
        width: widths - 40,
        height: 151,
        marginTop: 20,
        borderColor: "transparent",
        backgroundColor: colors.tundora,
    },
    height: {
        height: 132
    },
    top: {
        height: 132,
        justifyContent: 'flex-start',
    }
})