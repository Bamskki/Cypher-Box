import { colors, widths, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    title: TextStyle;
    description: TextStyle;
    view: ViewStyle;
    linearGradient: ViewStyle;
    linearGradient2: ViewStyle;
    showLine: ViewStyle;
    check: TextStyle;
    sats: TextStyle;
    blink: ImageStyle;
    height: ViewStyle;
    top: ViewStyle;
    bottom: ViewStyle;
    text: TextStyle;
    top2: any;
    bottom2: any;
    box: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        padding: 20,
        paddingBottom: 65,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: 75,
        height: 20,
        marginTop: 5,
        marginEnd: 15,
    },
    title: {
        marginStart: 10,
    },
    description: {
        fontFamily: 'Archivo-Medium',
        marginTop: 30,
    },
    view: {
        flexDirection: 'row',
        padding: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    linearGradient: {
        marginTop: 50,
        height: 105,
        justifyContent: 'flex-start',
    },
    linearGradient2: {
        width: '80%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        height: 5,
        alignSelf: 'center',
        marginTop: 10,
    },
    showLine: {
        borderWidth: 1,
        borderColor: colors.white,
        padding: 3,
        borderRadius: 5,
        marginVertical: 10,
        marginStart: 50,
        marginHorizontal: 30
    },
    check: {
        marginStart: 10,
        ...shadow.text25,
    },
    sats: {
        marginStart: 25,
        ...shadow.text25,
    },
    blink: {
        width: 75,
        height: 20,
        marginTop: 10,
        marginEnd: 15,
    },
    height: {
        height: 105,
    },
    top: {
        justifyContent: 'flex-start',
        height: 105,
        shadowColor: colors.pink.shadowTop,
    },
    bottom: {
        justifyContent: 'flex-start',
        height: 105,
        shadowColor: colors.pink.shadowBottom,
    },
    text: {
        alignSelf: 'flex-end',
        marginEnd: 37.5,
    },
    top2: {
        shadowOffset: { width: 0, height: 3 },
        shadowColor: "#FFFFFF80",
        shadowRadius: 4,
        // borderRadius: 25,
        width: widths - 60,
        height: 5,
        justifyContent: 'center',
    },
    bottom2: {
        shadowOffset: { width: 0, height: -2 },
        shadowColor: "#00000040",
        shadowRadius: 4,
        // borderRadius: 25,
        width: widths - 60,
        height: 5,
        justifyContent: 'center',
    },
    box: {
        width: 5, 
        height: 5, 
        backgroundColor: colors.white,
        alignSelf: 'flex-end', 
        marginEnd: 20,
    }
})
