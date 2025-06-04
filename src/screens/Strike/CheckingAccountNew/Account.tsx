import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { ScrollView } from "react-native";

import { Card, StrikeView } from "@Cypher/components";
import styles from "./styles";

import { btc } from "@Cypher/helpers/coinosHelper";
import useAuthStore from "@Cypher/stores/authStore";
import { BlueStorageContext } from "../../../../blue_modules/storage-context";
import { formatBalance, formatBalanceWithoutSuffix } from "../../../../loc";
import { dispatchNavigate } from "@Cypher/helpers";

const shortenAddress = (address: string) => {
  // Take the first 6 characters
  const start = address.substring(0, 6);
  // Take the last 6 characters
  const end = address.substring(address.length - 6);
  // Combine with three dots in the middle
  return `${start}...${end}`;
};

export default function Account({
  wallet,
  matchedRate,
  setSelectedTab,
}: {
  wallet: any;
  matchedRate: string;
  setSelectedTab: (tab: number) => void;
}) {
  const currency = btc(1);
  const { vaultTab } = useAuthStore();
  const balance =
    !wallet?.hideBalance &&
    formatBalance(
      Number(wallet?.getBalance()),
      wallet?.getPreferredBalanceUnit(),
      true
    );
  const balanceWithoutSuffix =
    !wallet?.hideBalance &&
    formatBalanceWithoutSuffix(
      Number(wallet?.getBalance()),
      wallet?.getPreferredBalanceUnit(),
      true
    );
  const { wallets, saveToDisk, sleep, isElectrumDisabled } =
    useContext(BlueStorageContext);
  const [address, setAddress] = useState();

  const obtainWalletAddress = async () => {
    let newAddress;
    try {
      if (!isElectrumDisabled)
        newAddress = await Promise.race([
          wallet.getAddressAsync(),
          sleep(1000),
        ]);
    } catch (_) {}
    if (newAddress === undefined) {
      // either sleep expired or getAddressAsync threw an exception
      console.warn(
        "either sleep expired or getAddressAsync threw an exception"
      );
      newAddress = wallet._getExternalAddressByIndex(
        wallet.getNextFreeAddressIndex()
      );
    } else {
      saveToDisk(); // caching whatever getAddressAsync() generated internally
    }
    console.log("newAddress: ", newAddress);
    setAddress(newAddress);
  };

  useFocusEffect(
    useCallback(() => {
      if (wallet) {
        obtainWalletAddress();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet])
  );

  const checkingAccountClickHandler = () => {
    console.log("cliked");
  };

  const buyClickHandler = () => {
        dispatchNavigate('BuyBitcoin', { currency, matchedRate, receiveType: true });
  };

  return (
    <ScrollView contentContainerStyle={styles.container2}>
      <Card
        balance={0}
        convertedRate={0}
        reserveAmount={0}
        withdrawThreshold={0}
        onPress={checkingAccountClickHandler}
      />
      <StrikeView buyClick={buyClickHandler}/>
    </ScrollView>
  );
}
