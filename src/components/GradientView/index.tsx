import React, { ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "@Cypher/style-guide";
import styles from "./styles";
import { Shadow } from "react-native-neomorph-shadows";

interface Props extends TouchableOpacityProps {
  onPress?(): void;
  isShadowTopColor?: boolean;
  isShadowBottomColor?: boolean;
  children: ReactNode;
  topShadowStyle: any;
  bottomShadowStyle: any;
  linearGradientStyle?: any;
  linearGradientStyleMain?: any;
  isShadow?: boolean;
  btnBorder?: string;
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
  isShadow = true,
  btnBorder = colors.green,
}: Props) {
  const shadowView = () => {
    return (
      <Shadow
        inner // <- enable inner shadow
        useArt // <- set this prop to use non-native shadow on ios
        style={StyleSheet.flatten([styles.shadow, topShadowStyle])}
      >
        {children}
        <Shadow
          inner // <- enable inner shadow
          useArt // <- set this prop to use non-native shadow on ios
          style={StyleSheet.flatten([styles.innerShadow, bottomShadowStyle])}
        />
      </Shadow>
    );
  };
  return (
    <View>
      <TouchableOpacity
        style={[styles.linearGradient, style]}
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
                : ["#333333", "#282727"]
            }
            style={[
              styles.linearGradient,
              linearGradientStyleMain,
              {
                borderColor: btnBorder,
                borderWidth: 2,
                borderRadius: 13,
              },
            ]}
          >
            {isShadow ? shadowView() : children}
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
}
