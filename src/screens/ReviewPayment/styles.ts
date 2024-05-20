import { colors, shadow, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    topView: ViewStyle;
    text: TextStyle;
    linearGradient: ViewStyle;
    linearGradient2: ViewStyle;
    container: ViewStyle;
    invoiceButton: ViewStyle;
    heigth: ViewStyle;
    heigth2: TextStyle;
    main: ViewStyle;
    alert: TextStyle;
    view: ViewStyle;
    check: TextStyle;
    blink: ImageStyle;
    box: ViewStyle;
    top2: any;
    height: ViewStyle;
    top: ViewStyle;
    bottom: ViewStyle;
    sats: ViewStyle;
    middle: ViewStyle;
    price: TextStyle;
}

export default StyleSheet.create<Style>({
    topView:{
        flex: 1,
    },
    text: {
        alignSelf: 'flex-end',
        marginEnd: 37.5,
        bottom: 5
    },
    linearGradient: {
        marginTop: 30,
        height: 132,
        justifyContent: 'flex-start',
        alignSelf: 'center'
    },
    linearGradient2: {
        width: '80%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 5,
        alignSelf: 'center',
    },
    container: {
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    invoiceButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    heigth: {
        // height: 84
    },
    heigth2: {
        fontSize: 14,
    },
    main: {
        width: '50%',
        // alignSelf: 'center',
        marginHorizontal: 30,
        marginTop: 20,
    },
    alert: {
        marginBottom: 10
    },
    view: {
        flexDirection: 'row',
        padding: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    check: {
        marginStart: 10,
        ...shadow.text25,
    },
    blink: {
        width: 75,
        height: 20,
        marginTop: 10,
        marginEnd: 15,
    },
    box: {
        width: 5,
        height: 5,
        backgroundColor: colors.white,
        alignSelf: 'flex-end',
        marginEnd: 20,
    },
    top2: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: "#FFFFFF80",
        shadowRadius: 4,
        width: widths - 60,
        height: 5,
        justifyContent: 'center',
    },
    height: {
        height: 132,
    },
    top: {
        justifyContent: 'flex-start',
        height: 132,
        shadowColor: colors.pink.shadowTop,
    },
    bottom: {
        justifyContent: 'flex-start',
        height: 132,
        shadowColor: colors.pink.shadowBottom,
    },
    sats: {
        flexDirection: 'row',
        alignItems:'flex-end',
        top: 10,
        marginHorizontal: 30,
    },
    middle: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    price: {
        color: colors.pink.dark,
    }
})
