import React from "react";
import { View } from "react-native"
import GradientCard from "../GradientCard";
import styles from "./styles";
import { colors } from "@Cypher/style-guide";
import { Input, Text } from "@Cypher/component-library";

interface Props {
    sats: string;
    setSats(val: string): void;
    usd: string;
    isSats: boolean;
}

export default function GradientInput({
    sats,
    setSats,
    usd,
    isSats
}: Props) {
    return (
        <View>
            <View style={styles.priceView}>
                <GradientCard style={styles.card} colors_={sats ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}
                    linearStyle={styles.lGradient}>
                    <Input onChange={setSats}
                        value={sats}
                        keyboardType="number-pad"
                        editable={false}
                        textInpuetStyle={styles.input}
                    />
                </GradientCard>
                <Text style={isSats ? styles.btc : styles.dollar}>{`${isSats ? 'sats' : '$'}`}</Text>
            </View>
            {isSats ?
                <Text style={styles.inDollar}>${usd}</Text>
                :
                <Text style={styles.inDollar}>{usd} sats</Text>
            }
        </View>
    )
}
