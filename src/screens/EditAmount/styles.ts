import { colors, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    priceView: ViewStyle;
    keyText: TextStyle;
    qrimage: ImageStyle;
    heigth: ViewStyle;
    main: ViewStyle;
    destination: TextStyle;
    senderText: TextStyle;
    label: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
    },
    priceView: {
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 16,
    },
    keyText: {
        fontSize: 24,
        lineHeight: 32,
        fontFamily: 'Lato-Medium',
    },
    qrimage: {
        width: 51,
        height: 51,
        position: 'absolute',
        right: 0,
    },
    heigth: {
        height: 84
    },
    main: {
        width: '70%',
        alignSelf: 'center',
        height: 84,
    },
    destination: {
        width: '64%',
        alignSelf: 'center',
        marginTop: 16,
    },
    senderText: {
        height: 78,
        fontSize: 20,
    },
    label: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
    },
})
