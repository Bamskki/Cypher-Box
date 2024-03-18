import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { Blink } from "@Cypher/assets/images";
import { GradientButton, GradientText } from "@Cypher/components";
import Description from "./Description";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

export default function InfoBlink() {

    const nextClickHandler = () => {
        dispatchNavigate('DownloadBlink');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={0}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Checking Account</GradientText>
                    <Text h4 style={styles.descption}>The bitcoin custodian bank you’re about to use is called Blink. Here are some useful things you may want to know about it:</Text>


                    <Text h4 bold style={styles.alertText2}>Regulated in El Salvador 🇸🇻</Text>
                    <Description text="Up to $2000 storage limit without KYC" />
                    <Description text="Intraledger (between Blink users): 0%" />
                    <Description text="Sending fees: ~0.02%" />
                    <Description text="Receiving fees: 0%" />
                    <Description text="Funds secured in multi-sig cold storage" />
                    <Description text="Free Lightning Address" />

                    <Text h4 style={styles.alertText}>
                        Email: support@blink.sv{'\n'}
                        Whatsapp: +503 6983 5117{'\n'}
                        Telephone support: +503 7208 9187{'\n'}
                        Website: www.blink.sv{'\n'}
                        X: @blinkbtc</Text>
                </View>
                <Image source={Blink} style={styles.image} resizeMode="contain" />
                <GradientButton title="Next" onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
