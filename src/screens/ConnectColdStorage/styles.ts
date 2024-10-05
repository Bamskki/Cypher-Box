import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    button: ViewStyle;
    pasteview: ViewStyle;
    qrcode: ImageStyle;
    importBtn: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: colors.gray.dark,
        borderRadius: 15,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#B6B6B6',
        flex: 1,
        marginEnd: 10,
    },
    pasteview: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    qrcode: {
        width: 40,
        height: 40,
    },
    importBtn: {
        backgroundColor: colors.blueText,
        height: 47,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        marginTop: 100
    },

})
