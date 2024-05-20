import { colors } from "@Cypher/style-guide";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    error: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
    },
    error: {
        paddingHorizontal: 50,
        marginTop: 30,
        color: colors.yellow2,
    },
});
