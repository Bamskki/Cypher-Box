import { colors, widths, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    description: TextStyle;
    view: ViewStyle;
    linearGradient: ViewStyle;
    showLine: ViewStyle;
    check: TextStyle;
    sats: TextStyle;
    blink: ImageStyle;
    height: ViewStyle;
    top: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 65,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: 75,
        height: 20,
        marginTop: 5,
        marginEnd: 15,
    },
    title: {
        marginStart: 10,
    },
    description: {
        fontFamily: 'Archivo-Medium',
        marginTop: 30,
    },
    view: {
        flexDirection: 'row',
        padding: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    linearGradient: {
        marginTop: 50,
        height: 102,
        justifyContent: 'flex-start',
    },
    showLine: {
        borderWidth: 1,
        borderColor: colors.white,
        padding: 3,
        borderRadius: 5,
        marginVertical: 10,
        marginStart: 50,
        marginHorizontal: 30
    },
    check: {
        marginStart: 10,
        ...shadow.text25,
    },
    sats: {
        marginStart: 25,
        ...shadow.text25,
    },
    blink: {
        width: 75,
        height: 20,
        marginTop: 10,
        marginEnd: 15,
    },
    height: {
        height: 102,
    },
    top:{
        justifyContent: 'flex-start',
        height: 102,
    }
})
