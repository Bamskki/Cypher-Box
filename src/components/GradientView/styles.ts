import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Style {
    linearGradient: ViewStyle;
    shadow: any;
    innerShadow: any;
}

export default StyleSheet.create<Style>({
    linearGradient: {
        borderRadius: 25,
        height: 47,
        justifyContent: 'center',
        width: (widths / 2) - 60,
    },
    shadow: {
        shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.56,
        shadowColor: colors.pink.shadowTop,
        shadowRadius: 2,
        borderRadius: 25,
        width: (widths / 2) - 60,
        height: 47,
        justifyContent: 'center',
    },
    innerShadow: {
        shadowOffset: { width: -2, height: -2 },
        // shadowOpacity: 0.64,
        shadowColor: colors.pink.shadowBottom,
        shadowRadius: 2,
        borderRadius: 25,
        width: (widths / 2) - 60,
        height: 47,
        justifyContent: 'center',
        position: 'absolute',
    },
})