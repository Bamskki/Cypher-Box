import { ImageStyle, StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';

interface Style {
    [x: string]: StyleProp<ImageStyle>;
    container: ViewStyle;
    textStyle: TextStyle;
    title: TextStyle;
    arrow: ImageStyle;
}

export default StyleSheet.create<Style>({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        justifyContent: 'space-between',
        padding: 20,
    },
    textStyle: {
        fontFamily: 'Archivo',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 24,
        color: '#FFFFFF',
        marginVertical: 10,
    },
    title: {
        fontFamily: 'Archivo',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 28,
        textAlign: 'center',
    },
    arrow: {
        position: 'relative',
        left: 80,
        bottom: 40,
    },
    scanContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        backgroundColor: '#1e1e1e',
        flex: 1,
        borderRadius: 20,
        padding: 15,
        paddingHorizontal: 25,
    },
    linearGradient: {
        borderRadius: 25,
        height: 150,
        justifyContent: 'center',
        padding: 3,
        marginTop: 20,
    },
    progress: {
        bottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'Lato',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 19,
        color: '#FFFFFF'
    },
    shadowStyle: {
        ...Platform.select({
            ios: {
                // shadowColor: '#FFFFFF',
                // shadowOffset: { width: -2, height: -2 },
                // shadowOpacity: 1,
                // shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    outerShadowStyle: {
        ...Platform.select({
            ios: {
                shadowColor: '#FFFFFF',
                shadowOffset: { width: -3, height: -1.6 },
                shadowOpacity: 1,
                shadowRadius: 0.9,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    innerShadowStyle: {
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(39, 39, 44, 0.48)',
                shadowOffset: { width: 2, height: -2 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
            },
        }),
    }
});
