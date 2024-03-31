import { widths } from "@Cypher/style-guide";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
    linearGradient: ViewStyle;
    shadow: any;
    innerShadow: any;
    pureview: ViewStyle;
}

export default StyleSheet.create<Style>({
    linearGradient: {
        borderRadius: 25,
        height: 47,
        justifyContent: 'center',
        width: (widths / 2) - 60,
    },
    shadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.56,
        shadowColor: "#27272C",
        shadowRadius: 2,
        borderRadius: 25,
        width: (widths / 2) - 60,
        height: 47,
        justifyContent: 'center',
    },
    innerShadow: {
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.64,
        shadowColor: "#040404",
        shadowRadius: 2,
        borderRadius: 25,
        width: (widths / 2) - 60,
        height: 47,
        justifyContent: 'center',
        position: 'absolute',
    },
    pureview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
})