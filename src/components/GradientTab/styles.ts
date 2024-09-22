import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    main: ViewStyle;
    background: ViewStyle;
    linearGradientStroke: ViewStyle;
    linearGradient: ViewStyle;
    linearGradientInside: ViewStyle;
    linearStyle: ViewStyle;
    image: ImageStyle;
    image2: ImageStyle;
    textStyle: TextStyle;
    insideView: ViewStyle;
}

export default StyleSheet.create<Style>({
    main: {
        flexDirection: 'row',
    },
    background: {
        backgroundColor: colors.gray.dark,
        flex: 1,
        margin: 2,
        borderRadius: 25,
        paddingHorizontal: 3,
    },
    linearGradientStroke: {
        height: 64,
        marginVertical: 16,
        borderRadius: 25,
    },
    linearGradient: {
        height: 64,
        borderRadius: 25
    },
    linearGradientInside: {
        height: 54,
        width: 140,
        borderRadius: 25,
        marginTop: 3,
    },
    linearStyle: {
        height: 54,
        width: 140,
        borderRadius: 25,
    },
    image: {
        width: 17,
        height: 19,
        marginTop: 5,
    },
    image2: {
        width: 32,
        height: 32,
    },
    textStyle: {
        fontSize: 16,
    },
    insideView: {
        flex: 1,
        backgroundColor: colors.gray.dark,
        margin: 1,
        borderRadius: 25,
    }
})
