import { colors, shadow } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    button: ViewStyle;
    buttonText: TextStyle;
    amount: TextStyle;
    priceView: ViewStyle;
    inDollar: TextStyle;
    text: TextStyle;
    text2: TextStyle;
    height: ViewStyle;
    new: TextStyle;
    img: ImageStyle;
    shareImg: ImageStyle;
}

export default StyleSheet.create<Style>({
    button: {
        alignSelf: 'center',
        marginTop: 40,
        paddingHorizontal:30,
        height: 43,
        ...shadow.shadow25
    },
    buttonText: {
        color: colors.pink.main
    },
    amount: {
        fontSize: 45,
        width: '15%',
        fontFamily: 'Lato-Semibold',
        color: colors.white,
        alignSelf: 'center'
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        marginTop: 50
    },
    inDollar: {
        alignSelf: 'center',
        marginTop:10,
    },
    text: {
        // position: 'absolute',
        marginStart: 20
    },
    text2: {
        padding: 10,
        paddingTop: 50,
        marginBottom: 10,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    height: {
        height: 47,
        borderWidth: 2,
        borderColor: colors.pink.main,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginHorizontal: 20,
    },
    new: {
        fontSize: 18,
    },
    img: {
        position: 'absolute',
        width: 28,
        height: 22,
        right: 20
    },
    shareImg: {
        alignSelf: 'center',
        marginTop:20,
        width: 40,
        height: 40
    }
})