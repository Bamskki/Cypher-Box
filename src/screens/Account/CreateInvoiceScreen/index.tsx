import { Image, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "@Cypher/style-guide";
import { Currency, Sats } from "@Cypher/assets/images";

type RootStackParamList = {
  CheckingAccount: { fromField: "withdraw" | "reserve" };
};

type RouteProps = RouteProp<RootStackParamList, "CheckingAccount">;

enum ECurrencyType {
  SATS = "sats",
  USD = "USD",
}

const CreateInvoiceScreen = () => {
  const route = useRoute<RouteProps>();
  const fromField: "withdraw" | "reserve" = route.params?.fromField;

  const [amount, setAmount] = useState<any>(20);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<ECurrencyType>(ECurrencyType.SATS);

  const inActiveColors: string[] = [colors.gray.charcoal, colors.gray.charcoal];
  const activeColors: string[] = [
    colors.gray.metallic,
    colors.gray.metallic,
    colors.gray.metallicLight,
  ];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTabChange = () => {
    setSelectedTab(
      selectedTab === ECurrencyType.SATS
        ? ECurrencyType.USD
        : ECurrencyType.SATS
    );
  };

  const RenderTabs: React.FC<any> = ({
    text,
    tabType,
    imageSource,
    handleTabChange,
  }) => {
    const isActive = selectedTab === tabType;
    const bgColors = isActive ? activeColors : inActiveColors;
    return (
      <TouchableOpacity
        key={tabType}
        activeOpacity={0.8}
        onPress={handleTabChange}
        style={styles.tab}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={bgColors}
          style={[
            styles.gradient,
            isActive && {
              borderWidth: 1,
              borderColor: colors.black.border,
            },
            !isActive && {
              opacity: 0.65,
              backgroundColor: colors.gray.charcoal,
            },
          ]}
        >
          <Image
            source={imageSource}
            resizeMode="contain"
            style={[
              styles.image,
              tabType === ECurrencyType.SATS && {
                marginTop: 8,
              },
            ]}
          />

          <Text bold h3 style={styles.tabText}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout
      showToolbar
      isBackButton
      title={fromField === "reserve" ? "Reserve Amount" : "Withdraw Threshold"}
      style={styles.screen}
    >
      <View style={styles.container}>
        <View style={[styles.inputMain, isFocused && styles.focusedInput]}>
          <View style={styles.input}>
            <TextInput
              value={`${amount} ${fromField === "reserve" ? "K" : " M"}`}
              onChangeText={(value) => {
                setAmount(value);
              }}
              keyboardType="number-pad"
              style={styles.textInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>

          <Text h2 bold white style={styles.label}>
            sats{" "}
          </Text>
        </View>

        <Text h2 bold white style={styles.dollar}>
          {`$${2000 / amount}`}
        </Text>

        <View style={styles.tabView}>
          <RenderTabs
            text="Sats"
            tabType={ECurrencyType.SATS}
            imageSource={Sats}
            handleTabChange={handleTabChange}
          />
          <RenderTabs
            text="USD"
            tabType={ECurrencyType.USD}
            imageSource={Currency}
            handleTabChange={handleTabChange}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default CreateInvoiceScreen;
