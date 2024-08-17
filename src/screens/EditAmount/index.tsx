import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { CustomKeyboardNew, GradientInput, GradientInputNew } from "@Cypher/components";
import { colors, } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";

interface Props {
    route: any;
    navigation: any;
}

export default function SendScreen({ route, navigation }: Props) {
    const { wallet, utxo, ids, inUSD, total, matchedRate, setSatsEdit } = route?.params;
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');
    const [sender, setSender] = useState('');
    const senderRef = useRef<TextInput>(null);

    useEffect(() => {
        if(total && inUSD){
            console.log('inUSDinUSD: ', inUSD)
            setSats(String(total) || "")
            setUSD(String(inUSD) || "")    
        }
    }, [total, inUSD])

    const nextClickHandler = () => {
        setSatsEdit && setSatsEdit();
        dispatchNavigate('ColdStorage', {wallet, utxo, ids, inUSD: isSats ? usd : sats, total: isSats ? sats : usd, matchedRate});
        // // route?.params?.setSats(sats, usd);
        // navigation?.pop();
    }

    const maxSendClickHandler = () => {
        setSatsEdit && setSatsEdit();
        dispatchNavigate('ColdStorage', {wallet, utxo, ids, inUSD: inUSD, total: total, matchedRate});
    }

    return (
        <ScreenLayout disableScroll showToolbar isBackButton >
            <ScrollView style={styles.container}>
                <GradientInputNew isSats={isSats} sats={sats} setSats={setSats} usd={usd} title={'Specify  Amount'} />
                <Text bold h2 center style={{ marginTop: 30, marginBottom: 25 }}>Total size of selected bars:{'\n'}{total} BTC</Text>
                <TouchableOpacity onPress={maxSendClickHandler} style={styles.btn}>
                    <Text bold style={{ fontSize: 13 }}>Send Max: {total} BTC</Text>
                </TouchableOpacity>
            </ScrollView>
            <CustomKeyboardNew
                title="Next"
                onPress={nextClickHandler}
                prevSats={sats}
                disabled={!sats.length || (isSats ? usd > inUSD : sats > inUSD)}
                setSATS={setSats}
                setUSD={setUSD}
                setIsSATS={setIsSats}
                firstTabText="BTC"
                matchedRate={matchedRate}
            />
        </ScreenLayout>
    )
}
