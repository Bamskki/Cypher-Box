import { StyleSheet } from 'react-native';

/**
 * Lifted verbatim from SwapAmount's inline success view, which is where this
 * treatment started. Kept byte-identical on purpose: the swap screen now
 * renders through this component, so any drift here would silently restyle it.
 */
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    title: {
        fontSize: 40,
        lineHeight: 50,
        marginBottom: 30,
    },
    value: {
        fontSize: 42,
        lineHeight: 52,
    },
    fiat: {
        fontSize: 30,
        lineHeight: 40,
        color: '#AAAAAA',
    },
    fee: {
        marginTop: 6,
        fontSize: 14,
        color: '#AAAAAA',
        textAlign: 'center',
    },
    animationContainer: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    ring: {
        position: 'absolute',
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringImage: {
        width: 150,
        height: 150,
    },
    boltImage: {
        width: 80,
        height: 85,
        zIndex: 10,
    },
    detail: {
        alignItems: 'center',
        marginVertical: 20,
    },
    /**
     * "Paid to <address>". Wraps rather than truncates: a BOLT11 invoice is
     * long, and an ellipsis in the middle of a payment destination is the one
     * place a user might actually want to read every character.
     */
    paidTo: {
        fontSize: 15,
        lineHeight: 21,
        color: '#FFFFFF',
        textAlign: 'center',
        marginHorizontal: 10,
    },
    fromWallet: {
        fontSize: 15,
        lineHeight: 21,
        color: '#AAAAAA',
        textAlign: 'center',
        marginTop: 4,
    },
    network: {
        fontSize: 22,
        lineHeight: 30,
        color: '#AAAAAA',
    },
    homeButton: {
        marginTop: 40,
        width: '80%',
    },
    homeButtonGradient: {
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
});
