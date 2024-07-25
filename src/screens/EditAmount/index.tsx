import React, { useRef, useState } from "react";
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
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');
    const [sender, setSender] = useState('');
    const senderRef = useRef<TextInput>(null);

    const nextClickHandler = () => {
        route?.params?.setSats(sats, usd);
        navigation?.pop();
    }

    const maxSendClickHandler = () => { }

    return (
        <ScreenLayout disableScroll showToolbar isBackButton >
            <ScrollView style={styles.container}>
                <GradientInputNew isSats={isSats} sats={sats} setSats={setSats} usd={usd} title={'Specify  Amount'} />
                <Text bold h2 center style={{ marginTop: 30, marginBottom: 25 }}>Total size of selected bars:{'\n'}0.06 BTC</Text>
                <TouchableOpacity onPress={maxSendClickHandler} style={styles.btn}>
                    <Text bold style={{ fontSize: 13 }}>Send Max: 0.06 BTC</Text>
                </TouchableOpacity>
            </ScrollView>
            <CustomKeyboardNew
                title="Next"
                onPress={nextClickHandler}
                disabled={!sats.length || !sender.length}
                setSATS={setSats}
                setUSD={setUSD}
                setIsSATS={setIsSats}
                firstTabText="BTC"
            />
        </ScreenLayout>
    )
}
