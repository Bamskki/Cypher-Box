import { colors } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    view: ViewStyle;
    circle: ViewStyle;
    text: TextStyle;
}

export default StyleSheet.create<Style>({
    view: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginTop: 5,
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 10,
        backgroundColor: colors.white,
    },
    text: {
        marginStart: 10,
    },
})