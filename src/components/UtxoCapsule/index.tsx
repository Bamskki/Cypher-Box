import { colors } from '@Cypher/style-guide';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View } from 'react-native';

interface Props {
    completed?: boolean;
}

export default function UtxoCapsule({ completed }: Props) {
    return (
        completed ? (
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                colors={[colors.gradient.utxo.start, colors.gradient.utxo.end]}
                style={[styles.linearGradient]}
            />
        ) : (
            <View style={[styles.linearGradient]} />
        )
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        height: 9,
        alignSelf: 'flex-start',
        marginVertical: 10,
        zIndex: 99
    },
});
