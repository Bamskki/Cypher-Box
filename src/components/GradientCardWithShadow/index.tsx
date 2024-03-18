import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { colors } from "@Cypher/style-guide";
import { Shadow } from "react-native-neomorph-shadows";

interface Props {
    children: ReactNode;
    disabled?: boolean;
    start?: { x: number, y: number };
    end?: { x: number, y: number };
    style?: ViewStyle;
    onPress?(): void;
    colors_?: string[];
    linearStyle?: ViewStyle;
    shadowStyleTop?: any;
    shadowStyleBottom?: any;
}

export default function GradientCardWithShadow({
    style,
    children,
    disabled,
    onPress,
    start = { x: 0, y: 1 },
    end = { x: 1, y: 1 },
    colors_,
    linearStyle,
    shadowStyleTop,
    shadowStyleBottom,
}: Props) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.view, style && style]}>
            <LinearGradient
                start={start}
                end={end}
                style={[styles.linearGradient, linearStyle]}
                colors={colors_ ? colors_ : [colors.pink.extralight, colors.pink.default]}>
                    <Shadow
                        inner // <- enable inner shadow
                        useArt // <- set this prop to use non-native shadow on ios
                        style={StyleSheet.flatten([styles.shadow , shadowStyleTop])}>
                {children}
                <Shadow
                    inner // <- enable inner shadow
                    useArt // <- set this prop to use non-native shadow on ios
                    style={StyleSheet.flatten([styles.innerShadow, shadowStyleBottom])}/>
                </Shadow>
            </LinearGradient>
        </TouchableOpacity>)
}