import React, { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import styles from "./styles";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { CustomKeyboard, GradientCard, GradientInput } from "@Cypher/components";
import { colors, } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";

export default function SendScreen() {
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');
    const [sender, setSender] = useState('');
    const senderRef = useRef<TextInput>(null);

    const nextClickHandler = () => {
        dispatchNavigate('ReviewPayment', {
            value: sats,
            converted: usd,
            isSats: isSats,
            to: sender
        })
    }

    return (
        <ScreenLayout disableScroll showToolbar isBackButton title="Send Bitcoin">
            <ScrollView style={styles.container}>
                <GradientInput isSats={isSats} sats={sats} setSats={setSats} usd={usd} />
                <Text h2 style={styles.destination}>Destination</Text>

                <View style={styles.priceView}>
                    {sender?.length == 0 &&
                        <Text h4 center onPress={() => senderRef?.current?.focus()} style={StyleSheet.flatten([styles.label])}>Paste any address or invoice{'\n'} (Bitcoin, Lightning, Liquid)</Text>
                    }
                    <GradientCard
                        style={styles.main}
                        linearStyle={styles.heigth}
                        colors_={sender ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input
                            ref={senderRef}
                            onChange={setSender}
                            value={sender}
                            textInpuetStyle={styles.senderText}
                        />
                    </GradientCard>
                    <Image source={require('../../../img/scan-new.png')} style={styles.qrimage} />
                </View>
            </ScrollView>
            <CustomKeyboard
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