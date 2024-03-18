import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    button: ViewStyle;
    buttonText: TextStyle;
    amount: TextStyle;
    priceView: ViewStyle;
    middleView: ViewStyle;
    main: ViewStyle;
    linearStyle: ViewStyle;
    borderView: ViewStyle;
    sendView: ViewStyle;
    inDollar: TextStyle;
    text: TextStyle;
    placeholder: TextStyle;
    sats: TextStyle;
    current: ImageStyle;
    image: ImageStyle;
}

export default StyleSheet.create<Style>({
    button: {
        alignSelf: 'center',
        marginTop: 40,
        paddingHorizontal: 10,
    },
    borderView: {
        borderWidth: 3,
        borderColor: colors.gray.line,
        borderRadius: 10,
        flex: 1,
        paddingHorizontal: 10,
        marginEnd: 10
    },
    main: {
        padding: 30,
    },
    linearStyle: {
        borderRadius: 20,
        height: 115,
    },
    image: {
        width: 37,
        height: 34,
        marginEnd: 10
    },
    middleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    buttonText: {
        color: colors.pink.main,
    },
    sats: {
        textShadowColor: colors.shadow50,
        textShadowOffset: { width: 3, height: 5 },
        textShadowRadius: 4,
    },
    placeholder: {
        fontSize: 45,
        fontFamily: 'Lato-Semibold',
        color: colors.white,
        alignSelf: 'center',
        lineHeight: 55,
        marginStart: 5,
    },
    amount: {
        fontSize: 45,
        fontFamily: 'Lato-Semibold',
        color: colors.white,
        minWidth: 40,
    },
    priceView: {
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 50,
    },
    inDollar: {
        alignSelf: 'center',
        marginTop: 10,
    },
    text: {
        position: 'absolute',
        marginStart: 20,
    },
    current: {
        position: 'absolute',
        top: -10,
        right: 10,
        width: 40,
        height: 40,
        zIndex: 1,
    },
    sendView: {
        alignSelf: 'center',
        width: '40%',
        marginTop: 25,
    },
})