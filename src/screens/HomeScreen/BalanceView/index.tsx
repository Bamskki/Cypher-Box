import { Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import useAuthStore from "@Cypher/stores/authStore";
import { colors, shadow, widths } from "@Cypher/style-guide";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-neomorph-shadows";
import styles from "../styles";
import { GradientView } from "@Cypher/components";

interface Props {
    balance: any
    convertedRate: any
}

export default function BalanceView({ balance, convertedRate }: Props) {
    return (
        <View style={[styles.innerContainer]}>
            <Shadow
                style={StyleSheet.flatten([styles.shadowTopBottom2])}
                inner
                useArt
            >
                <Text subHeader bold style={styles.price}>
                    {balance}
                </Text>
                <Text bold style={styles.priceusd} >
                    {convertedRate}
                </Text>
                <Shadow
                    inner
                    useArt
                    style={StyleSheet.flatten([styles.shadowBottomBottom])}
                />
            </Shadow>
        </View>
    )
}