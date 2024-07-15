import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    main: ViewStyle;
    value: TextStyle;
    tab: ViewStyle;
    progressbar: ImageStyle;
    coin: TextStyle;
    size: TextStyle;
    label: TextStyle;
    select: TextStyle;
    checkbox: ViewStyle;
}
export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
    },
    main: {
        width: widths,
        height: 100,
        marginStart: 5,
    },
    value: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 5,
    },
    tab: {
        width: '45%',
        height: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.white,
        justifyContent: 'center',
        marginEnd: 10,
        marginBottom: 10,
        marginTop: 5,
    },
    progressbar: {
        height: 6,
        width: undefined,
        marginHorizontal: 2,
        justifyContent: 'center',
    },
    coin: {
        flex: 2.2,
        alignItems: 'center',
    },
    size: {
        flex: 1.8,
    },
    label: {
        flex: 1,
        alignItems: 'center',
    },
    select: {
        flex: 1,
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 19,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.white,
    }
})