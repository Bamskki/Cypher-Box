import React from "react";
import { Linking, Platform, View } from "react-native";
import styles from "./styles";
import { GradientText, HeaderBackButton, Progress } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";

export default function DownloadBlink({navigation}: any) {
    const { navigate } = useNavigation();

    const loginClickHandler = () => {
        navigation.navigate('LoginBlink');
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
                    <Text h4 style={styles.descption}>To use Cypher Bank, you should download Blink wallet from the app store and register your account by providing them with your phone number.</Text>
                    <Button onPress={appleStoreClickHandler} text="Download Blink wallet" leftIcon="logo-apple" />
                </View>
                <Text style={styles.info}>If you’ve manged to create a account, or already have an existing account on Blink, you can login now!</Text>
                <Button onPress={loginClickHandler} text="Login" style={styles.login} />
            </View>
        </ScreenLayout>
    )
}
