import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    desc: TextStyle;
    description: TextStyle;
    view: ViewStyle;
    linearGradient: ViewStyle;
    showLine: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 65,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        // paddingTop: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    title: {
        marginStart: 10,
        textShadowColor: colors.shadow25,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 10,
    },
    desc: {
        marginTop: 15,
        textShadowColor: colors.shadow25,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    description: {
        fontSize: 14,
        fontFamily: 'Archivo-Medium',
        lineHeight: 24,
        marginTop: 30,
        color: colors.white,
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex:1,
        margin: 10,
        paddingHorizontal:10,
        width: widths - 80,
        shadowColor: colors.black.default,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    linearGradient: {
        borderRadius: 25,
        height: 150,
        justifyContent: 'space-between',
        padding: 3,
        marginTop: 50,
    },
    showLine: {
        borderWidth: 1,
        borderColor: colors.white,
        padding: 5,
        borderRadius: 5,
        marginBottom: 20,
        marginStart: 50,
        marginEnd: 20,
    }
})
