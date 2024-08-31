import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import {
  CommonBtn,
  CustomKeyboard,
  CustomKeyboardNew,
  GradientCard,
  GradientInput,
  GradientInputNew,
} from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";
import { bitcoinRecommendedFee } from "../../api/coinOSApis";

export function startsWithLn(str: string) {
  // Check if the string starts with "ln"
  return str.startsWith("ln");
}

export default function TopUpTransactionDetails({ navigation, route }: any) {
  const [isSats, setIsSats] = useState(true);
  const [sats, setSats] = useState("");
  const [usd, setUSD] = useState("");
  const [sender, setSender] = useState("");
  const senderRef = useRef<TextInput>(null);

  const nextClickHandler = () => {
    route?.params?.setSats(sats, usd);
    navigation?.pop();
  };

  const maxSendClickHandler = () => {};

  return (
    <ScreenLayout disableScroll showToolbar isBackButton>
      <ScrollView style={styles.container}>
        <GradientInputNew
          isSats={isSats}
          sats={sats}
          setSats={setSats}
          usd={usd}
          title={"Specify  Amount"}
        />
        <View style={{ alignItems: "center" }}>
          <Text bold h2 center style={{ marginTop: 30, marginBottom: 25 }}>
            Total size of selected bars:{"\n"}0.06 BTC
          </Text>
          <CommonBtn
            marginTop={20}
            isDropdown={false}
            title="Send Max: 0.02 BTC"
            width={150}
            startColor={colors.green}
            endColor={colors.green}
            subContainerBgColor={colors.green}
          />
        </View>
      </ScrollView>
      <CustomKeyboardNew
        title="Next"
        onPress={nextClickHandler}
        disabled={!sats.length || !sender.length}
        setSATS={setSats}
        setUSD={setUSD}
        setIsSATS={setIsSats}
        firstTabText="BTC"
      />
    </ScreenLayout>
  );
}
