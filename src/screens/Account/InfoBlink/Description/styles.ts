import { colors } from "@Cypher/style-guide";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    view: ViewStyle;
    circle: ViewStyle;
    text: TextStyle;
}

export default StyleSheet.create<Style>({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:'flex-start',
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop:4,
        backgroundColor:colors.white,
    },
    text: {
        alignSelf:'flex-start',
        marginStart: 10,
    },
})