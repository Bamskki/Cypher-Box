import React from "react";
import { ButtonProps, Image, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "@Cypher/style-guide";
import styles from "./styles";
import { Copy } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";

interface Props extends ButtonProps, TouchableOpacityProps {
    onPress?(): void;
    title: string;
    disabled?: boolean;
    isShadow?: boolean;
    isTextShadow?: boolean;
    isIcon?: boolean;
    textStyle?: TextStyle;
}

export default function GradientButton({ onPress, disabled = false, title, style, isShadow, isTextShadow, isIcon = false, textStyle }: Props) {
    return (
        <TouchableOpacity style={[styles.linearGradient, isShadow && styles.shadow, style]}
            onPress={onPress}
            disabled={disabled}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={disabled ? [colors.gray.light, colors.gray.light] : [colors.pink.light, colors.pink.default]} style={[styles.linearGradient, isIcon && styles.pureview, style]}>
                <Text h3 style={StyleSheet.flatten([styles.buttonText, isTextShadow && styles.textShadow, textStyle])}>{title}</Text>
                {isIcon &&
                    <Image source={Copy} resizeMode="contain" />
                }
            </LinearGradient>
        </TouchableOpacity>
    );
};