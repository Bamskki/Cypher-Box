import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { colors } from "@Cypher/style-guide";
import LinearGradient from "react-native-linear-gradient";
import { Shadow } from "react-native-neomorph-shadows";
import { Back } from "@Cypher/assets/images";

interface Props {
    text: string;
    warningText: string;
    onPress(): void;
}
export default function LinearGradientButton({ onPress, warningText, text }: Props) {

    return (
        <TouchableOpacity style={[styles.main]} onPress={onPress}>
            <View style={[styles.innerContainer]}>
                <Shadow
                    style={StyleSheet.flatten([styles.shadowTopBottom])}
                    inner
                    useArt
                >
                    <LinearGradient
                        colors={[colors.black.top, colors.black.bottom]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.25, 1]}
                        style={styles.linearGradient}>
                        <Text bold h4 style={styles.buttonText}>{warningText}</Text>
                        <View style={styles.middle}>
                            <Text bold subHeader>{text}</Text>
                            <Image source={Back} style={styles.image} />
                        </View>
                    </LinearGradient>
                    <Shadow
                        inner
                        useArt
                        style={StyleSheet.flatten([styles.shadowBottomBottom])}
                    />
                </Shadow>
            </View>
        </TouchableOpacity>
    )
}
// ⚠  Intermediate