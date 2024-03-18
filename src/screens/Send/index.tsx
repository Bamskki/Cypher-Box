import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { Current } from "@Cypher/assets/images";
import { GradientButton, GradientCard } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";

export default function SendScreen() {
    const [sats, setSats] = useState<string>();
    const [inusd, setInUsd] = useState('0.00');
    const [fontSize, setFontSize] = useState(45);

    const sendClickHandler = () => {
        dispatchNavigate('SendReceiveSuccessScreen', {
            isReceive: false,
            value: sats,
            valueUsd: inusd,
        })
    }

    useEffect(() => {
        if (sats) {
            let sats_ = Number(sats);
            setInUsd((sats_ * 0.000169).toLocaleString('en', { maximumFractionDigits: 10 }));
            if (sats?.length > 7) {
                setFontSize(25);
            } else if (sats?.length > 4) {
                setFontSize(35);
            } else {
                setFontSize(45);
            }
        } else {
            setFontSize(45);
            setInUsd('0.00');
        }
    }, [sats]);

    return (
        <ScreenLayout showToolbar isBackButton title="Send">
            <View style={styles.priceView}>
                <Text h3 style={styles.text}>Amount</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginStart: 50 }}>
                    <TextInput
                        placeholder="0"
                        placeholderTextColor={colors.white}
                        style={[styles.amount, { fontSize: fontSize }]}
                        value={sats}
                        maxLength={10}
                        keyboardType="numeric"
                        returnKeyType="done"
                        onChangeText={setSats}
                    />
                    <Text style={StyleSheet.flatten([styles.placeholder, { fontSize: fontSize }])}>sats</Text>
                </View>
            </View>
            <Text subHeader style={styles.inDollar}>{`$${inusd}`}</Text>
            <GradientCard style={styles.main} linearStyle={styles.linearStyle}>
                <View style={styles.middleView}>
                    <Text bold h3 style={styles.sats}>30,000 sats</Text>
                    <Text bold h3 style={styles.sats}>From Blink Account</Text>
                </View>
                <View style={[styles.middleView, { marginBottom: 5 }]}>
                    <View style={styles.borderView}>
                        <Text>Type Lightning address or paste invoice</Text>
                    </View>
                    <Image source={require('../../../img/scan-new.png')} style={styles.image} resizeMode="contain" />
                </View>
            </GradientCard>
            <View style={styles.sendView}>
                <Image source={Current} style={styles.current} />
                <GradientButton title="Send" onPress={sendClickHandler} isShadow isTextShadow disabled={Number(sats) < 1} />
            </View>
        </ScreenLayout>
    )
}