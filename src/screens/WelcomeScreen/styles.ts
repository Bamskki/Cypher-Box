import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    title: ImageStyle;
    middle: ImageStyle;
    start: ImageStyle;
    inner: ViewStyle;
    logoImage: ImageStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: 60,
        justifyContent: 'space-between',
        paddingBottom: 50
    },
    title: {
        height: 150,
        width: undefined,
    },
    middle: {
        height: 113,
        width: 177,
        alignSelf: 'center',
    },
    logoImage: {
        width: 214,
        height: 181,
        alignSelf: 'center',
    },
    inner: {
        flex: 1,
        marginBottom: 0,
        justifyContent: 'space-evenly',
    },
    start: {
        width: 225,
        height: 67,
        alignSelf: 'center'
    }
})