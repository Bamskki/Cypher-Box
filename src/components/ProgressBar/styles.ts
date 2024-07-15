import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Style {
    tab: ViewStyle;
    progressbar: ImageStyle;
}

export default StyleSheet.create<Style>({
    tab: {
        flex: 1,
        height: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.white,
        justifyContent: 'center',
        marginEnd: 10,
    },
    progressbar: {
        height: 6,
        width: undefined,
        marginHorizontal: 2,
        justifyContent: 'center',
    },
})