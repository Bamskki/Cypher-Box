import { colors, widths, heights, shadow } from "@Cypher/style-guide";
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
    inputColumn: ViewStyle;
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
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputsContainer: {
        flexDirection: 'col',
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
        justifyContent: 'space-between',
        marginVertical: 3,
        flexWrap: 'wrap',
    },
    inputColumn:
    {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },

    inputStyle: {
        width: 120,
        height: 40,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#23C47F',
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
        fontSize: 16
    },
    button: {
        width: '100%',
        backgroundColor: colors.green,
        borderWidth: 0,
        marginHorizontal: 40,
        top: heights * 0.32
    },
    btnText: {
        fontFamily: 'Archivo-Bold',
        color: colors.white,
        fontSize: 14,
    },
});
