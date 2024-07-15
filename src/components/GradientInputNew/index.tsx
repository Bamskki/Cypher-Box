import React from "react";
import { StyleSheet, View } from "react-native"
import GradientCard from "../GradientCard";
import styles from "./styles";
import { colors } from "@Cypher/style-guide";
import { Input, Text } from "@Cypher/component-library";

interface Props {
    sats: string;
    setSats(val: string): void;
    usd: string;
    isSats: boolean;
    isFeeesRate?: boolean;
}

export default function GradientInputNew({
    sats,
    setSats,
    usd,
    isSats,
    isFeeesRate = false,
}: Props) {
    return (
        <View>
            <View style={styles.priceView}>
                {isFeeesRate ?
                    <Text center style={styles.amount}>Customize feerate</Text>
                    :
                    <Text center style={styles.amount}>Amount</Text>
                }
                <GradientCard style={styles.card} colors_={sats ? [colors.green, colors.green] : [colors.gray.thin, colors.gray.thin2]}
                    linearStyle={styles.lGradient}>
                    <Input onChange={setSats}
                        value={sats}
                        keyboardType="number-pad"
                        editable={false}
                        textInpuetStyle={styles.input}
                    />
                </GradientCard>
                {!isFeeesRate &&
                    <Text style={StyleSheet.flatten([styles.text, { paddingTop: 30, fontSize: isSats ? 25 : 50, right: isSats ? 10 : 25 }])}>{`${isSats ? 'sats' : '$'}`}</Text>
                }
            </View>
            {isFeeesRate ?
                <View style={styles.feesView}>
                    <Text style={styles.sats}>sats/vb</Text>
                    <Text center style={{ fontSize: 18, marginTop: 10, lineHeight: 24 }}>Network fee: {'\n'}~ 20000 sats (~$39)</Text>
                </View>
                :
                isSats ?
                    <Text style={styles.inDollar}>${usd}</Text>
                    :
                    <Text style={styles.inDollar}>{usd} sats</Text>
            }
        </View>
    )
}
