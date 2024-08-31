import React from "react";
import { View } from "react-native";
import GradientCard from "../GradientCard";
import styles from "./styles";
import { colors } from "@Cypher/style-guide";
import { Input, Text } from "@Cypher/component-library";

interface Props {
  sats: string;
  setSats(val: string): void;
  usd: string;
  isSats: boolean;
  style?: any;
  gradient?: string[];
  unit?: string;
}

export default function GradientInput({
  sats,
  setSats,
  usd,
  isSats,
  style,
  gradient,
  unit,
}: Props) {
  let gradientColors = [colors.gray.thin, colors.gray.thin2];
  if (sats) {
    gradientColors = [colors.pink.extralight, colors.pink.default];
  } else if (gradient) {
    gradientColors = gradient;
  }
  let currencyUnit = isSats ? "sats" : "$";
  if (unit) currencyUnit = unit;

  return (
    <>
      <View style={[styles.priceView, style]}>
        <GradientCard
          style={styles.card}
          colors_={gradientColors}
          linearStyle={styles.lGradient}
        >
          <Input
            onChange={setSats}
            value={sats}
            keyboardType="number-pad"
            editable={false}
            textInpuetStyle={styles.input}
          />
        </GradientCard>
        <Text style={isSats ? styles.btc : styles.dollar}>{currencyUnit}</Text>
      </View>
      {isSats ? (
        <Text style={styles.inDollar}>${usd}</Text>
      ) : (
        <Text style={styles.inDollar}>{usd} sats</Text>
      )}
    </>
  );
}
