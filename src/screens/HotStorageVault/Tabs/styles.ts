import { colors, widths } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    main: ViewStyle;
    container: ViewStyle;
    inner: ViewStyle;
    icon: ImageStyle;
    text: TextStyle;
    coinos: ImageStyle;
    key: ImageStyle;
}

export default StyleSheet.create<Style>({
    main: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
    },
    inner: {
        borderWidth: 1,
        borderColor: colors.green,
        borderRadius: 10,
        width: widths / 4 - 35,
        height: widths / 4 - 45,
        marginTop: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 35,
        height: 35,
        tintColor: colors.gray.text,
    },
    text: {
        marginTop: 5,
        color: colors.gray.text,
    },
    coinos: {
        width: 50,
        height: 50,
        bottom: -4,
    },
    key: {
        width: 25,
        height: 25,
    },
});
