import { colors, widths } from "@Cypher/style-guide";
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
        justifyContent: 'space-between',
        margin: 10,
        width: widths - 80,
        shadowColor: colors.black.default,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    linearGradient: {
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
    }
})
