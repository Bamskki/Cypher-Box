import { colors } from "@Cypher/style-guide";
import { Dimensions, ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    alertText: TextStyle;
    or: TextStyle;
    line: ViewStyle;
    view: ViewStyle;
    textInput: TextStyle;
    space: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 65
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: 312,
        height: 97,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 70,
        // flex: 1
    },
    title: {
        // fontSize: 20,
        // fontFamily: 'Lato-SemiBold',
        marginTop: 80,
        // marginBottom: -10,
        // color: colors.white,
    },
    alertText: {
        fontSize: 14,
        fontFamily: 'Lato-Medium',
        color: colors.white,
        alignSelf: 'flex-start'
    },
    or: {
        fontSize: 25,
        fontFamily: 'Lato-SemiBold',
        color: colors.white,
        marginHorizontal: 10
    },
    line: {
        height: 5,
        flex: 1,
        backgroundColor: colors.white,
    },
    view: {
        flexDirection: 'row',
        width: 'auto',
        alignItems: 'center',
    },
    textInput: {
        fontFamily: 'Lato-SemiBold',
        fontSize: 20,
        color: colors.primary,
        backgroundColor: colors.white,
        width: '75%',
        borderRadius: 10,
        marginTop: 20,
        height:37,
        paddingHorizontal: 20,
    },
    space: {
        height: 15,
    },
})
