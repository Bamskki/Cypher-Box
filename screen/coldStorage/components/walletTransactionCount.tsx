import React from 'react';
import { StyleSheet, View } from 'react-native';

const ColdStorageTransactionCount = ({ filled }: { filled: boolean }) => {
    return (
        <View style={[styles.container, filled && { backgroundColor: '#FFFFFF' }]} />

    )
};

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        margin: 2
    },
});

export default ColdStorageTransactionCount;
