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
        marginTop:5
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor:'#FFFFFF'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        marginStart: 10,
        fontWeight:'500'
    }
})