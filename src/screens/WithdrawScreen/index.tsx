import { View, Image } from "react-native";
import React from "react";
import { ScreenLayout, Text } from "@Cypher/component-library";
import styles from "./styles";
import { Withdraw } from "@Cypher/assets/images";
import { GradientButton } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";

interface ButtonViewProps {
  handleAdjustThreshold: () => void;
}

const WithdrawScreen = () => {
  const handleAdjustThreshold = () => {
    dispatchNavigate("CheckingAccount", {
      fromScreen: "Withdraw",
    });
  };

  return (
    <ScreenLayout showToolbar isBackButton={false}>
      <View style={styles.container}>
        <TopView />
        <BottomView />
        <ButtonView handleAdjustThreshold={handleAdjustThreshold} />
      </View>
    </ScreenLayout>
  );
};

const TopView = () => (
  <View style={styles.topView}>
    <Text subHeader bold>
      Withdrawal Threshold{" "}
    </Text>
    <Image source={Withdraw} style={styles.thresholdImage} resizeMode="cover" />
  </View>
);

const BottomView = () => (
  <View style={styles.bottomView}>
    <Text h4 bold style={styles.text}>
      You can adjust the threshold at which you can withdraw and materialize the
      money accumulated on your Checking Account.
    </Text>
    <Text h4 bold style={[styles.text, styles.space]}>
      Be aware that adjusting this threshold involves balancing Bitcoin network
      fees against counter-party risk:
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      • Increasing the threshold will reduce the percentage fee for withdrawals
      but it may introduce greater counter-party risk since funds in your
      Checking Account are maintained by a centralized custodian. A higher
      threshold means your assets are under their control for an extended
      period, increasing the risk associated with their custody.
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      • Decreasing the threshold may reduce counter-party risk but will result
      in a higher percentage fee for withdrawals
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      Note that this threshold will determine the size of each coin you will
      secure later in your Savings Vault and a small threshold may lead to a
      greater number of coins (UTXOs) which can also elevate the fees for future
      on-chain transactions, such as when transferring your coins to Cold
      Storage.
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      You should also consider setting aside a ‘Reserve Amount’ which is an
      amount to be left in your Checking Account after the settlement is
      completed. This will help you retain the ability to send and spend bitcoin
      cheaply using the Lightning Network.
    </Text>
  </View>
);

const ButtonView: React.FC<ButtonViewProps> = ({ handleAdjustThreshold }) => (
  <GradientButton
    title="Adjust Threshold"
    onPress={handleAdjustThreshold}
    isShadow
    isTextShadow
    style={styles.button}
  />
);
export default WithdrawScreen;
