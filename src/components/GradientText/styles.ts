import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    text: TextStyle;
}

export default StyleSheet.create<Style>({
    text: {
        fontSize: 18,
        fontFamily: 'Archivo-SemiBold',
    },
})