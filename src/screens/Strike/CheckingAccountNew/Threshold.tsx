import { Information } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";
import { GradientCard, GradientText } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";
import { btc, formatNumber } from "@Cypher/helpers/coinosHelper";
import useAuthStore from "@Cypher/stores/authStore";
import { colors } from "@Cypher/style-guide";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import Modal from "react-native-modal";
import SimpleToast from "react-native-simple-toast";
import styles from "./styles";

const data = [
  {
    sats: 2000000,
  },
  {
    sats: 3000000,
  },
  {
    sats: 4000000,
  },
  {
    sats: 5000000,
  },
  {
    sats: 6000000,
  },
  {
    sats: 7000000,
  },
  {
    sats: 8000000,
  },
  {
    sats: 9000000,
  },
  {
    sats: 10000000,
  },
];

const reserveData = [
  {
    sats: 100000,
  },
  {
    sats: 200000,
  },
  {
    sats: 300000,
  },
  {
    sats: 400000,
  },
  {
    sats: 500000,
  },
  {
    sats: 600000,
  },
  {
    sats: 700000,
  },
  {
    sats: 800000,
  },
  {
    sats: 900000,
  },
  {
    sats: 1000000,
  },
  {
    sats: 1100000,
  },
  {
    sats: 1200000,
  },
  {
    sats: 1300000,
  },
  {
    sats: 1400000,
  },
  {
    sats: 1500000,
  },
  {
    sats: 1600000,
  },
  {
    sats: 1700000,
  },
  {
    sats: 1800000,
  },
  {
    sats: 1900000,
  },
  {
    sats: 2000000,
  },
];

