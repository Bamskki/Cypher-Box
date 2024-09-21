import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import GradientTab from "../GradientTab";
import LinearGradient from "react-native-linear-gradient";
import GradientButton from "../GradientButton";
import { Cancel, Currency, CurrencyWhite, Sats } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";
import { btc } from "@Cypher/helpers/coinosHelper";

interface Props {
    onPress(): void;
    setSATS(sats: string): void;
    setUSD(usd: string): void;
    setIsSATS(isSats: boolean): void;
    disabled?: boolean;
    title: string;
    prevSats: string | boolean;
    isError?: boolean;
    matchedRate?: number;
    currency?: string;
}

export default function CustomKeyBoard({ title, prevSats, disabled, onPress, setSATS, setUSD, setIsSATS, isError, matchedRate }: Props) {
    const KEYSARRAY = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState(prevSats ? String(prevSats) : '');
    const currency = btc(1);

    useEffect(() => {
        if (sats.length) {
            let amount = 0;
            if (isSats) {
                amount = ((matchedRate || 0) * currency * Number(sats)).toFixed(5)
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
        if (!prevSats) {
            setSats('');
            setSATS('');
            setUSD('');
        }
        setIsSATS(isSats);
    }, [isSats, prevSats]);

    const handlePress = (value: string) => {
        setSats((prev) => prev + value);
    };

    const handleDelete = () => {
        setSats((prev) => prev.slice(0, -1));
    };

    return (
        <View style={styles.container}>
            <GradientTab firstTabImg={Sats} secondTabImg={isSats ? Currency : CurrencyWhite} tab1="Sats" tab2="USD" isSats={isSats} setIsSats={setIsSats} />
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                colors={['#FF65D4', '#D617A1']}
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
            <GradientButton style={styles.invoiceButton} textStyle={{ fontFamily: 'Lato-Medium', }}
                title={title}
                disabled={disabled}
                isError={isError}
                onPress={onPress} />
        </View>
    )
}
