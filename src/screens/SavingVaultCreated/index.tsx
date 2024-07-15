import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import { PrivateKeyGenerater, SavingVault } from "@Cypher/components";

export default function SavingVaultCreated() {
    const [isValidate, setIsValidate] = useState(false);

    const nextClickHandler = () => {
        console.log('next click');
        dispatchNavigate('HomeScreen', {
            isComplete: true
        });
    }

    const nextClickInitiate = () => {
        setIsValidate(true);
    }

    return (
        <ScreenLayout showToolbar progress={2} color={[colors.green, colors.green]} isBackButton={false} isClose>
            <View style={styles.container}>
                <Text style={styles.title} center>Savings Vault Created!</Text>
                <View style={styles.inner}>
                    <SavingVault />
                    <Text h4 style={styles.descption}>Remember to keep your seed phrase safe, it's your responsibility!
                        {'\n\n'}
                        Each slot represents  a materialized coin (UTXO). Advanced security features will be unlocked once you fill these slots with enough coins. You can always store beyond 5 coins and you adjust the number of slots  in the Savings Vault menu. Tap ‘Secure Funds’ to do your first settlement transaction!
                    </Text>
                </View>
                <Button text="Home"
                    onPress={nextClickHandler}
                    style={styles.button}
                    textStyle={styles.btnText}
                />
            </View>
        </ScreenLayout>
    )
}
