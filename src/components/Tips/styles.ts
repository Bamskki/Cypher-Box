import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    descption: TextStyle;
    title: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        marginTop: 20,
    },
    descption: {
        fontFamily: 'Archivo-Regular',
        fontSize: 14,
        lineHeight: 24,
    },
    title: {
        fontFamily: 'Archivo-Bold',
        fontSize: 14,
        lineHeight: 24,
        marginStart: 20,
    },
})
