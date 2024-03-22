import { StyleSheet } from 'react-native';
import colors from './colors';

const shadow = StyleSheet.create({
    shadow25: {
        shadowColor: colors.black.default,
        shadowRadius: 4,
        shadowOpacity: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
        borderColor: "transparent",
        backgroundColor: colors.white,

        // shadowColor: colors.black.default,
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.4,
        // shadowRadius: 4,
        // elevation: 8,
    },
    text25: {
        textShadowColor: colors.shadow25,
        // shadowOpacity: 0.25,
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
    shadow50: {
        shadowColor: colors.shadow50,
        shadowRadius: 4,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
        borderColor: "transparent",
    },
    shadow75: {
        shadowColor: colors.shadow75,
        shadowRadius: 4,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
        borderColor: "transparent",
    },
});

export default shadow;