import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Shadow } from "react-native-neomorph-shadows"
import styles from "./styles"
import { Text } from "@Cypher/component-library";
import { Bitcoin, LiquidBitCoin, Socked } from "@Cypher/assets/images";
import { btc } from "@Cypher/helpers/coinosHelper";
import { colors } from "@Cypher/style-guide";

interface Props {
    matchedRate: number
    item: any;
    onPressHandler(item: any): void;
}

export default function Items({ matchedRate, item, onPressHandler }: Props) {

    const satsAmount = item.amount.toString().replace('-', ''); // Adjusted for negative sign
    const amountSign = item.amount < 0 ? "-" : "+";
    const currency = btc(1);
    const dollarAmount = satsAmount * matchedRate * currency;

    const textColor = {
      color: item.amount < 0 ? colors.red : colors.green,
    };

    return <TouchableOpacity style={styles.shadowView} onPress={() => onPressHandler(item)}>
        <Shadow
            style={styles.shadowTop}
            inner
            useArt
        >
            <View style={styles.inner}>
                <View style={styles.main}>
                    <View style={styles.imageView}>
                        {item?.type === 'bitcoin' ?
                            <Image source={Bitcoin} />
                            : item?.type === 'liquid' ?
                                <Image source={LiquidBitCoin} />
                            :
                                <Image source={Socked} style={styles.image} />
                        }
                    </View>
                    <Text bold style={styles.des}>                      
                    {item.amount > 0
                        ? item.confirmed
                          ? "Received"
                          : "Pending"
                        : "Sent"}
                    </Text>
                    <Text h3 style={{ color: amountSign == '+' ? '#4FBF67' : '#FF7A68' }}>{amountSign+satsAmount} sats</Text>
                </View>
                <Text style={StyleSheet.flatten([styles.text, { color: amountSign == '+' ? '#4FBF67' : '#FF7A68' }])}>{'$'+dollarAmount.toFixed(2)}</Text>
                <Shadow
                    inner
                    useArt
                    style={styles.shadowBottom}
                />
            </View>
        </Shadow>
    </TouchableOpacity>
}