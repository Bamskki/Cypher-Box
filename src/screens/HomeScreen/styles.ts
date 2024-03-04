import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface Style {
    container: ViewStyle;
    title: ViewStyle;
    inner: ViewStyle;
    imageView: ViewStyle;
    image: ImageStyle;
    arrow: ImageStyle;
    bottomtitle: TextStyle;
    buttonText: TextStyle;
    linearGradient: ViewStyle;
    icon: ViewStyle;
    titleText: TextStyle;
    bitcointext: TextStyle;
    price: TextStyle;
    middle: TextStyle;
    text: TextStyle;
    wrappedIcon: ViewStyle;
    headerTouch: ViewStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        paddingVertical: 60,
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inner: {
        backgroundColor: '#1e1e1e',
        flex: 1,
        borderRadius: 20,
        padding: 15,
        paddingHorizontal: 25
    },
    imageView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    linearGradient: {
        // marginHorizontal: 20,
        borderRadius: 25,
        height: 150,
        justifyContent: 'center',
        padding: 3,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
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
    titleText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'Lato-Bold'
    },
    image: {
        width: 25,
        height: 25
    },
    price: {
        color: '#FFFFFF',
        fontSize: 16
    },
    icon: {
        left: -7.5
    },
    middle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily:'Lato-Bold',
    },
    bitcointext: {
        fontSize: 16,
        color: '#FFF',
        marginEnd: 7,
        fontFamily:'Lato-Bold'
    },
    wrappedIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTouch: {
        height: 48,
        paddingVertical: 10,
    },
    arrow: {
        width: 50,
        height: 50,
        left: -10,
        top: 8
    }
})