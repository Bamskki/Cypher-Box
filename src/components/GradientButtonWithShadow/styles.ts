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
        height: 50,
        justifyContent: 'center',
        width: (widths / 2) - 50,
    },
    shadow: {
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.56,
        shadowColor: "#27272C",
        shadowRadius: 2,
        borderRadius: 25,
        width: (widths / 2) - 50,
        height: 50,
        justifyContent: 'center',
    },
    innerShadow: {
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.64,
        shadowColor: "#040404",
        shadowRadius: 2,
        borderRadius: 25,
        width: (widths / 2) - 50,
        height: 50,
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