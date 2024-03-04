import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    title: ImageStyle;
    middle: ImageStyle;
    bottomtitle: TextStyle;
    buttonText: TextStyle;
    linearGradient: ViewStyle;
    logoImage: ImageStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingVertical: 60,
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 50
    },
    title: {
        marginVertical: 60,
        height: 150,
        width: undefined,
    },
    middle: {
        marginTop: 20,
        height: 113,
        width: 177,
        alignSelf:'center',
        // backgroundColor:'red'
    },
    linearGradient: {
        // backgroundColor: 'green',
        marginHorizontal: 20,
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'Lato-Semibold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
    bottomtitle: {
        color: '#FFFFFF',
        fontSize: 32,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40
    },
    logoImage: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    }
})