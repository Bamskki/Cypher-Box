import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    create: TextStyle;
    button: ViewStyle;
    text: TextStyle;
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
    create:{
        fontSize:18,
        fontFamily:'Archivo-SemiBold',
        lineHeight:24,
        alignSelf:'center',
        marginBottom: 15
    },
    button: {
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 25,
        height: 47,
    },
    text: {
        color: colors.pink.main,
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        textAlign: 'center'
    },
})
