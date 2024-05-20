import { colors, widths, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    container2: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    desc: TextStyle;
    view: ViewStyle;
    height: ViewStyle;
    background: ViewStyle;
    extra: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 65,
    },
    container2: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        // paddingTop: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    title: {
        marginStart: 10,
        ...shadow.text25
    },
    desc: {
        marginTop: 15,
        ...shadow.text25
    },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        margin: 10,
        paddingStart: 10,
        width: widths - 80,
    },
    height: {
        height: 132,
    },
    background: {
        backgroundColor: colors.gray.dark,
        flex: 1,
        margin: 3,
        borderRadius: 17.5
    },
    extra: {
        height: 20,
    }
})
