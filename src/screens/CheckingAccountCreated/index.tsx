import React, { useState } from "react";
import { ScrollView, View, Text as RNText } from "react-native";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { colors } from "@Cypher/style-guide";
import { SavingVault } from "@Cypher/components";
import useAuthStore from "@Cypher/stores/authStore";
import { dispatchReset } from "@Cypher/helpers/navigation";
import styles from "./styles";

export default function CheckingAccountCreated() {
    const [isValidate, setIsValidate] = useState(false);
    const { vaultTab, strikeToken, strikeMe } = useAuthStore();

    const nextClickHandler = () => {
        console.log('next click');
        if(vaultTab){
            dispatchReset('HomeScreen');
        } else {
            dispatchReset('HomeScreen', {
                isComplete: true
            });
        }
    }

    const nextClickInitiate = () => {
        setIsValidate(true);
    }

    console.log('strikeMe: ', strikeMe)
    return (
        <ScreenLayout disableScroll showToolbar progress={2} color={[colors.pink.light, colors.pink.light]} isBackButton={false} isClose onBackPress={nextClickHandler}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.pink.light }]} center>{"Checking Account Created!"}</Text>
                <View style={styles.inner}>
                    <SavingVault title={"Checking Account"} />
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <Text h4 style={[styles.descption, { fontSize: 14, marginTop: 30 }]}>Your Checking Account has been created. You can receive bitcoin using your unique Lightning Address:{'\n\n'}</Text>
                        <Text style={{ width: '100%', fontSize: 24, paddingTop: 10, fontWeight: 'bold',  textAlign: 'center' }}>{strikeMe && strikeMe?.username+'@strike.me'}</Text>
                        <Text h4 style={[styles.descption, { fontSize: 14, marginTop: 30 }]}>The interactive bar display helps you visualize your Checking Account's balance, showing a threshold above which storing bitcoin in an exchange carries increased counter-party risk.</Text>
                        <Text h4 style={[styles.descption, { fontSize: 14, marginTop: 30 }]}>You can deposit money beyond the threshold, but remember, you are relying on a third-party custodian. Withdraw your accumulated funds once you fill the bar slot (set to 2.1 million sats by default but you can adjust it in the settings).</Text>
                    </ScrollView>
                </View>
            </View>
            <Button text="Home"
                onPress={nextClickHandler}
                style={{...styles.button, ...{ backgroundColor: colors.pink.light, marginTop: vaultTab ? 30 : 0 } }}
                textStyle={styles.btnText}
            />
        </ScreenLayout>
    )
}
