import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { Bitcoin, Cancel, Currency, CurrencyWhite, Sats, Small } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";
import { btc } from "@Cypher/helpers/coinosHelper";
import { colors } from "@Cypher/style-guide";
import GradientTabNew from "../GradientTabNew";

interface Props {
    onPress(): void;
    setSATS(sats: string): void;
    setUSD(usd: string): void;
    setIsSATS(isSats: boolean): void;
    disabled?: boolean;
    title: string;
    isError?: boolean;
    matchedRate?: number;
    currency?: string;
    isConverter?: boolean;
    firstTabText?: string;
}

export default function CustomKeyBoardNew({ title, disabled, onPress, setSATS, setUSD, setIsSATS, isError, matchedRate, isConverter = true, firstTabText = "Sats" }: Props) {
    const KEYSARRAY = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'];
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const currency = btc(1);

    useEffect(() => {
        if (sats.length) {
            let amount = 0;
            if (isSats) {
                amount = ((matchedRate || 0) * currency * Number(sats)).toFixed(5)
                console.log('amount: ', amount)
                setSATS(sats);
                setUSD(String(amount));
            } else {
                amount = parseInt((Number(sats) / (matchedRate || 0)) * 100000000);
                const multiplier = isSats ? 0.000594 : 1683.79;
                const total = multiplier * Number(sats);
                const total_ = total.toFixed(4);
                setSATS(sats);
                setUSD(String(amount));
            }
        } else {
            setUSD('');
            setSATS('');
        }
    }, [sats.length, isSats]);

    useEffect(() => {
        setSats('');
        setSATS('');
        setUSD('');
        setIsSATS(isSats);
    }, [isSats]);

    const handlePress = (value: string) => {
        setSats((prev) => prev + value);
    };

    const handleDelete = () => {
        setSats((prev) => prev.slice(0, -1));
    };

    return (
        <View style={styles.container}>
            {isConverter &&
                <GradientTabNew
                    firstTabImg={firstTabText === "Sats" ? Sats : isSats ? Bitcoin : Small}
                    secondTabImg={isSats ? Currency : CurrencyWhite}
                    tab1={firstTabText}
                    tab2="USD"
                    isSats={isSats}
                    setIsSats={setIsSats}
                    imageStyle={{ width: 33, height: 33, marginTop: 0, marginStart: -5 }}
                    textStyle={{ marginStart: 15, fontFamily: 'Lato-Medium' }}
                />
            }
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                colors={[colors.green, colors.green]}
                style={styles.linearGradient} />
            <View style={styles.keypad}>
                {KEYSARRAY.map((key) => (
                    <TouchableOpacity key={key} style={styles.key} onPress={() => handlePress(key)}>
                        <Text style={styles.keyText}>{key}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.key} onPress={handleDelete}>
                    <Image source={Cancel} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.nextBtn}>
                <Text h3>Next</Text>
            </TouchableOpacity>
        </View>
    )
}
