import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    text: TextStyle;
    textInput: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flexDirection: 'row',
        alignSelf:'flex-start',
        alignItems: 'center',
        marginVertical:50,
    },
    text: {
        width: 90
    },
    textInput: {
        fontFamily: 'Lato-SemiBold',
        fontSize: 16,
        color: colors.primary,
        backgroundColor: colors.white,
        flex: 1,
        borderRadius: 10,
        height: 37,
        marginStart: 20,
        paddingHorizontal: 20
    }
})
