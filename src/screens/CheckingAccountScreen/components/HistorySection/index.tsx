import React from "react";
import { Text } from "@Cypher/component-library";
import { Image, SectionList, View } from "react-native";
import { Neomorph as Shadow } from "react-native-neomorph-shadows";
import { HISTORY_DATA } from "./data";
import styles from "./styles";
import { Electricity } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";

const HistorySection = () => {
  return (
    <SectionList
      sections={HISTORY_DATA}
      style={styles.list}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={true}
      keyExtractor={(item, index) => `${item.text}-${index}`}
      renderItem={({ item }) => {
        const satsAmount = item?.amount ? item.amount.substring(0, 4) : null;
        const amountSign = item.type === "sent" ? "+" : "-";
        const dollarAmount = item?.amountInDollars
          ? item.amountInDollars.substring(0, 4)
          : null;
        const textColor = {
          color: item.type === "sent" ? colors.green : colors.red,
        };

        return (
          <Shadow
            style={styles.soap}
            inner
            swapShadows
            darkShadowColor={colors.tundora}
            lightShadowColor={colors.black.default}
          >
            <View style={styles.top}>
              <Image
                source={Electricity}
                style={styles.electricity}
                resizeMode="contain"
              />

              <Text style={styles.text} white h3 bold numberOfLines={1}>
                {item.text}
              </Text>
              <Text h3 bold numberOfLines={1} style={textColor}>
                {`${amountSign}${satsAmount} sats`}
              </Text>
            </View>

            <View style={styles.bottom}>
              <Text h4 bold numberOfLines={1} style={textColor}>
                {`$ ${dollarAmount}`}
              </Text>
            </View>
          </Shadow>
        );
      }}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.section}>
          <View style={styles.sectionLine} />
          <Text white h4 bold>
            {title}
          </Text>
          <View style={styles.sectionLine} />
        </View>
      )}
    />
  );
};

export default HistorySection;
