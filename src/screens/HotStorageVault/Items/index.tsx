import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Shadow } from "react-native-neomorph-shadows"
import styles from "./styles"
import { Text } from "@Cypher/component-library";
import { Bitcoin, Socked } from "@Cypher/assets/images";
import { btc } from "@Cypher/helpers/coinosHelper";

interface Props {
    wallet: any;
    item: any;
    matchedRate: any;
    onPressHandler(item: any): void;
}

export default function Items({ wallet, item, matchedRate, onPressHandler }: Props) {
    console.log('item: ', item)
    const satsAmount = item.value.toString().replace('-', ''); // Adjusted for negative sign
    const BTCAmount = btc(satsAmount) + " BTC";
    const amountSign = item.value < 0 ? "-" : "+";
    const currency = btc(1);
    const dollarAmount = Number(satsAmount) * matchedRate * currency;

    return <TouchableOpacity style={styles.shadowView} onPress={() => onPressHandler(item)}>
        <Shadow
            style={styles.shadowTop}
            inner
            useArt
        >
            <View style={styles.inner}>
                <View style={styles.main}>
                    <View style={styles.imageView}>
                        <Image source={Bitcoin} style={styles.image} />
                    </View>
                    <Text bold h4 style={styles.des}>                    
                        {item.value > 0
                        ? item?.confirmations > 3
                          ? "Received"
                          : "Pending"
                        : "Sent"}
                    </Text>
                    <Text h3 style={{ color: amountSign == '+' ? '#4FBF67' : '#FF7A68' }}>{amountSign+BTCAmount}</Text>
                    {/* <Text h3 style={{ color: item?.sats?.includes('+') ? '#4FBF67' : '#FF7A68' }}>{item?.sats}</Text> */}
                </View>
                <Text style={StyleSheet.flatten([styles.text, { color: amountSign == '+' ? '#4FBF67' : '#FF7A68' }])}>{'$'+dollarAmount.toFixed(2)}</Text>
                {/* <Text style={StyleSheet.flatten([styles.text, { color: item?.sats?.includes('+') ? '#4FBF67' : '#FF7A68' }])}>{item?.usd}</Text> */}
                <Shadow
                    inner
                    useArt
                    style={styles.shadowBottom}
                />
            </View>
        </Shadow>
    </TouchableOpacity>
}
