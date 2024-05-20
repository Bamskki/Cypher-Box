import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { CoinOS } from "@Cypher/assets/images";
import { GradientButton, GradientText } from "@Cypher/components";
import Description from "./Description";
import { ScreenLayout, Text, TextLink } from "@Cypher/component-library";
import { dispatchNavigate, openUrl } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";

export default function InfoBlink() {

    const nextClickHandler = () => {
        console.log('create coinos account click');
        dispatchNavigate('CreateCoinOSScreen');
    }

    const websiteClickHandler = (type: string) => {
        console.log(`${type} click`);
        switch (type) {
            case 'website':
            case 'xaccount':
                openUrl('https://coinos.io/');
            case 'telegram':
                openUrl('https://t.me/coinoswallet');
            case 'email':
                openUrl('support@coinos.io');
                break;
            case 'here':
                openUrl('https://amboss.space/node/02868e12f320073cad0c2959c42559fbcfd1aa326fcb943492ed7f02c9820aa399');
                break;
            default:
                break;
        }
    }

    return (
        <ScreenLayout showToolbar progress={0}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Checking Account</GradientText>
                    <Text h4 style={styles.descption}>The first bitcoin custodian bank you’re about to use is called Coinos. Here are some useful things you may want to know about it:</Text>


                    <Text h4 bold style={styles.alertText2}>Regulated in Canada 🇨🇦</Text>
                    <Description text="Requirements: email and password only" />
                    <Description text="Non-KYC" />
                    <Description text="Intraledger (between Coinos users): free" />
                    <Description text="Send and receive fees: free" />
                    <Description text="Settlement and Top-up fees: 0.1%" />
                    <Description text="Node security: unknown" />
                    <View style={{ flexDirection: 'row',alignSelf:'flex-start' }}>
                        <Description text="Audit node " />
                        <TextLink text="here" style={{borderColor:colors.pink.light}} textStyle={styles.link} onPress={() => websiteClickHandler('here')} />
                    </View>
                    <View style={{ marginVertical: 20, alignSelf: 'flex-start' }}>
                        <TextLink text="Website" onPress={() => websiteClickHandler('website')} />
                        <TextLink text="Telegram" onPress={() => websiteClickHandler('telegram')} />
                        <TextLink text="X account" onPress={() => websiteClickHandler('xaccount')} />
                        <TextLink text="Email" onPress={() => websiteClickHandler('email')} />
                    </View>
                </View>
                <Image source={CoinOS} style={styles.image} resizeMode="contain" />
                <GradientButton title="Next" onPress={nextClickHandler} />
            </View>
        </ScreenLayout>
    )
}
