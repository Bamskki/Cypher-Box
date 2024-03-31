import { ImageStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
    text: TextStyle;
    subtext: TextStyle;
    image: ImageStyle;
}

export default StyleSheet.create<Style>({
    text: {
        fontSize: 45,
        fontFamily: 'Lato-Semibold',
        lineHeight: 60,
        alignSelf: 'center',
        marginTop: 20
    },
    image: {
        width: 280,
        height: 300,
        marginVertical: 50,
        alignSelf: 'center'
    },
    subtext: {
        alignSelf: 'center',
        marginTop: 10,
    },
})