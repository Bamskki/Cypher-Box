import { ImageStyle, StyleSheet, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    logoImage: ImageStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#1e1e1e'
    },
    logoImage: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    }
})