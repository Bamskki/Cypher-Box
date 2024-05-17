import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Style {
    container: ViewStyle;
    customTabBar: ViewStyle;
    inner: ViewStyle;
    titleText: TextStyle;
    linearGradient: ViewStyle;
    italicText: TextStyle;
    paragaraph: TextStyle;
    tableText: TextStyle;
    flexRow: ViewStyle;
    centered: ViewStyle;
    borderedBottom: ViewStyle;
    inputContainer: ViewStyle;
    batchButton: ViewStyle;
    transferCoinButton: ViewStyle;

}

export default StyleSheet.create<Style>({
    container: {
        backgroundColor: '#1e1e1e',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
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
    titleText: {
        fontFamily: 'Lato',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 19,
        color: '#FFFFFF',
    },
    paragaraph: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 19,
        color: '#FFFFFF',
    },
    italicText: {
        fontFamily: 'Lato-Italic',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
        color: '#FFFFFF',
        marginHorizontal: 4,
    },
    tableText: {
        fontSize: 8,
        fontWeight: '700',
        lineHeight: 19,
        color: '#FFFFFF',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    centered: {
        justifyContent: 'center',
    },
    borderedBottom: {
        borderBottomWidth: 2,
        borderColor: '#FFFFFF',
        paddingVertical: 10,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        width: '50%',
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    batchButton: {
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#2A2929',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    transferCoinButton: {
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        insetShadowOffset: {
            width: -2,
            height: -2,
        },
        insetShadowOpacity: 0.64,
        insetShadowRadius: 0,
        shadowColor: "#FFFFFF",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,


    },
});
