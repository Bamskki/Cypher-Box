import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import { View, Image, Text } from 'react-native';
import ColdStorageTransactionCount from './walletTransactionCount';
import { BlueStorageContext } from '../../../blue_modules/storage-context';

const ColdStorageBalance = ({ showBalance }: { showBalance: boolean }) => {
    const {
        wallets,
        getTransactions,
        getBalance,
        refreshAllWalletTransactions,
        setSelectedWalletID,
        isElectrumDisabled,
        setReloadTransactionsMenuActionFunction,
    } = useContext(BlueStorageContext);

    const watchOnlyWallet = wallets.find(wallet => wallet.type === 'watchOnly' && wallet.typeReadable === 'Watch-only');

    const renderTransactionCounts = (count: number) => {
        const transactionCounts = [];
        for (let i = 0; i < count; i++) {
            transactionCounts.push(<ColdStorageTransactionCount key={i} />);
        }
        return <View style={{ flexDirection: 'row' }}>{transactionCounts}</View>;
    };
    return (
        <View style={[styles.linearGradient, styles.shadowStyle, styles.outerShadowStyle]}>
            <View
                style={[
                    styles.inner,
                    styles.shadowStyle,
                    styles.innerShadowStyle,
                    {
                        backgroundColor: '#1e1e1e',
                        paddingHorizontal: 15,
                    },
                ]}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.titleText}>Savings Vault</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.titleText, { fontSize: 16 }]}>Bitcoin Network</Text>
                        <Image style={{ width: 35, height: 35 }} resizeMode="contain" source={require('../../../img/bitcoin.png')} />
                    </View>
                </View>
                {showBalance && watchOnlyWallet && <Text style={styles.titleText}>{watchOnlyWallet.balance} BTC</Text>}
            </View>
        </View>
    );
};

export default ColdStorageBalance;
