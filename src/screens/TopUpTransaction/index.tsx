import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import GradientIndicator from "@Cypher/components/GradientIndicator";
import { colors } from "@Cypher/style-guide";
import { CommonBtn, GradientButton, GradientCard } from "@Cypher/components";
import ReactNativeModal from "react-native-modal";
import { dispatchNavigate } from "@Cypher/helpers";

export default function TopUpTransaction({ navigation, route }: any) {
  const info = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  console.log("info: ", info);
  const onPressNext = () => {
    // dispatchNavigate("SendReceiveOnChain");
    dispatchNavigate("TopUpTransactionDetails");
  };

  return (
    <ScreenLayout
      disableScroll
      showToolbar
      isBackButton
      title="Top-up transaction"
    >
      <ScrollView style={styles.container}>
        <View>
          <Text subHeader bold>
            Checking Account
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <GradientIndicator
              containerWidth={70}
              containerHeight={26}
              subContainerWidth={56}
              subContainerHeight={12}
              containerBorderColor={colors.gray.line2}
              subContainerBorderColor={colors.white}
              subContainerPadding={0}
              containerMarginRight={10}
            />
            <Text subHeader bold style={{ fontSize: 13 }}>
              Total: 0.02 BTC
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <View>
              <Text subHeader bold style={{ fontSize: 13 }}>
                Total: 0.02 BTC
              </Text>
              <Text subHeader bold style={{ fontSize: 18 }}>
                0.02000000 BTC ~$1000
              </Text>
            </View>
            <CommonBtn width={103} title="Edit Amount" isDropdown={false} />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text subHeader bold style={{ fontSize: 13 }}>
              Sent from:
            </Text>
            <Text italic subHeader bold style={{ fontSize: 18 }}>
              Vault address: bc1...34f
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text subHeader bold style={{ fontSize: 13 }}>
              Sent to:
            </Text>
            <Text
              italic
              subHeader
              bold
              style={{ fontSize: 18, color: colors.pink.light }}
            >
              My Coinos Checking Account Deposit address: bc1...34f
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text subHeader bold style={{ fontSize: 18 }}>
                Network fee:
              </Text>
              <Text subHeader bold style={{ fontSize: 18 }}>
                ~ 5000 sats
              </Text>
            </View>
            <CommonBtn title="Medium" width={130} />
            <Text subHeader bold style={{ fontSize: 18 }}>
              ~(0.1%)
            </Text>
          </View>
          <CommonBtn
            marginTop={20}
            isDropdown={false}
            title="Note to self"
            width={150}
          />
          <ReactNativeModal isVisible={isModalVisible}>
            <View>
              <GradientCard
                disabled
                style={styles.modal}
                linearStyle={styles.linearGradient4}
              >
                <ScrollView style={styles.background2}></ScrollView>
              </GradientCard>
            </View>
          </ReactNativeModal>
        </View>
      </ScrollView>
      <View style={{ padding: 22 }}>
        <GradientButton
          style={{ width: "100%", borderRadius: 10 }}
          textStyle={{ fontFamily: "Lato-Medium" }}
          title={"Next"}
          disabled={false}
          isError={false}
          btnBgColor={[colors.green, colors.green]}
          onPress={onPressNext}
        />
      </View>
    </ScreenLayout>
  );
}
