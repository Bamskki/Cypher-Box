import React, { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
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

    return (
        <ScreenLayout disableScroll showToolbar isBackButton >
            <ScrollView style={styles.container}>
                <GradientInputNew isSats={isSats} sats={sats} setSats={setSats} usd={usd} />
            </ScrollView>
            <CustomKeyboardNew
                title="Next"
                onPress={nextClickHandler}
                disabled={!sats.length || !sender.length}
                setSATS={setSats}
                setUSD={setUSD}
                setIsSATS={setIsSats}
            />
        </ScreenLayout>
    )
}
