import { colors, widths, shadow } from "@Cypher/style-guide";
import { StyleProp, ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    shadowView: StyleProp<ViewStyle>;
    shadowTop: any;
    shadowBottom: any;
    shadowViewBottom: StyleProp<ViewStyle>;
    shadowTopBottom: ViewStyleWithShadow | undefined;
    bottominner: StyleProp<ViewStyle>;
    row: StyleProp<ViewStyle>;
    bitcoinimg: StyleProp<ImageStyle>;
    container: ViewStyle;
    title: ViewStyle;
    linearGradient: ViewStyle;
    createView: ViewStyle;
    bitcointext: TextStyle;
    middle: TextStyle;
    text: TextStyle;
    login: TextStyle;
    alreadyView: ViewStyle;
    inputsContainer: ViewStyle;
    inputContainer: ViewStyle;
    inputStyle: ViewStyle;
    leftContainer: ViewStyle;
    column: ViewStyle;
    labelText: TextStyle;
    textInputStyle: ViewStyle;
    button: ViewStyle;
    btnText: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    bottominner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shadow: {
        ...shadow.text25,
    },
    shadowTop: {
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowColor: colors.white,
        shadowRadius: 2,
        borderRadius: 24,
        width: widths - 40,
        height: 128,
        backgroundColor: colors.primary,
        padding: 15,
        paddingHorizontal: 30,
    },
    shadowViewBottom: {
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.71,
        shadowColor: '#0C0C0C',
        shadowRadius: 12,
        elevation: 24,
        borderRadius: 25,
        width: widths - 40,
        height: 130,
        borderColor: "transparent",
        backgroundColor: colors.tundora,
        position: 'relative',
        marginTop: 20

    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20
    },
    column: {
        flexDirection: 'column',
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#23C47F',
        // paddingHorizontal: 15,
    },
    labelText: {
        width: 30,
        marginRight: 10,
        textAlign: 'auto',
    },
    textInputStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    button: {
        width: '100%',
        backgroundColor: colors.green,
        borderWidth: 0,
        marginHorizontal: 40,
    },
    btnText: {
        fontFamily: 'Archivo-Bold',
        color: colors.white,
        fontSize: 16,
    },
});
