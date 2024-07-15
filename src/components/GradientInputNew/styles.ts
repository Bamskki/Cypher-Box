import { shadow } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    priceView: ViewStyle;
    lGradient: ViewStyle;
    inDollar: TextStyle;
    text: TextStyle;
    input: TextStyle;
    card: ViewStyle;
    amount: ViewStyle;
    feesView: ViewStyle;
    sats: TextStyle;
}

export default StyleSheet.create<Style>({
    priceView: {
        justifyContent: 'center',
        paddingTop: 30,
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
    amount: {
        fontSize: 20,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        top: 0,
        ...shadow.text25
    },
    feesView: {
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
    },
    sats: {
        fontSize: 25,
        lineHeight: 36,
    }
})