export default function Threshold({
  wallet,
  matchedRate,
  setSelectedTab,
}: {
  wallet: any;
  matchedRate: string;
  setSelectedTab: (tab: number) => void;
}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalRAVisible, setModalRAVisible] = useState(false);
  const [isErrorReserve, setIsErrorReserve] = useState(false);
  const receiveType = "any";
  const {
    vaultTab,
    withdrawThreshold,
    reserveAmount,
    withdrawStrikeThreshold,
    reserveStrikeAmount,
    setWithdrawThreshold,
    setWithdrawStrikeThreshold,
    setReserveStrikeAmount,
    setReserveAmount,
  } = useAuthStore();
  const [reserveAmt, setReserveAmt] = useState(
    receiveType ? Number(reserveAmount) : Number(reserveStrikeAmount)
  );
  const [value, setValue] = useState(
    receiveType ? Number(withdrawThreshold) : Number(withdrawStrikeThreshold)
  );
  const currency = btc(1);

  const decreaseClickHandler = () => {
    const currentIndex = data.findIndex((item) => item.sats === value);
    if (currentIndex > 0) {
      const newValue = data[currentIndex - 1].sats;
      console.log("index: ", currentIndex - 1);
      console.log("temp: ", newValue);
      setValue(Number(newValue));
      receiveType
        ? setWithdrawThreshold(newValue)
        : setWithdrawStrikeThreshold(newValue);
    } else {
      SimpleToast.show(
        "Withdraw Threshold cannot be less than 2M",
        SimpleToast.SHORT
      );
    }
  };

  const increaseClickHandler = () => {
    const currentIndex = data.findIndex((item) => item.sats === value);
    if (currentIndex >= 0 && currentIndex < data.length - 1) {
      const newValue = data[currentIndex + 1].sats;
      console.log("index: ", currentIndex + 1);
      console.log("temp: ", newValue);
      setValue(Number(newValue));
      receiveType
        ? setWithdrawThreshold(newValue)
        : setWithdrawStrikeThreshold(newValue);
    } else {
      SimpleToast.show(
        "Withdraw Threshold cannot be greater than 9M",
        SimpleToast.SHORT
      );
    }
  };

  const increaseClickHandler_ = () => {
    const currentIndex = reserveData.findIndex(
      (item) => item.sats === reserveAmt
    );
    if (currentIndex >= 0 && currentIndex < reserveData.length - 1) {
      const newValue = reserveData[currentIndex + 1].sats;
      console.log("index: ", currentIndex + 1);
      console.log("temp: ", newValue);
      setReserveAmt(Number(newValue));
      receiveType
        ? setReserveAmount(newValue)
        : setReserveStrikeAmount(newValue);
    } else {
      SimpleToast.show(
        "Reserve Amount cannot be greater than 2M",
        SimpleToast.SHORT
      );
    }
  };

  const decreaseClickHandler_ = () => {
    const currentIndex = reserveData.findIndex(
      (item) => item.sats === reserveAmt
    );
    if (currentIndex > 0) {
      const newValue = reserveData[currentIndex - 1].sats;
      console.log("index: ", currentIndex - 1);
      console.log("temp: ", newValue);
      setReserveAmt(Number(newValue));
      receiveType
        ? setReserveAmount(newValue)
        : setReserveStrikeAmount(newValue);
    } else {
      SimpleToast.show(
        "Reserve Amount cannot be less than 100K",
        SimpleToast.SHORT
      );
    }
  };

  const selectClickHandler = (val: number) => {
    receiveType ? setWithdrawThreshold(val) : setWithdrawStrikeThreshold(val);
    setValue(Number(val));
    setModalVisible(false);
  };

  const customizeClickHandler = (index: number) => {
    // WithdrawThreshold
    dispatchNavigate("WithdrawThreshold", {
      title: index == 0 ? "Withdraw Threshold" : "Reserve Amount",
      titleBtn: index == 0 ? "Set Threshold" : "Set Reserve Amount",
      onSelect: onSelect,
      index,
      matchedRate,
    });
  };

  const onSelect = (value: number, index: number) => {
    if (receiveType) {
      if (index == 0) {
        if (
          withdrawThreshold < data[0].sats ||
          withdrawThreshold > data[data.length - 1].sats
        ) {
          setIsError(true);
        } else {
          setIsError(false);
        }
        setValue(Number(value));
        setWithdrawThreshold(value);
      } else {
        if (
          reserveAmount < reserveData[0].sats ||
          reserveAmount > reserveData[reserveData.length - 1].sats
        ) {
          setIsErrorReserve(true);
        } else {
          setIsErrorReserve(false);
        }
        setReserveAmt(Number(value));
        receiveType ? setReserveAmount(value) : setReserveStrikeAmount(value);
      }
    } else {
      if (index == 0) {
        if (
          withdrawStrikeThreshold < data[0].sats ||
          withdrawStrikeThreshold > data[data.length - 1].sats
        ) {
          setIsError(true);
        } else {
          setIsError(false);
        }
        setValue(Number(value));
        setWithdrawStrikeThreshold(value);
      } else {
        if (
          reserveStrikeAmount < reserveData[0].sats ||
          reserveStrikeAmount > reserveData[reserveData.length - 1].sats
        ) {
          setIsErrorReserve(true);
        } else {
          setIsErrorReserve(false);
        }
        setReserveAmt(Number(value));
        setReserveStrikeAmount(value);
      }
    }
  };

  const selectRAClickHandler = (val: number) => {
    receiveType ? setReserveAmount(val) : setReserveStrikeAmount(val);
    setReserveAmt(Number(val));
    setModalRAVisible(false);
  };

  return (
    <ScrollView style={styles.main} contentContainerStyle={{paddingBottom: 40}}>
      <Text h2 semibold style={styles.bankDepositText}>
        Withdraw Threshold
      </Text>
      <Text h4 style={styles.supportText}>
        You can adjust the threshold at which a message will be displayed to
        remind you to withdraw and materialize the money accumulated on your
        Lightning Account and move it into self-custody.
      </Text>
      <Text h4 style={styles.supportText}>
        Be aware that adjusting this threshold involves balancing Bitcoin
        network fees against counter-party risk.
      </Text>
      <GradientText style={styles.gradientText}>Learn more</GradientText>
      <View style={styles.priceView}>
        <GradientCard
          disabled
          colors_={
            isError ? [colors.yellow2, colors.yellow2] : ["#FFFFFF", "#B6B6B6"]
          }
          style={styles.linearGradientStroke2}
          linearStyle={styles.linearGradient}
        >
          <View style={styles.background}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text bold style={styles.text}>
                {formatNumber(value)}
              </Text>
            </TouchableOpacity>
            <View style={styles.straightLine} />
            <View>
              <TouchableOpacity onPress={increaseClickHandler}>
                <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={decreaseClickHandler}>
                <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </GradientCard>
        <Text style={styles.text}>Sats</Text>
      </View>
      <Modal isVisible={isModalVisible}>
        <View>
          <GradientCard
            disabled
            style={styles.modal}
            linearStyle={styles.linearGradient2}
          >
            <ScrollView style={styles.background2}>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.row,
                      index % 2 == 0 && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => selectClickHandler(item?.sats)}
                  >
                    <Text bold style={styles.text}>
                      {formatNumber(item?.sats) + " sats"}
                    </Text>
                    <Text style={[styles.text, { marginStart: 30 }]}>
                      ~$
                      {(item?.sats * Number(matchedRate) * currency).toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </GradientCard>
        </View>
      </Modal>
      <Text center style={styles.usd}>
        ${(value * Number(matchedRate) * currency).toFixed(2)}
      </Text>
      <TouchableOpacity onPress={() => customizeClickHandler(0)}>
        <GradientText style={styles.gradientText}>Customize</GradientText>
      </TouchableOpacity>
      <Text h3 center>
        Estimated withdraw fee: 0.2%
      </Text>
      <View style={styles.reserve}>
        <Text h2 semibold>
          Reserve Amount
        </Text>
        <Image source={Information} style={styles.image} />
      </View>
      <View style={styles.priceView}>
        <GradientCard
          disabled
          colors_={
            isErrorReserve
              ? [colors.yellow2, colors.yellow2]
              : ["#FFFFFF", "#B6B6B6"]
          }
          style={StyleSheet.flatten([
            styles.linearGradientStroke2,
            { height: 60, width: "60%" },
          ])}
          linearStyle={StyleSheet.flatten([
            styles.linearGradient,
            { height: 60 },
          ])}
        >
          <View
            style={[
              styles.background,
              {
                justifyContent: "flex-end",
                paddingEnd: 30,
              },
            ]}
          >
            <TouchableOpacity onPress={() => setModalRAVisible(true)}>
              <Text bold style={styles.text}>
                {formatNumber(reserveAmt)}
              </Text>
            </TouchableOpacity>
            <View style={styles.straightLine} />
            <View>
              <TouchableOpacity onPress={increaseClickHandler_}>
                <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={decreaseClickHandler_}>
                <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </GradientCard>
        <Text style={styles.text}>Sats</Text>
      </View>
      <Text center style={styles.usd}>
        ${(reserveAmt * Number(matchedRate) * currency).toFixed(2)}
      </Text>
      <TouchableOpacity onPress={() => customizeClickHandler(1)}>
        <GradientText style={styles.gradientText}>Customize</GradientText>
      </TouchableOpacity>
      <Modal isVisible={isModalRAVisible}>
        <View>
          <GradientCard
            disabled
            style={styles.modal}
            linearStyle={styles.linearGradient2}
          >
            <ScrollView style={styles.background2}>
              {reserveData.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.row,
                      index % 2 == 0 && { backgroundColor: colors.primary },
                    ]}
                    onPress={() => selectRAClickHandler(item?.sats)}
                  >
                    <Text bold style={styles.text}>
                      {formatNumber(item?.sats) + " sats"}
                    </Text>
                    <Text style={[styles.text, { marginStart: 30 }]}>
                      ~$
                      {(item?.sats * Number(matchedRate) * currency).toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </GradientCard>
        </View>
      </Modal>
    </ScrollView>
  );
}
