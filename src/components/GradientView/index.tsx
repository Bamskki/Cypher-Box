import { colors, shadow } from "@Cypher/style-guide";
import React, { ReactNode } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

interface Props extends TouchableOpacityProps {
    onPress?(): void;
    isShadowTopColor?: boolean;
    isShadowBottomColor?: boolean;
    children: ReactNode;
    topShadowStyle: any;
    bottomShadowStyle: any;
    linearGradientStyle?: any;
    linearGradientStyleMain?: any;
    gradiantColors?: string[];
    isShadow?: boolean;
}


/**
 * Strip shadow-only keys, keep everything else.
 *
 * The `topShadowStyle` / `bottomShadowStyle` props this component takes are not
 * pure decoration: callers put the button's width, height, border radius and
 * alignment in them too. Dropping the styles wholesale would resize every
 * button in the app; keeping them wholesale would draw the very shadow being
 * removed.
 */
function layoutOnly(input: any) {
    const flat = StyleSheet.flatten(input) ?? {};
    const {
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        elevation,
        ...rest
    } = flat as Record<string, unknown>;
    return rest;
}

export default function GradientView({
    onPress,
    disabled = false,
    style,
    children,
    topShadowStyle,
    bottomShadowStyle,
    linearGradientStyle,
    linearGradientStyleMain,
    isShadow = false,
    gradiantColors = [colors.black.gradientTop, colors.black.gradientBottom],
}: Props) {
    return (
        <TouchableOpacity
            style={[styles.linearGradient, isShadow && shadow.shadow25, style]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={linearGradientStyle}>
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={
                        disabled
                            ? [colors.gray.light, colors.gray.light]
                            : gradiantColors
                    }
                    style={[styles.linearGradient, linearGradientStyleMain]}
                >
                    {/* NO neumorphic rim. react-native-neomorph-shadows draws
                        its inset rim through ART, which New Arch removed, so on
                        RN 0.77 Fabric its `useArt` fallback paints a flat
                        translucent overlay across its own bounds instead. That
                        overlay is the green/blue haze reported over these
                        button labels, and it was never the effect anyone asked
                        for: it is the library failing.

                        A previous pass moved the inner Shadow above {children}
                        so the tint stopped covering the text. That helped but
                        left the outer Shadow still painting, so the haze stayed,
                        just behind the label rather than over it. Both are gone
                        now.

                        The wrapper survives as a plain View because these style
                        objects carry LAYOUT as well as shadow (width, height,
                        borderRadius, justifyContent), and 35 call sites depend
                        on that sizing. `layoutOnly` keeps the geometry and drops
                        the shadow keys, which also stops React Native drawing a
                        real iOS shadow from them: several callers pass
                        `shadowOpacity: 2`, which is outside the valid 0..1
                        range and would render at full strength. */}
                    <View style={layoutOnly([styles.shadow, topShadowStyle])}>
                        {children}
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
}
