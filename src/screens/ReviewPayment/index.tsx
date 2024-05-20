import React, { useState } from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { CoinOSSmall } from "@Cypher/assets/images";
import { GradientButton, GradientCard, GradientCardWithShadow, GradientText, ImageText, SwipeButton } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";
import LinearGradient from "react-native-linear-gradient";
import TextView from "./TextView";
import { Shadow } from "react-native-neomorph-shadows";

interface Props {
    route: any;
}
export default function ReviewPayment({ route }: Props) {
    const { value, converted, isSats, to } = route?.params;
    const [note, setNote] = useState('');

    const sendClickHandler = () => {
        dispatchNavigate('TransactionBroadCast');
        // dispatchNavigate('SendReceiveSuccessScreen', {
        //     isReceive: false,
        //     value: value,
        //     valueUsd: converted,
        //     isSats,
        // })
    }

    const handleToggle = (value) => {
        console.log("🚀 ~ handleToggle ~ value:", value)
        if (value)
            dispatchNavigate('TransactionBroadCast');
    }

    return (
        <ScreenLayout showToolbar disableScroll isBackButton title="Review Payment">
            <View style={styles.topView}>
                <GradientCardWithShadow
                    colors_={[colors.gray.dark, colors.gray.dark]}
                    style={styles.linearGradient}
                    disabled
                    linearStyle={styles.height}
                    shadowStyleTop={styles.top}
                    shadowStyleBottom={styles.bottom}>
                    <View style={styles.view}>
                        <Text h2 bold style={styles.check}>
                            Checking Account
                        </Text>
                        <Image
                            source={CoinOSSmall}
                            style={styles.blink}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.sats}><Text h2>50K sats  ~  </Text><Text h3>$20</Text></View>
                    <Text bold style={styles.text}>2M sats</Text>
                    <LinearGradient
                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                        colors={[colors.white, colors.pink.dark]}
                        style={styles.linearGradient2}>
                        <View style={styles.box} />
                        <Shadow
                            inner // <- enable inner shadow
                            useArt // <- set this prop to use non-native shadow on ios
                            style={styles.top2} >
                        </Shadow>
                    </LinearGradient>
                </GradientCardWithShadow>
                <View style={styles.middle}>
                    <TextView keytext="Recipient will get: " text={isSats ? `${route?.params?.value} sats ~ $${converted}` : `$${route?.params?.value} ~ $${converted} sats`} textStyle={styles.price} />
                    <TextView keytext="Sent from: " text="Coinos Checking Account" />
                    <TextView keytext="To: " text={route?.params?.to} />
                    <TextView keytext="Fees:  " text=" ~   0 sat" />
                </View>
                <GradientCard
                    style={styles.main}
                    linearStyle={styles.heigth}
                    colors_={note ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                    <Input
                        onChange={setNote}
                        value={note}
                        textInpuetStyle={styles.heigth2}
                        label="Add note"
                    />
                </GradientCard>
            </View>
            <View style={styles.container}>
                <Text bold style={styles.alert}>Causion: Bitcoin payments are irriversable</Text>
                <SwipeButton onToggle={handleToggle} />
                {/* <GradientButton style={styles.invoiceButton} textStyle={{ fontFamily: 'Lato-Medium', }} title="Send" onPress={sendClickHandler} /> */}
            </View>
        </ScreenLayout>
    )
}