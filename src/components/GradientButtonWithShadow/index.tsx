import { Copy } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";
import { colors, shadow } from "@Cypher/style-guide";
import React from "react";
import {
  ButtonProps,
  Image,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Shadow } from "react-native-neomorph-shadows";
import styles from "./styles";

interface Props extends ButtonProps, TouchableOpacityProps {
  onPress?(): void;
  title: string;
  disabled?: boolean;
  isShadow?: boolean;
  isTextShadow?: boolean;
  isIcon?: boolean;
  isBorder?: boolean;
  textStyle?: TextStyle;
  icon?: number;
  isShadowTopColor?: boolean;
  isShadowBottomColor?: boolean;
}

export default function GradientButtonWithShadow({
  onPress,
  disabled = false,
  title,
  style,
  isShadow,
  isTextShadow,
  isIcon = false,
  isBorder = false,
  textStyle,
  icon = 0,
  isShadowTopColor,
  isShadowBottomColor
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.linearGradient, isShadow && shadow.shadow25, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={
          disabled
            ? [colors.gray.light, colors.gray.light]
            : [colors.black.gradientTop, colors.black.gradientBottom]
        }
        style={[styles.linearGradient, isBorder && styles.border, isIcon && styles.pureview, style]}
      >
        <Shadow
          inner // <- enable inner shadow
          useArt // <- set this prop to use non-native shadow on ios
          style={StyleSheet.flatten([styles.shadow, isShadowTopColor && { shadowColor: '#909090', }])}
        >
          {icon != 0 &&
            <Image
              style={icon == 1 ? styles.arrowLeft : styles.arrowRight}
              resizeMode="contain"
              source={require("../../../img/arrow-right.png")}
            />
          }
          <Text
            bold
            h3
            center
            style={StyleSheet.flatten([
              isTextShadow && shadow.text25,
              textStyle,
              icon != 0 ? icon == 1 ? { marginStart: 20 } : { marginEnd: 20 } : {}
            ])}
          >
            {title}
          </Text>
          {isIcon && <Image source={Copy} resizeMode="contain" />}
          <Shadow
            inner // <- enable inner shadow
            useArt // <- set this prop to use non-native shadow on ios
            style={StyleSheet.flatten([styles.innerShadow, isShadowBottomColor && { shadowColor: '#8A8A8A', shadowOpacity: 0.64, }])} />
        </Shadow>
      </LinearGradient>
    </TouchableOpacity>
  );
}
