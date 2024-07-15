import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import TextView from "./TextView";
import { dispatchNavigate } from "@Cypher/helpers";

interface Props {
    route: any;
}

export default function SendReceiveOnChain({ route }: Props) {
    // const { item } = route?.params;
    const isSent = true;

    const handleViewBtcNetExplorerClickHandler = () => {
        dispatchNavigate('HomeScreen');
    }

    return (
        <ScreenLayout showToolbar isBackButton title="Review Transaction">
            <View style={styles.main}>
                <View style={styles.valueView}>
                    <Text semibold style={StyleSheet.flatten([styles.sats, { color: isSent ? '#FD7A68' : '#4FBF67' }])}>+30K sats</Text>
                    <Text bold subHeader>$0.03</Text>
                </View>
                <TextView keytext="Sent from to: " text="Bitcoin Address: bc1...34f" />
                <TextView keytext="Received to: " text="Vault address: bc1...34f" />
                {isSent &&
                    <>
                        <TextView keytext="Status: " text="~ 5000 sats" />
                        <TextView keytext="Network fee: " text="~ 5000 sats" />
                        <TextView keytext="Service fee: " text="~ 400 sats" />
                        <TextView keytext="Total fee: " text="~ 5,400 sats (~ 0.1%)" />
                    </>
                }
                <TextView keytext="Date:  " text="19:00 UTC 4/20/2024" />
                {!isSent && <TextView keytext="At bitcoin exchange rate: " text="$70,000" />}
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
