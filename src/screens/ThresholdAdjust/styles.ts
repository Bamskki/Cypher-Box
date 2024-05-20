import { colors, widths } from "@Cypher/style-guide";
import { StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    main: ViewStyle;
    invoiceButton: ViewStyle;
    text: ViewStyle;
    extra: ViewStyle;
    linearGradient2: ViewStyle;
    box: ViewStyle;
    top2: any;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingBottom: 40,
    },
    main: {
        flex: 1,
        paddingHorizontal: 35,
    },
    invoiceButton: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 30,
        marginTop: 20,
    },
    text: {

    },
    extra: {
        height: 10,
    },
    linearGradient2: {
        width: '80%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 5,
        alignSelf: 'center',
        marginBottom: 20,
    },
    box: {
        width: 5,
        height: 5,
        backgroundColor: colors.white,
        alignSelf: 'flex-end',
        marginEnd: 20,
    },
    top2: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: "#FFFFFF80",
        shadowRadius: 4,
        width: widths - 60,
        height: 5,
        justifyContent: 'center',
    },
})