import { shadow } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    priceView: ViewStyle;
    lGradient: ViewStyle;
    inDollar: TextStyle;
    dollar: TextStyle;
    btc: TextStyle;
    input: TextStyle;
    card: ViewStyle;
    amount: ViewStyle;
    feesView: ViewStyle;
    sats: TextStyle;
    netfee: TextStyle;
    tips: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
    },
    priceView: {
        justifyContent: 'center',
        paddingTop: 30,
        // marginTop: 30,
    },
    lGradient: {
        height: 84,
    },
    inDollar: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 20,
        lineHeight: 30,
    },
    dollar: {
        lineHeight: 60,
        position: 'absolute',
        paddingTop: 30,
        fontSize: 25,
        right: 20,
    },
    btc: {
        lineHeight: 60,
        position: 'absolute',
        paddingTop: 30,
        fontSize: 50,
        right: 25,
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
        flex: 1,
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    sats: {
        fontSize: 25,
        lineHeight: 36,
    },
    netfee: {
        fontSize: 18,
        marginTop: 10,
        lineHeight: 24,
    },
    tips: {
        marginHorizontal: 25,
        fontSize: 15,
        marginBottom: 10,
    }
})
