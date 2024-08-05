



import { colors, widths, shadow, heights } from "@Cypher/style-guide";
import { StyleProp, ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    shadowView: StyleProp<ViewStyle>;
    shadowTop: any;
    view: StyleProp<ViewStyle>;
    check: TextStyle | undefined;
    blink: StyleProp<ImageStyle>;
    showLine: StyleProp<ViewStyle>;
    box: ViewStyle | Falsy | RegisteredStyle<ViewStyle> | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>> | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
    linearGradient2: ViewStyle | Falsy | RegisteredStyle<ViewStyle> | RecursiveArray<ViewStyle | Falsy | RegisteredStyle<ViewStyle>> | readonly (ViewStyle | Falsy | RegisteredStyle<ViewStyle>)[];
    shadowBottom: any;
    shadowViewBottom: StyleProp<ViewStyle>;
    shadowTopBottom: ViewStyleWithShadow | undefined;
    bottominner: StyleProp<ViewStyle>;
    row: StyleProp<ViewStyle>;
    bitcoinimg: StyleProp<ImageStyle>;
    container: ViewStyle;
    title: ViewStyle;
    linearGradient: ViewStyle;
    createView: ViewStyle;
    bitcointext: TextStyle;
    middle: TextStyle;
    text: TextStyle;
    login: TextStyle;
    alreadyView: ViewStyle;
    progress: ViewStyle;
    arrowConnector: ViewStyle;
    bottomBtn: ViewStyle;
    utxoCapsule: ViewStyle;
    textContainer: ViewStyle;
    nextButton: ViewStyle;
    textStyle: TextStyle;
    progressBarIndicator: ImageStyle;
    arrowContainer: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
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

    linearGradient: {
        marginTop: 20,
        height: 132,
        justifyContent: 'flex-start',
    },
    createView: {
        marginTop: 20,
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
    view: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    blink: {
        marginTop: 10
    },
    showLine: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#5F5F5F',
        height: 5,
        borderRadius: 5,
        // marginVertical: 10,

    },
    linearGradient2: {
        width: '100%',
        borderRadius: 5,
        height: 5,
        alignSelf: 'flex-start',

        // marginVertical: 10,
        zIndex: 99
    },
    bottominner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    bitcoinimg: {
        width: 35,
        height: 35,
        transform: [{ rotate: '30deg' }]
    },
    row: {
        flexDirection: 'row',
        // alignItems: 'center',
    },

    shadow: {
        ...shadow.text25,
    },
    shadowTop: {
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowColor: colors.white,
        shadowRadius: 2,
        borderRadius: 24,
        width: widths - 40,
        height: 128,
        backgroundColor: colors.primary,
        padding: 15,
        paddingHorizontal: 30,
    },
    shadow10: {
        width: widths,
        height: heights / 2 + 80,
        backgroundColor: colors.black.dark,

    },
    shadowTopBottom: {
        borderRadius: 25,
        width: widths - 40,
        height: 113,
        backgroundColor: colors.tundora,
        padding: 15,
        paddingStart: 20,
        paddingEnd: 10,
    },
    shadowBottom: {
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 1,
        shadowColor: '#DBDBDB',
        shadowRadius: 2,
        borderRadius: 25,
        width: widths - 40,
        height: 128,
        justifyContent: 'center',
        position: 'absolute',
    },
    shadow11: {
        shadowOffset: { width: -3, height: -4 },
        shadowOpacity: 0.25,
        shadowColor: '#484848',
        shadowRadius: 16,
        borderRadius: 15,
        width: widths,
        height: heights / 2,
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
        height: 113,
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
        height: 128,
        marginTop: 15,
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
        height: 130,
        marginTop: 10,
        borderColor: "transparent",
        backgroundColor: colors.tundora,
        position: 'relative',
        top: heights * 0.102,
    },
    arrowContainer: {
        right: 18,
        bottom: heights * 0.187,
    },
    arrowConnector: {
        top: -12
    },
    progress: {
        marginBottom: 20
    },
    utxoCapsule: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: -20
    },
    textContainer: {
        position: 'relative',
        bottom: 100,
        marginHorizontal: 10
    },
    nextButton: {
        width: '100%',
        borderRadius: 5,
        paddingVertical: 10,
    },
    textStyle: {
        textAlign: 'center'
    },
    progressBarIndicator: {
        top: -8,
        width: '60%',
        height: 10,
        left: 130,
        position: 'relative'
    }
});
