import { StyleSheet, TextStyle } from "react-native";

interface Style {
    text: TextStyle;
    title: TextStyle;
}

export default StyleSheet.create<Style>({
    text: {
        fontSize: 18,
        fontFamily: 'Archivo-SemiBold',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Archivo-SemiBold',
        opacity: 0,
    },
})