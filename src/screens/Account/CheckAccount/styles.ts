import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    descption: TextStyle;
    alertText: TextStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom:65,
    },
    innerView: {
        flex: 1,
        paddingBottom: 40,
        paddingTop:10,
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom:50,
    },
    descption: {
        fontFamily: 'Archivo-Medium',
        marginVertical: 30,
        color: colors.white,
    },
    alertText: {
        color: colors.yellow,
    }
})
