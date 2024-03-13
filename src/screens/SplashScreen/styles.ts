import { colors } from "@Cypher/style-guide";
import { ImageStyle, Platform, StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    logoImage: ImageStyle;
    splash: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    logoImage: {
        width: 214,
        height: 181,
        alignSelf: 'center',
        marginBottom: Platform.OS === 'android' ? 7 : 0,
        marginStart: Platform.OS === 'android' ? 1 : 0,
    },
    splash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
})