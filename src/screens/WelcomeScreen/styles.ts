import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    title: TextStyle;
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
        paddingBottom: 100
    },
    title: {
        color: '#FFFFFF',
        fontSize: 45,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40
    },
    linearGradient: {
        // backgroundColor: 'green',
        marginHorizontal: 20,
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight:'bold'
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