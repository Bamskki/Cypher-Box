import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    descption: TextStyle;
    alertText: TextStyle;
    info: TextStyle;
    login: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom:65
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop:10,
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    image: {
        width: 312,
        height: 97,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom:70,
    },
    descption: {
        fontFamily: 'Archivo-Medium',
        marginVertical: 30,
    },
    info: {
        fontSize: 18,
        fontFamily: 'Archivo-SemiBold',
        marginHorizontal: 25,
        marginBottom: 25
    },
    alertText: {
        fontSize: 14,
        fontFamily: 'Lato-Medium',
        color: colors.white,
        alignSelf:'flex-start'
    },
    login: {
        marginHorizontal:10
    }
})
