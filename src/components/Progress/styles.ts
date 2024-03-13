import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
    container: ViewStyle;
    linear: ViewStyle;
}

export default StyleSheet.create<Styles>({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    linear: {
        width: 8,
        height: 8,
        borderRadius: 4,
        zIndex: 1,
    }
});
