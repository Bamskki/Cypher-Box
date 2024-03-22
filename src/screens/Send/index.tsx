import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { Current } from "@Cypher/assets/images";
import { GradientButton, GradientCard, GradientCardWithShadow, GradientText } from "@Cypher/components";
import { colors, shadow } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";

export default function SendScreen() {
    const [sats, setSats] = useState<string>();
    const [inusd, setInUsd] = useState('0.00');
    const [fontSize, setFontSize] = useState(45);

    const sendClickHandler = () => {
        dispatchNavigate('SendReceiveSuccessScreen', {
            isReceive: false,
            value: sats || '10',
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
        <ScreenLayout showToolbar isBackButton title="Send Bitcoin">
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
            <GradientCardWithShadow style={styles.mainview} linearStyle={styles.main} shadowStyleTop={styles.main} shadowStyleBottom={styles.main}>
                <View style={styles.middleView}>
                    <Text bold h3 style={styles.sats}>30,000 sats</Text>
                    <Text bold h3 style={styles.sats}>From Coinos Account</Text>
                </View>
                <View style={styles.middlebView}>
                    <View style={styles.border}>
                    <View style={styles.borderView}>
                        <GradientText h3 style={{fontSize:10, ...shadow.text25}}>Type Lightning address or paste invoice</GradientText>
                    </View>
                    </View>
                    <Image source={require('../../../img/scan-new.png')} style={styles.image} resizeMode="contain" />
                </View>
            </GradientCardWithShadow>
            <View style={styles.sendView}>
                <Image source={Current} style={styles.current} />
                <GradientButton title="Send" onPress={sendClickHandler} isShadow isTextShadow disabled={Number(sats) < 1} />
            </View>
        </ScreenLayout>
    )
}