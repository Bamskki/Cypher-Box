import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    maintitle: TextStyle;
    title: TextStyle;
    desc: TextStyle;
    description: TextStyle;
    view: ViewStyle;
    linearGradient: ViewStyle;
    showLine: ViewStyle;
    imageView: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: widths - 60,
        height: widths - 60,
        marginTop: 50,
    },
    maintitle: {
        fontSize: 24,
        color: colors.white,
        lineHeight: 30,
    },
    title: {
        marginTop: 30,
        paddingHorizontal:30,
    },
    desc: {
        fontSize: 14,
        fontFamily: 'Lato-Bold',
        color: colors.white,
        marginTop: 15,
        textShadowColor: colors.shadow25,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1
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
        flex: 1,
        margin: 10,
        paddingHorizontal: 10,
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
        marginEnd: 20
    },
    imageView: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        margin: 20,
        marginHorizontal: 40,
    },
})
