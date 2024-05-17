/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import ColdStorageTransactionCount from '../coldStorage/components/walletTransactionCount';
import Label from '../../svg/Label';
const cell = [
    {
        id: 1,
        label: 'Coin \n (UTXO)',
    },
    { id: 2, label: 'Size' },
    { id: 3, label: 'Label' },
    { id: 4, label: 'Select' },
];

const data = [
    {
        walletAddress: '3dbf...0ae3',
        balance: 0.1,
        id: 1,
    },
    {
        walletAddress: '3dbf...0ae3',
        balance: 0.1,
        id: 2,
    },
    {
        walletAddress: '3dbf...0ae3',
        balance: 0.1,
        id: 3,
    },
];
export default function SavingVaultCoin() {
    const [selectedCoin, setSelectedCoin] = useState([]);

    const handleSelectCoin = coinId => {
        // Check if the coin is already selected
        if (selectedCoin.includes(coinId)) {
            // If selected, remove it from the array
            setSelectedCoin(selectedCoin.filter(id => id !== coinId));
        } else {
            // If not selected, add it to the array
            setSelectedCoin([...selectedCoin, coinId]);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <View
                style={[
                    styles.flexRow,
                    index === 0 && { borderTopWidth: 1 },
                    { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#fff', justifyContent: 'space-between', alignItems: 'center' },
                ]}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ColdStorageTransactionCount filled />
                    <Text style={styles.paragaraph}> {item.walletAddress}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.titleText, { textAlign: 'center' }]}>{item.balance} BTC</Text>
                    <Text style={[styles.paragaraph, { textAlign: 'center' }]}>From Savings Vault</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Label />
                </View>
                <CheckBox style={{ flex: 1 }}
                    checked={selectedCoin.includes(item.id)}
                    onPress={() => handleSelectCoin(item.id)}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.paragaraph, { marginVertical: 10 }]}>
                Tap on your coins to label them. Select multiple coins and batch them together to optimize fees for future transactions:
            </Text>
            <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
                {cell.map(({ id, label }) => (
                    <Text key={id} style={[styles.titleText, { fontSize: 14, textAlign: 'center', flex: 1 }]}>
                        {label}
                    </Text>
                ))}
            </View>
            <View>
                <FlatList data={data} keyExtractor={({ id }) => id.toString()} renderItem={renderItem} style={{ marginVertical: 10 }} />
                <View style={[styles.flexRow, { marginVertical: 25 }]}>
                    <TouchableOpacity style={styles.transferCoinButton}>
                        <Text style={[styles.titleText, { color: "#010101" }]}>Transfer Coins</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.batchButton}>
                        <Text style={styles.titleText}>Batch (Soon)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
