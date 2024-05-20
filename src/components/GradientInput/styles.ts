import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    priceView: ViewStyle;
    lGradient: ViewStyle;
    inDollar: TextStyle;
    text: TextStyle;
    input: TextStyle;
    card: ViewStyle;
}

export default StyleSheet.create<Style>({
    priceView: {
        justifyContent: 'center',
        marginTop: 30,
    },
    lGradient: {
        height: 84,
    },
    inDollar: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 25,
        lineHeight: 30,
    },
    text: {
        lineHeight: 60,
        position: 'absolute',
    },
    input: {
        height: 78,
        fontSize: 48,
    },
    card: {
        width: '60%',
        alignSelf: 'center',
        height: 84,
    },
})
