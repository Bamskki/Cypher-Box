import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native"
import styles from "./styles";
import GradientTab from "../GradientTab";
import LinearGradient from "react-native-linear-gradient";
import GradientButton from "../GradientButton";
import { Cancel, Currency, CurrencyWhite, Sats } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";

interface Props {
    onPress(): void;
    setSATS(sats: string): void;
    setUSD(usd: string): void;
    setIsSATS(isSats: boolean): void;
    disabled?: boolean;
    title: string;
    isError?: boolean;
}

export default function CustomKeyBoard({ title, disabled, onPress, setSATS, setUSD, setIsSATS, isError }: Props) {
    const KEYSARRAY = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');

    useEffect(() => {
        if (sats.length) {
            const multiplier = isSats ? 0.000594 : 1683.79;
            const total = multiplier * Number(sats);
            const total_ = total.toFixed(4);
            setSATS(sats);
            setUSD(total_);
        } else {
            setUSD('');
            setSATS('');
        }
    }, [sats, isSats]);


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
