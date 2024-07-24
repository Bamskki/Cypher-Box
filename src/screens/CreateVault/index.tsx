import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import LinearGradient from "react-native-linear-gradient";
import SavingVault from "../SavingVault";
import { Shadow } from "react-native-neomorph-shadows";
import { Back } from "@Cypher/assets/images";
import LinearGradientButton from "./LinearGradientButton";

export default function CreateVault() {

    const hotVaultClickHandler = () => { }

    const coldVaultClickHandler = () => { }

    return (
        <ScreenLayout showToolbar>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text bold subHeader style={styles.title}>Hot Storage Threshold</Text>
                    <LinearGradientButton warningText='⚠  Intermediate' text='Create Hot Vault' onPress={hotVaultClickHandler} />
                    <LinearGradientButton warningText='⚠  Advanced' text='Create Cold Vault' onPress={hotVaultClickHandler} />
                </View>
            </View>
        </ScreenLayout>
    )
}
