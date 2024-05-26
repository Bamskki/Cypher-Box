import { colors } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    main: ViewStyle;
    sats: ViewStyle;
    valueView: ViewStyle;
    bottomView: ViewStyle;
    button: ViewStyle;
    text: TextStyle;
}

export default StyleSheet.create<Style>({
    main: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    sats: {
        fontSize: 45,
        lineHeight: 60,
    },
    valueView: {
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottomView: {
        alignItems: 'center',
        marginBottom: 25,
        // borderTopWidth: 2,
        borderTopColor: '#333333',
        padding: 30,
        // position: 'absolute',
        // bottom: 0,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: colors.black.default,
        borderRadius: 20,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.gray.light
    },
    text: {
        fontSize: 18,
    }
})
