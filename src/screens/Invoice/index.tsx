import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import TextView from "./TextView";
import { CoinOS } from "@Cypher/assets/images";

interface Props {
    route: any;
}

export default function Invoice({ route }: Props) {
    const { item } = route?.params;

    return (
        <ScreenLayout showToolbar isBackButton title="Review Payment">
            <View style={styles.main}>
                <View style={styles.valueView}>
                    <Text semibold style={StyleSheet.flatten([styles.sats, { color: item?.sats?.includes('+') ? '#4FBF67' : '#FF7A68' }])}>{item?.sats}</Text>
                    <Text bold subHeader>{item?.usd}</Text>
                </View>
                <TextView keytext="Sent from: " text="My Coinos Checking Account" />
                <TextView keytext="To: " text="marah@blink.sv" />
                <TextView keytext="Fee:  " text="~0 sats" />
                <TextView keytext="Date:  " text="19:00 UTC 4/20/2024" />
                <TextView keytext="At bitcoin exchange rate:  " text="$70,000" />
                {item?.type === 'bitcoin' ?
                    <TouchableOpacity style={styles.button}>
                        <Text bold h4 style={styles.text}>View in Bitcoin Network Explorer</Text>
                    </TouchableOpacity>
                    :
                    <TextView keytext="Lightning preimage:  " text="81f9ad466ad9987f30bbfd44a6c898a88
                cf7f72927446df75d7464e526adcdf" />
                }
                <View style={styles.bottomView}>
                    <Image source={CoinOS} />
                </View>
            </View>
        </ScreenLayout>
    )
}