import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import { PrivateKeyGenerater, Tips } from "@Cypher/components";

export default function SavingVault() {
    const [isValidate, setIsValidate] = useState(false);
    const nextClickHandler = () => {
        dispatchNavigate('SavingVaultCreated');
    }

    const nextClickInitiate = () => {
        setIsValidate(true);
    }

    return (
        <ScreenLayout showToolbar progress={1} color={[colors.green, colors.green]} isBackButton={false} isClose>
            <View style={styles.container}>
                <Text style={styles.title} center>Private Key Generated</Text>
                <Text h4 style={styles.descption} center>Write  this backup copy on a piece of paper</Text>
                <PrivateKeyGenerater callNext={nextClickInitiate} />
                <Tips />
                <Button text="Ok, I write it down!"
                    onPress={nextClickHandler}
                    style={styles.button}
                    textStyle={styles.btnText}
                    disabled={!isValidate}
                />
            </View>
        </ScreenLayout>
    )
}
