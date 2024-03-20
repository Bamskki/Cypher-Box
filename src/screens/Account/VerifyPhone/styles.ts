import { colors } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    title: TextStyle;
    textInput: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 65,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    title: {
        marginTop: 10,
    },
    textInput: {
        fontFamily: 'Lato-SemiBold',
        fontSize: 20,
        color: colors.primary,
        backgroundColor: colors.white,
        width: '50%',
        borderRadius: 10,
        marginTop: 40,
        height:37,
        paddingHorizontal: 20,
        textAlign:'center'
    },
})
