import React from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import TextView from "./TextView";
import { btc } from "@Cypher/helpers/coinosHelper";

interface Props {
    route: any;
}

const shortenAddress = (address: string) => {
    // Take the first 6 characters
    const start = address.substring(0, 6);
    // Take the last 6 characters
    const end = address.substring(address.length - 6);
    // Combine with three dots in the middle
    return `${start}...${end}`;
};


export default function SendReceiveOnChain({ route }: Props) {
    const { transaction, history, matchedRate } = route?.params;
    const isSent = transaction.value < 0;
    const satsAmount = transaction.value.toString().replace('-', ''); // Adjusted for negative sign
    const amountSign = transaction.value < 0 ? "-" : "+";
    const currency = btc(1);
    const dollarAmount = satsAmount * matchedRate * currency;

    const handleViewBtcNetExplorerClickHandler = () => {
        const url = `https://www.blockchain.com/btc/tx/${transaction?.txid}`;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    return (
        <ScreenLayout showToolbar isBackButton title="Review Transaction">
            <View style={styles.main}>
                <View style={styles.valueView}>
                    <Text semibold style={StyleSheet.flatten([styles.sats, { color: isSent ? '#FD7A68' : '#4FBF67' }])}>{amountSign+satsAmount} sats</Text>
                    <Text bold subHeader>{'$'+dollarAmount.toFixed(2)}</Text>
                </View>
                <TextView keytext="Sent from: " text={`Bitcoin Address: ${shortenAddress(transaction?.inputs[0].addresses[0])}`} />
                <TextView keytext="Received to: " text={`Bitcoin Address: ${shortenAddress(transaction?.outputs[0].scriptPubKey.addresses[0])}`} />
                {isSent &&
                    <>
                        <TextView keytext="Status: " text="~ 5000 sats" />
                        <TextView keytext="Network fee: " text="~ 5000 sats" />
                        <TextView keytext="Service fee: " text="~ 400 sats" />
                        <TextView keytext="Total fee: " text="~ 5,400 sats (~ 0.1%)" />
                    </>
                }
                <TextView keytext="Date:  " text={dayjs(transaction?.time * 1000).format('HH:mm:ss MM/DD/YYYY')} />
                {!isSent && <TextView keytext="At bitcoin exchange rate: " text={'$'+matchedRate} />}
                <TextView keytext="Txid:  " text={transaction?.txid} />

                {isSent &&
                    <TouchableOpacity style={[styles.button, { marginBottom: 20 }]}>
                        <Text bold h4 style={styles.text}>Accelrate transaction</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.button} onPress={handleViewBtcNetExplorerClickHandler}>
                    <Text bold h4 style={styles.text}>View in Bitcoin Network Explorer</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
