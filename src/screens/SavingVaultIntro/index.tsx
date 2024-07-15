import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";

export default function SavingVaultIntro() {

    const nextClickHandler = () => {
        console.log('next click');
        dispatchNavigate('SavingVault');
    }

    return (
        <ScreenLayout showToolbar progress={0} color={[colors.green, colors.green]}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text style={styles.title}>Savings Vault</Text>
                    <Text h4 style={styles.descption}>Savings Vault, commonly known as a ‘hot wallet’, allows you to become the sole owner of your bitcoin, as the saying goes: Not your keys, not your coins. Money stored in this vault will be secured by the main Bitcoin network, not by a third party custodian.
                        {'\n\n'}
                        To create a Savings Vault, you first need to generate your keys: your phone will  create the private key, encrypt it, and store it in a securely in its memory.  It will also create  a backup copy , just in case you lose access to your phone.
                        {'\n\n'}
                        The backup looks like a series of 12 words. You need to write down them on a piece of paper and store them in a secure location(s).
                    </Text>
                </View>
                <Button text="Generate Private Key" onPress={nextClickHandler} style={styles.button} textStyle={styles.btnText} />
            </View>
        </ScreenLayout>
    )
}
