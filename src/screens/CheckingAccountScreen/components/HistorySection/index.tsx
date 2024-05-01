import React, { useEffect, useState } from "react";
import { Text } from "@Cypher/component-library";
import { ActivityIndicator, Image, RefreshControl, SectionList, View } from "react-native";
import { Neomorph as Shadow } from "react-native-neomorph-shadows";
import { colors } from "@Cypher/style-guide";
import { Electricity } from "@Cypher/assets/images";
import styles from "./styles";
import { getTransactionHistory } from "../../../../../api/coinOSApis";
import { btc } from "@Cypher/screens/HomeScreen";
import screenHeight from "@Cypher/style-guide/screenHeight";

const HistorySection = ({matchedRate}: {matchedRate: number}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(7);
  const [offset, setOffset] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadPayments();
  }, [offset]);

  const loadPayments = async (append = true) => {
    offset == 0 && setIsLoading(true);
    try {
      const paymentList = await getTransactionHistory(offset, limit);
      if (append && offset > 0) {
        setPayments((prevPayments) => [...prevPayments, ...paymentList.payments]);
      } else {
        setPayments(paymentList.payments);
      }
      setTotalCount(paymentList.count);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
      setIsRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading && !isFetchingMore && payments.length < totalCount) {
      setIsFetchingMore(true);
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    if(offset == 0){
      loadPayments(false)
    } else {
      setOffset(0);
    }
  };

  const groupedPayments = payments.reduce((acc: any, payment: any) => {
    const date = new Date(payment?.created);
    const dateString = date.toDateString();
    if (!acc[dateString]) {
      acc[dateString] = [];
    }
    acc[dateString].push(payment);
    return acc;
  }, {});

  const sections = Object.entries(groupedPayments).map(([date, data]) => ({
    title: date,
    data: data,
  }));

  return (
    <View style={{flex: 1}}>
      {isLoading && !isRefreshing ? (
        <ActivityIndicator size={100} color={colors.white} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => {
            const satsAmount = item.amount.toString().replace('-', ''); // Adjusted for negative sign
            const amountSign = item.amount < 0 ? "-" : "+";
            const currency = btc(1);
            const dollarAmount = satsAmount * matchedRate * currency;

            const textColor = {
              color: item.amount < 0 ? colors.red : colors.green,
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
                    {item.amount > 0
                      ? item.confirmed
                        ? "Received"
                        : "Pending"
                      : "Sent"}
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
          contentContainerStyle={{paddingBottom: 120}}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.section}>
              <View style={styles.sectionLine} />
              <Text white h4 bold>
                {title}
              </Text>
              <View style={styles.sectionLine} />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isFetchingMore ? ( // Show loader at the end of the list when loading more
              <ActivityIndicator style={{ marginTop: 10, marginBottom: 20 }} color={colors.white} />
            ) : null
          }
          ListEmptyComponent={() => (
            <View style={{ height: screenHeight / 2.2, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
              <Text white h3 bold>No payments</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="white"
            />
          }
        />
      )} 
    </View>
  );
};

export default HistorySection;
