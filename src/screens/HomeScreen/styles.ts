import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle;
    title: ViewStyle;
    inner: ViewStyle;
    imageView: ViewStyle;
    image: ImageStyle;
    settingsImage: ImageStyle;
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
    btn: ViewStyle;
    shadowStyle: ViewStyle;
    outerShadowStyle: ViewStyle;
    greenText: TextStyle;
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
        alignItems: 'center',
    },
    inner: {
        backgroundColor: '#1e1e1e',
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 20,
        paddingHorizontal: 25,
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
        fontFamily: 'Lato',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '700',
        color: '#FFFFFF',
    },
    greenText: {
        fontFamily: 'Lato',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        color: '#23C47F',
    },
    bottomtitle: {
        color: '#FFFFFF',
        fontSize: 32,
        fontStyle: 'italic',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        fontWeight: '700'
    },
    image: {
        width: 51,
        height: 51,

    },
    settingsImage: {
        width: 30,
        height: 30,
        marginEnd: 30,
        marginTop: 10
    },
    price: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    icon: {
        left: -7.5,
    },
    middle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Lato-Bold',
    },
    bitcointext: {
        fontSize: 16,
        color: '#FFF',
        marginEnd: 7,
        fontFamily: 'Lato-Bold',
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
        top: 8,
    },
    btn: {
        borderRadius: 24,
        paddingHorizontal: 35,
        padding: 12,
    },
    shadowStyle: {
        // For Android
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        // For iOS
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    innerShadowStyle: {
        // Inner shadow
        shadowColor: 'rgba(39, 39, 44, 0.56)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        // Inner shadow inset
        shadowOffset: {
            width: -2,
            height: -2,
        },
        shadowOpacity: 0.64,
        shadowRadius: 2,
    },
    outerShadowStyle: {
        // Outer shadow
        shadowColor: 'rgba(4, 4, 4, 0.80)',
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
    },
    innerShadowStyle: {
        shadowColor: 'rgba(39, 39, 44, 0.56)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOffset: {
            width: -2,
            height: -2,
        },
        shadowOpacity: 0.64,
        shadowRadius: 2,
    },
    outerShadowStyle: {
        shadowColor: 'rgba(4, 4, 4, 0.80)',
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
    },
});
