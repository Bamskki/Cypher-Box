import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import { PrivateKeyGenerater, SavingVault } from "@Cypher/components";
import useAuthStore from "@Cypher/stores/authStore";
import { dispatchReset } from "@Cypher/helpers/navigation";

export default function SavingVaultCreated() {
    const [isValidate, setIsValidate] = useState(false);
    const { vaultTab } = useAuthStore();

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

    return (
        <ScreenLayout disableScroll showToolbar progress={2} color={vaultTab ? [colors.blueText, colors.blueText] : [colors.green, colors.green]} isBackButton={false} isClose onBackPress={nextClickHandler}>
            <View style={styles.container}>
                <Text style={[styles.title, vaultTab ? { color: colors.blueText } : { }]} center>{vaultTab ? "Cold Storage Vault Created!" : "Savings Vault Created!"}</Text>
                <View style={styles.inner}>
                    <SavingVault title={vaultTab ? "Cold Vault" : "Savings Vault"} />
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        {vaultTab ?
                            <>
                                <Text h4 style={[styles.descption, { fontSize: 14, marginTop: 30 }]}>Remember to keep your seed phrase safe, it's your responsibility!
                                    {'\n\n'}
                                    This is a Watch-only vault, meaning you can only inspect its balance and grab addresses from it for deposits, but in order to send out funds you need to ‘sign’ or authorize  transactions using your hardware device.
                                    {'\n\n'}
                                    ⚠️ DO NOT use any of its addresses without verifying their authenticity from your  hardware device!
                                    {'\n\n'}
                                    When Bitcoin Network fees become moderately low, you can select the capsules accumulated in your Hot Vault and transfer them to your Cold Storage Vault using the “Move to Cold Vault” button.
                                </Text>
                            </>
                        :
                            <Text h4 style={styles.descption}>Remember to keep your seed phrase safe, it's your responsibility!
                                {'\n\n'}
                                Each slot represents  a materialized coin (UTXO). Advanced security features will be unlocked once you fill these slots with enough coins. You can always store beyond 5 coins and you adjust the number of slots  in the Savings Vault menu. Tap ‘Secure Funds’ to do your first settlement transaction!
                            </Text>
                        }
                    </ScrollView>
                </View>
            </View>
            <Button text="Home"
                onPress={nextClickHandler}
                style={{...styles.button, ...{ backgroundColor: vaultTab ? colors.blueText : colors.green, marginTop: vaultTab ? 30 : 0 } }}
                textStyle={styles.btnText}
            />
        </ScreenLayout>
    )
}
