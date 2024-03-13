import { colors } from "@Cypher/style-guide";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    innerView: ViewStyle;
    image: ImageStyle;
    descption: TextStyle;
    alertText: TextStyle;
    alertText2: TextStyle;
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
        // flex: 1
    },
    descption: {
        fontFamily: 'Archivo-Medium',
        marginVertical: 30,
    },
    alertText: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginStart: 16,
    },
    alertText2: {
        alignSelf: 'flex-start',
    }
})
