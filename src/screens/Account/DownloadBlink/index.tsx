import React from "react";
import { Linking, Platform, View } from "react-native";
import styles from "./styles";
import { GradientText } from "@Cypher/components";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";

export default function DownloadBlink() {

    const loginClickHandler = () => {
        dispatchNavigate('LoginBlink');
    }

    const appleStoreClickHandler = () => {
        const link =
            Platform.OS === 'android' ?
                'https://play.google.com/store/apps/details?id=com.galoyapp' :
                'https://apps.apple.com/ng/app/blink-bitcoin-beach-wallet/id1531383905'
        Linking.canOpenURL(link).then(supported => {
            supported && Linking.openURL(link);
        }, (err) => console.log(err));
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={0}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Download Blink</GradientText>
                    <Text h4 style={styles.descption}>To use Cypher Box, you should download Blink wallet from the app store and register your account by providing them with your phone number.</Text>
                    <Button onPress={appleStoreClickHandler} text="Download Blink wallet" leftIcon="logo-apple" textStyle={{color:colors.black.default}}/>
                </View>
                <Text style={styles.info}>If you’ve manged to create a account, or already have an existing account on Blink, you can login now!</Text>
                <Button onPress={loginClickHandler} text="Login" style={styles.login} textStyle={{color:colors.black.default}}/>
            </View>
        </ScreenLayout>
    )
}
