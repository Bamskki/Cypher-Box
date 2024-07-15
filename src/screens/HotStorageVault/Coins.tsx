import React, { useRef, useState } from "react";
import { Text } from "@Cypher/component-library";
import { Animated, Dimensions, ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import styles from "./styles";
import { GradientView } from "@Cypher/components";
import ListView from "./ListView";
import Svg, { Image } from 'react-native-svg';
// import BackgroundSvg from '../../assets/svg/transaction.svg';
// import Bitcoin from '../../assets/svg/bitcoin.svg';
import { colors, heights, widths } from "@Cypher/style-guide";
import { Transaction } from "@Cypher/assets/images";
// import { Bitcoin, Transaction, TransactionN } from "@Cypher/assets/svg";

export default function Coins() {
    // const offset = useRef(new Animated.Value(0)).current;
    // console.log("🚀 ~ Coins ~ offset:", offset);

    const [data, setData] = useState([
        {
            id: 1,
            address: '3dbf...0ae3',
            type: 0,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 2,
            address: '3dbf...0ae3',
            type: 1,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 3,
            address: '3dbf...0ae3',
            type: 2,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 4,
            address: '3dbf...0ae3',
            type: 3,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 1,
            address: '3dbf...0ae3',
            type: 0,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 2,
            address: '3dbf...0ae3',
            type: 1,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 3,
            address: '3dbf...0ae3',
            type: 2,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
        {
            id: 4,
            address: '3dbf...0ae3',
            type: 3,
            type2: 'Blink Settlement',
            value: '0.02 BTC',
        },
    ]);
    const addressClickHandler = () => { }

    return (
        <View style={styles.flex}>
            <Text bold style={styles.desc}>Tap on your coins to label them. Select multiple coins and batch them together to optimize fees for future transactions:</Text>
            <View style={styles.titleStyle}>
                <Text bold style={styles.coin}>Coins</Text>
                <Text bold style={styles.size}>Size</Text>
                <Text bold style={styles.label}>Label</Text>
                <Text bold style={styles.select}>Select</Text>
            </View>
            <View style={styles.line} />
            {data.map((data_, index) => <ListView item={data_} onPress={() => { }} />)}
            <View style={styles.line} />
            <View style={styles.base}>
                <GradientView
                    onPress={addressClickHandler}
                    style={styles.linearGradientStyle}
                    linearGradientStyle={styles.mainShadowStyle}
                    topShadowStyle={styles.outerShadowStyle}
                    bottomShadowStyle={styles.innerShadowStyle}
                    linearGradientStyleMain={styles.linearGradientStyleMain}
                >
                    <Text h3 center>Select All</Text>
                </GradientView>
                <GradientView
                    onPress={addressClickHandler}
                    topShadowStyle={styles.outerShadowStyle}
                    bottomShadowStyle={styles.innerShadowStyle}
                    style={[styles.linearGradientStyle, { marginStart: 25 }]}
                    linearGradientStyle={styles.mainShadowStyle}
                    linearGradientStyleMain={styles.linearGradientStyleMain}
                >
                    <Text h3 center>Send Coins</Text>
                </GradientView>
            </View>
        </View>
    )
}