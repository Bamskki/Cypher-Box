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
import { colors, shadow } from "@Cypher/style-guide";
import styles from "./styles";
import { Copy } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";
import { Shadow } from "react-native-neomorph-shadows";

interface Props extends ButtonProps, TouchableOpacityProps {
  onPress?(): void;
  title: string;
  disabled?: boolean;
  isShadow?: boolean;
  isTextShadow?: boolean;
  isIcon?: boolean;
  textStyle?: TextStyle;
}

export default function GradientButtonWithShadow({
  onPress,
  disabled = false,
  title,
  style,
  isShadow,
  isTextShadow,
  isIcon = false,
  textStyle,
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
            : [colors.pink.light, colors.pink.default]
        }
        style={[styles.linearGradient, isIcon && styles.pureview, style]}
      >
        <Shadow
          inner // <- enable inner shadow
          useArt // <- set this prop to use non-native shadow on ios
          style={styles.shadow}
        >
          <Text
            bold
            h3
            center
            style={StyleSheet.flatten([
              isTextShadow && shadow.text25,
              textStyle,
            ])}
          >
            {title}
          </Text>
          {isIcon && <Image source={Copy} resizeMode="contain" />}
          <Shadow
            inner // <- enable inner shadow
            useArt // <- set this prop to use non-native shadow on ios
            style={styles.innerShadow}/>
        </Shadow>
      </LinearGradient>
    </TouchableOpacity>
  );
}
