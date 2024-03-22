import { colors, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    button: ViewStyle;
    buttonText: TextStyle;
    amount: TextStyle;
    priceView: ViewStyle;
    middleView: ViewStyle;
    middlebView: ViewStyle;
    main: ViewStyle;
    mainview: ViewStyle;
    linearStyle: ViewStyle;
    borderView: ViewStyle;
    sendView: ViewStyle;
    inDollar: TextStyle;
    text: TextStyle;
    placeholder: TextStyle;
    sats: TextStyle;
    current: ImageStyle;
    image: ImageStyle;
    border: ViewStyle;
}

export default StyleSheet.create<Style>({
    button: {
        alignSelf: 'center',
        marginTop: 40,
        paddingHorizontal: 10,
    },
    borderView: {
        // borderWidth: 4,
        // borderColor: '#DFD6D6BF',
        backgroundColor: colors.white,
        borderRadius: 8,
        // flex: 1,
        paddingHorizontal: 10,
        // marginEnd: 10
    },
    main: {
        height: 115,
    },
    mainview: {
        alignSelf: 'center',
        marginTop: 50,
        height: 115,
    },
    linearStyle: {
        borderRadius: 20,
        height: 115,
    },
    image: {
        width: 37,
        height: 34,
        marginEnd: 10
    },
    middleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 30,
        paddingLeft: 35
    },
    middlebView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    buttonText: {
        color: colors.pink.main,
    },
    sats: {
        // textShadowColor: colors.shadow50,
        // textShadowOffset: { width: 3, height: 5 },
        // textShadowRadius: 4,
        ...shadow.text25
    },
    placeholder: {
        fontSize: 45,
        fontFamily: 'Lato-Semibold',
        color: colors.white,
        alignSelf: 'center',
        lineHeight: 55,
        marginStart: 5,
    },
    amount: {
        fontSize: 45,
        fontFamily: 'Lato-Semibold',
        color: colors.white,
        minWidth: 40,
    },
    priceView: {
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 50,
    },
    inDollar: {
        alignSelf: 'center',
        marginTop: 10,
    },
    text: {
        position: 'absolute',
        marginStart: 20,
    },
    current: {
        position: 'absolute',
        top: -10,
        right: 10,
        width: 40,
        height: 40,
        zIndex: 1,
    },
    sendView: {
        alignSelf: 'center',
        width: '40%',
        marginTop: 25,
    },
    border: {
        flex: 1,
        backgroundColor: '#DFD6D640',
        padding: 3,
        borderRadius: 10,
        marginEnd: 20,
        shadowColor: colors.black.default,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
        borderColor: "transparent",
    },
})