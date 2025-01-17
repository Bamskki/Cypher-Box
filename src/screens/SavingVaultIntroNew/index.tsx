import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import LinearGradient from "react-native-linear-gradient";

export default function SavingVaultIntroNew() {

    const riskClickHandler = () => {
        console.log('next click');
        dispatchNavigate('CreateVault');
    }

    const homeClickHandler = () => { }

    return (
        <ScreenLayout showToolbar>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text bold subHeader style={styles.title}>Savings Vault</Text>
                    <Text bold h3 style={styles.descption}><Text bold h3 style={StyleSheet.flatten([styles.descption, { color: '#FFC92C' }])}>Careful: </Text>This features is highly advanced and may lead to a loss of access to your funds. Cypher Box will gradually guide you through proper security measures and allow you to create vaults as you progress in your bitcoin journey.</Text>
                    <Text bold h3 style={StyleSheet.flatten([styles.descption, { color: colors.green, marginTop: 0 }])}>
                        <Text bold h3 >
                            Already have one?
                        </Text> Recover
                    </Text>
                </View>
                <Button text="Home" onPress={homeClickHandler} style={styles.button} textStyle={styles.btnText} />
                <TouchableOpacity onPress={riskClickHandler}>
                    <LinearGradient
                        colors={[colors.black.top, colors.black.bottom]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.25, 1]}
                        style={styles.linearGradient}>
                        <Text h3 style={styles.buttonText}>
                            I understand the risks
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
