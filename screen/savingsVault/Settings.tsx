import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './styles';

export default function Settings() {
    return (
        <View style={[styles.container, { paddingTop: 60 }]}>
            <View style={[styles.borderedBottom, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <Text style={styles.titleText}>Name Your Vault</Text>
                <TextInput
                    style={styles.inputContainer}
                />
            </View>
            <View style={styles.borderedBottom}>
                <Text style={styles.titleText}>Show Addresses</Text>
            </View>
            <View style={styles.borderedBottom}>
                <Text style={styles.titleText}>Vault’s Public Key (xpub)</Text>
            </View>
            <View style={styles.borderedBottom}>
                <Text style={styles.titleText}>Info</Text>
            </View>
            <View style={styles.borderedBottom}>
                <Text style={styles.titleText}>Sign/Verify</Text>
            </View>
            <View style={[styles.borderedBottom]}>
                <Text style={[styles.titleText, { color: '#FF0000' }]}>Delete</Text>
            </View>
        </View>
    )
}