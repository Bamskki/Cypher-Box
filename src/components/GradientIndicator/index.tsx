import React from "react";
import { Touchable, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { colors } from "@Cypher/style-guide";
import LinearGradient from "react-native-linear-gradient";

interface Props {
  containerWidth: number;
  containerHeight: number;
  subContainerWidth: number;
  subContainerHeight: number;
  containerBorderColor: string;
  subContainerBorderColor: string;
  subContainerPadding: number;
  containerMarginRight?: number;
  onSelectCapsule?: (index: number) => void;
  item?: any;
}

export default function GradientIndicator({
  containerWidth,
  containerHeight,
  subContainerWidth,
  subContainerHeight,
  containerBorderColor,
  subContainerBorderColor,
  subContainerPadding,
  containerMarginRight,
  onSelectCapsule,
  item,
}: Props) {
  return (
    <TouchableOpacity
      onPress={() => onSelectCapsule && onSelectCapsule(item?.index)}
      style={{
        width: containerWidth,
        height: containerHeight,
        borderColor: item?.isSelected ? colors.green : containerBorderColor,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: containerMarginRight,
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: subContainerWidth,
          height: subContainerHeight,
          borderColor: subContainerBorderColor,
          borderWidth: 1,
          padding: subContainerPadding,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={[colors.greenLight94, colors.greenDark94]}
          style={[styles.linearGradient2, { width: subContainerWidth - 8 }]}
        />
      </View>
    </TouchableOpacity>
  );
}
