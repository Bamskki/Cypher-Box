import React, { useMemo, useRef, useState } from "react";
import { Input, Text } from "@Cypher/component-library";
import { Animated, Dimensions, ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import styles from "./styles";
import { GradientCard, GradientView } from "@Cypher/components";
import ListView from "./ListView";
import Svg, { Image } from 'react-native-svg';
// import BackgroundSvg from '../../assets/svg/transaction.svg';
// import Bitcoin from '../../assets/svg/bitcoin.svg';
import { colors, heights, widths } from "@Cypher/style-guide";
import { Transaction } from "@Cypher/assets/images";
import RBSheet from "react-native-raw-bottom-sheet";
import ReceivedList from "../HomeScreen/ReceivedList";
// import { Bitcoin, Transaction, TransactionN } from "@Cypher/assets/svg";

export default function Bars() {
    const [matchedRate, setMatchedRate] = useState(0);
    const [currency, setCurrency] = useState('$');
    const [value, setValue] = useState('');
    const [ids, setIds] = useState([]);
    console.log("🚀 ~ Bars ~ ids:", ids)
    const [btc, setBtc] = useState('0.00');
    const [convertedValue, setConvertedValue] = useState('~ $6500');
    // const offset = useRef(new Animated.Value(0)).current;
    // console.log("🚀 ~ Coins ~ offset:", offset);

    const [data, setData] = useState([
        {
            id: 1,
            address: '3dbf...0ae3',
            type: 0,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 2,
            address: '3dbf...0ae3',
            type: 1,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 3,
            address: '3dbf...0ae3',
            type: 2,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 4,
            address: '3dbf...0ae3',
            type: 3,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 5,
            address: '3dbf...0ae3',
            type: 0,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 6,
            address: '3dbf...0ae3',
            type: 1,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 7,
            address: '3dbf...0ae3',
            type: 2,
            type2: 'Blink Settlement',
            value: 0.02,
        },
        {
            id: 8,
            address: '3dbf...0ae3',
            type: 3,
            type2: 'Blink Settlement',
            value: 0.02,
        },
    ]);
    const addressClickHandler = () => { }

    const { total, inUSD } = useMemo(() => {
        let total = 0;
        ids.forEach(id => {
            const result = data?.find(obj => obj.id === id)?.value;
            if (result) total += result;
        });
        const inUSD = total * 63749.40;
        return { total, inUSD };
    }, [ids, data]);

    const onPressClickHandler = (id_: number) => {
        console.log("🚀 ~ onPressClickHandler ~ id:", id_)
        const isExist = ids.includes(id_);
        let newIds = [];
        if (isExist) {
            newIds = ids.filter(id => id != id_);
        } else {
            newIds = [...ids, id_];
        }
        setIds(newIds);
    }

    return (
        <View style={styles.flex}>
            <Text bold style={styles.desc}>Tap on your coins to label them. Select multiple coins and batch them together to optimize fees for future transactions:</Text>
            <View style={styles.titleStyle}>
                <Text bold style={styles.coin}>Bars</Text>
                <Text bold style={styles.size}>Size</Text>
                <Text bold style={styles.label}>Label</Text>
                <Text bold style={styles.select}>Select</Text>
            </View>
            <View style={styles.border} />
            <ScrollView>
                {data.map((data_, index) => <ListView item={data_} onPress={onPressClickHandler} ids={ids} />)}
            </ScrollView>
            <View style={styles.bottomViewNew}>
                <Text h2 center>Size of selected bars and coins:</Text>
                <View style={styles.priceView}>
                    <Input
                        onChange={setBtc}
                        value={`${total} BTC`}
                        keyboardType="number-pad"
                        editable={false}
                        textInpuetStyle={StyleSheet.flatten([styles.input, { borderColor: btc?.length > 0 ? colors.green : colors.gray.default }])}
                    />
                    <Text h2 bold numberOfLines={1} style={{ marginStart: 10, width: 100, }}>~$ {inUSD.toFixed(4)}</Text>
                </View>
                <Text bold center style={styles.tips}>Tip: Selecting dust coins will increase network fees</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <GradientView
                        onPress={addressClickHandler}
                        style={styles.linearGradientStyle}
                        linearGradientStyle={styles.mainShadowStyle}
                        topShadowStyle={styles.outerShadowStyle}
                        bottomShadowStyle={styles.innerShadowStyle}
                        linearGradientStyleMain={styles.linearGradientStyleMain}
                    >
                        <Text h3 center>Send Bars</Text>
                    </GradientView>
                    <GradientView
                        onPress={addressClickHandler}
                        topShadowStyle={styles.outerShadowStyle}
                        bottomShadowStyle={styles.innerShadowStyle}
                        style={[styles.linearGradientStyle, { marginStart: 25 }]}
                        linearGradientStyle={styles.mainShadowStyle}
                        linearGradientStyleMain={styles.linearGradientStyleMain}
                    >
                        <Text h3 center>Move to Cold Vault</Text>
                    </GradientView>
                </View>
            </View>
        </View>
    )
}