import { Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  View,
} from "react-native";
import {
  BlueStorageContext,
  WalletTransactionsStatus,
} from "../../../../blue_modules/storage-context";
import Header from "./Header";
import Items from "./Items";
import styles from "./styles";

export default function History({ wallet, matchedRate, vaultTab }: any) {
  const {
    wallets,
    saveToDisk,
    setSelectedWalletID,
    walletTransactionUpdateStatus,
    isElectrumDisabled,
  } = useContext(BlueStorageContext);
  const [dataSource, setDataSource] = useState(wallet.getTransactions(5));
  const [limit, setLimit] = useState(5);
  const [pageSize, setPageSize] = useState(5);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemPriceUnit, setItemPriceUnit] = useState(
    wallet.getPreferredBalanceUnit()
  );
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (walletTransactionUpdateStatus === wallet.getID()) {
      setIsRefreshing(true);
    }
    if (
      isRefreshing &&
      walletTransactionUpdateStatus === WalletTransactionsStatus.NONE
    ) {
      console.log("re-rendering transactions");
      setDataSource([...getTransactionsSliced(limit)]);
      setIsRefreshing(false);
    }
  }, [wallet]);

  useEffect(() => {
    setIsLoading(true);
    setLimit(5);
    setPageSize(1);
    setTimeElapsed(0);
    setItemPriceUnit(wallet.getPreferredBalanceUnit());
    setIsLoading(false);
    setSelectedWalletID(wallet.getID());
    setDataSource([...getTransactionsSliced(limit)]);
    if (wallet.getLastTxFetch() === 0) {
      refreshTransactions();
    }
  }, [wallet]);

  const refreshTransactions = async () => {
    if (isElectrumDisabled) return setIsLoading(false);
    if (isLoading) return;
    setIsLoading(true);
    let noErr = true;
    let smthChanged = false;
    try {
      if (wallet.allowBIP47() && wallet.isBIP47Enabled()) {
        const pcStart = +new Date();
        await wallet.fetchBIP47SenderPaymentCodes();
        const pcEnd = +new Date();
        console.log(
          wallet.getLabel(),
          "fetch payment codes took",
          (pcEnd - pcStart) / 1000,
          "sec"
        );
      }
      const balanceStart = +new Date();
      const oldBalance = wallet.getBalance();
      await wallet.fetchBalance();
      if (oldBalance !== wallet.getBalance()) smthChanged = true;
      const balanceEnd = +new Date();
      console.log(
        wallet.getLabel(),
        "fetch balance took",
        (balanceEnd - balanceStart) / 1000,
        "sec"
      );
      const start = +new Date();
      const oldTxLen = wallet.getTransactions().length;
      let immatureTxsConfs = "";
      for (const tx of wallet.getTransactions()) {
        if (tx?.confirmations < 7)
          immatureTxsConfs += tx.txid + ":" + tx.confirmations + ";";
      }
      await wallet.fetchTransactions();
      if (wallet.fetchPendingTransactions) {
        await wallet.fetchPendingTransactions();
      }
      if (wallet.fetchUserInvoices) {
        await wallet.fetchUserInvoices();
      }
      if (oldTxLen !== wallet.getTransactions().length) smthChanged = true;
      let unconfirmedTxsConfs2 = "";
      for (const tx of wallet.getTransactions()) {
        if (tx?.confirmations < 7)
          unconfirmedTxsConfs2 += tx.txid + ":" + tx.confirmations + ";";
      }
      if (unconfirmedTxsConfs2 !== immatureTxsConfs) {
        smthChanged = true;
      }
      const end = +new Date();
      console.log(
        wallet.getLabel(),
        "fetch tx took",
        (end - start) / 1000,
        "sec"
      );
    } catch (err) {
      noErr = false;
      setIsLoading(false);
      setTimeElapsed((prev) => prev + 1);
    }
    if (noErr && smthChanged) {
      console.log("saving to disk");
      await saveToDisk();
      setDataSource([...getTransactionsSliced(limit)]);
    }
    setIsLoading(false);
    setTimeElapsed((prev) => prev + 1);
  };

  const getTransactionsSliced = (lmt = Infinity) => {
    let txs = wallet.getTransactions();
    console.log("txs: ", txs.length);
    for (const it of txs) {
      it.sort_ts = +new Date(it.received);
    }
    txs = txs.sort(function (a, b) {
      return b.sort_ts - a.sort_ts;
    });
    return txs.slice(0, lmt);
  };

  const onPressHandler = (item: any) => {
    dispatchNavigate("SendReceiveOnChain", {
      transaction: item,
      history: true,
      matchedRate,
      wallet,
    });
  };

  const transformDataToSections = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const date = dayjs(item.received).format("ddd MMM DD YYYY");
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});

    return Object.keys(groupedData).map((date) => ({
      title: date,
      data: groupedData[date],
    }));
  };

  const sections = transformDataToSections(dataSource);

  console.log(
    "getTransactionsSliced(Infinity).length: ",
    getTransactionsSliced(Infinity).length,
    limit
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Items
            wallet={wallet}
            matchedRate={matchedRate}
            item={item}
            onPressHandler={() => onPressHandler(item)}
            vaultTab={vaultTab}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Header title={title} />
        )}
        onEndReached={async () => {
          if (getTransactionsSliced(Infinity).length < limit) {
            return;
          }
          setDataSource(getTransactionsSliced(limit + pageSize));
          setLimit((prev) => prev + pageSize);
          setPageSize((prev) => prev * 2);
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            (wallet.getTransactions().length > limit && (
              <ActivityIndicator
                style={{ marginTop: 10, marginBottom: 20 }}
                color={colors.white}
              />
            )) ||
            null
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.loadingContainer}>
            <Text white h3 bold>
              No Transactions History
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshTransactions}
            tintColor="white"
          />
        }
        style={styles.flex}
      />
      <View style={styles.bottomView} />
    </View>
  );
}
