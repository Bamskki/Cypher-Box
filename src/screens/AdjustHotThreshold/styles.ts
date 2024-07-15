import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    title: TextStyle;
    button: ViewStyle;
    btnText: ViewStyle;
    warn: TextStyle;
    desc: TextStyle;
    coinslot: TextStyle;
    dropdown: ViewStyle;
    coinslotView: ViewStyle;
    textCoinSlot: TextStyle;
    tabs: ViewStyle;
    tab: ViewStyle;
    progressbar: ImageStyle;
    dropdownScroll: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 65,
    },
    innerView: {
        flex: 1,
        // paddingBottom: 40,
        // paddingTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
    },
    button: {
        backgroundColor: colors.green,
        borderWidth: 0,
    },
    btnText: {
        fontFamily: 'Archivo-Bold',
        color: colors.white,
        fontSize: 16,
    },
    warn: {
        color: colors.greenText,
        marginBottom: 20,
    },
    desc: {
        fontFamily: 'Lato-Medium',
        marginTop: 20,
    },
    coinslot: {
        color: colors.whiteText,
        marginStart: 10
    },
    dropdown: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    coinslotView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 10,
    },
    textCoinSlot: {
        color: colors.primary,
        marginStart: 5,
    },
    tabs: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 30,
    },
    tab: {
        flex: 1,
        borderRadius: 2.5,
        borderWidth: 1,
        borderColor: colors.white,
        height: 10,
        marginBottom: 5,
        marginEnd: 10,
        justifyContent: 'center',
    },
    progressbar: {
        height: 6,
        width: undefined,
        marginHorizontal: 2,
        justifyContent: 'center',
    },
    dropdownScroll: {
        flexDirection: 'row',
        alignSelf: 'center',
        // alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4,
        width: 50,
        height: 150,
        bottom: 0,
        position: 'absolute',
    }
})
