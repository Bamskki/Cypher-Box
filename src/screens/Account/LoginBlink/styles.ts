import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    alertText: TextStyle;
    or: TextStyle;
    line: ViewStyle;
    view: ViewStyle;
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
    },
    title: {
        marginTop: 30,
        marginBottom: -10,
    },
    alertText: {
        fontSize: 14,
        fontFamily: 'Lato-Medium',
        color: colors.white,
        alignSelf: 'flex-start'
    },
    or: {
        fontSize: 25,
        lineHeight: 35,
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
        alignItems: 'center'
    }
})
