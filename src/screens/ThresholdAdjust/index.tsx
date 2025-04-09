import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { GradientButton, } from "@Cypher/components";
import Description from "./Description";
import { Shadow } from "react-native-neomorph-shadows";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "@Cypher/style-guide";

interface Props {
    navigation: any;
}

export default function ThresholdAdjust({navigation}:Props) {

    return (
        <ScreenLayout isBackButton={false} showToolbar title="Withdrawal Threshold">
            <View style={styles.container}>
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
                <View style={styles.main}>
                    <Text h4 style={styles.text}>You can adjust the threshold at which you can withdraw and materialize the money accumulated on your Lightning Account.</Text>
                    <View style={styles.extra} />
                    <Text h4 style={styles.text}>Be aware that adjusting this threshold involves balancing Bitcoin network fees against counter-party risk:</Text>
                    <View style={styles.extra} />
                    <Description text="Increasing the threshold will reduce the percentage fee for withdrawals but it may introduce greater counter-party risk since funds in your Lightning Account are maintained by a centralized custodian. A higher threshold means your assets are under their control for an extended period, increasing the risk associated with their custody." />
                    <Description text="Decreasing the threshold may reduce counter-party risk but will result in a higher percentage fee for withdrawals" />
                    <View style={styles.extra} />
                    <Text h4 style={styles.text}>Note that this threshold will determine the size of each coin you will secure later in your Savings Vault and a small threshold may lead to a greater number of coins (UTXOs) which can also elevate the fees for future on-chain transactions, such as when transferring your coins to Cold Storage.</Text>
                    <View style={styles.extra} />
                    <Text h4 style={styles.text}>You should also consider setting aside a ‘Reserve Amount’  which is an amount to be left in your Lightning Account after the settlement is completed. This will help you retain the ability to send and spend bitcoin cheaply using the Lightning Network.</Text>
                </View>
                <GradientButton style={styles.invoiceButton} textStyle={{ fontFamily: 'Lato-Medium', }} title="Adjust Threshold" onPress={() => { navigation.pop(2)}} />
            </View>
        </ScreenLayout>
    )
}
