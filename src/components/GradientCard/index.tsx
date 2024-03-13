import React, { ReactNode } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { colors } from "@Cypher/style-guide";

interface Props {
    children: ReactNode;
    disabled?: boolean;
    start?: { x: number, y: number };
    end?: { x: number, y: number };
    style?: ViewStyle;
    onPress?(): void;
    colors_?: string[];
    linearStyle?: ViewStyle;
}

export default function GradientCard({
    style,
    children,
    disabled,
    onPress,
    start = { x: 0, y: 1 },
    end = { x: 1, y: 1 },
    colors_,
    linearStyle,
}: Props) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.shadow, style && style]}>
            <LinearGradient
                start={start}
                end={end}
                style={[styles.linearGradient, linearStyle]}
                colors={colors_ ? colors_ : [colors.pink.extralight, colors.pink.default]}>
                {children}
            </LinearGradient>
        </TouchableOpacity>)
}