import React from 'react'
import { View, } from 'react-native'
import WalletCard from './components/WalletCard';

import styles from './styles';

export default function SavingVaultHistory() {
    return (
        <View style={styles.container}>
            <WalletCard
                balance={0.1}
                status='Sent'
                walletName='Sent to Cold Storage'
            />
            <WalletCard
                balance={0.1}
                status='Sent'
                walletName='Sent to Cold Storage'
            />
            <WalletCard
                balance={0.1}
                status='Sent'
                walletName='Sent to Cold Storage'
            />
        </View>
    )
}