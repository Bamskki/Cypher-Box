import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    main: ViewStyle;
    container: ViewStyle;
    image: ImageStyle;
    card: ViewStyle;
    notification: ViewStyle;
    title: TextStyle;
    text: TextStyle;
    gradient: ViewStyle;
    gradientInner: ViewStyle;
    inner: ViewStyle;
    inside: ViewStyle;
    invoiceButton: ViewStyle;
    sats: ViewStyle;
    extra: ViewStyle;
    gradientText: TextStyle;
    bitcoin: ImageStyle;
    ringEffect: ViewStyle;
    effect: ImageStyle;
}

export default StyleSheet.create<Style>({
    main: {
        flex: 1,
        paddingHorizontal: 30,
        paddingBottom: 30,
        backgroundColor: colors.primary,
    },
    container: {
        flex: 1,
    },
    image: {
        width: 186,
        height: 224,
    },
    card: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginVertical: 50,
        shadowColor: '#00000070', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 2, //IOS
        elevation: 5, // Android
        backgroundColor: 'gainsboro',
    },
    notification: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'red',
    },
    text: {
        fontSize: 30,
        lineHeight: 40,
        marginTop: 20,
        marginBottom: 50,
    },
    gradient: {
        width: 224,
        height: 224,
        borderRadius: 112,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    gradientInner: {
        width: 170,
        height: 170,
        borderRadius: 85,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        width: 210,
        height: 210,
        borderRadius: 112,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inside: {
        width: 154,
        height: 154,
        borderRadius: 112,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    invoiceButton: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
    },
    sats: {
        fontSize: 45,
        lineHeight: 55,
        marginTop: 50,
    },
    extra: {
        height: 25,
    },
    title: {
        fontSize: 26,
        lineHeight: 32,
    },
    gradientText: {
        alignSelf: 'center',
        fontSize: 26,
        lineHeight: 30,
        marginTop: 10,
    },
    bitcoin: {
        width: 60,
        height: 60,
        marginTop: 60,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
    },
    ringEffect: {
        flex: 1,
        width: 250,
        height: 250,
        alignItems: "center",
        alignSelf: "center",
    },
    effect: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: -50,
    }
})
