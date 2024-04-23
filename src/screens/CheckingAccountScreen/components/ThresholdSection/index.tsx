import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "@Cypher/component-library";
import styles from "./styles";
import { dispatchNavigate } from "@Cypher/helpers";
import { Down, Up } from "@Cypher/assets/images";

enum EActionType {
  WITHDRAW = "withdraw",
  RESERVE = "reserve",
}
interface TopViewProps {
  value: {
    sats: number | string;
    dollars: number | string;
  };
  onClick: () => void;
  onChange: (isAddition?: boolean) => void;
  handleCustomize: (action: EActionType) => void;
}

interface BottomViewProps {
  value: {
    sats: number | string;
    dollars: number | string;
  };
  onChange: (isAddition?: boolean) => void;
  handleCustomize: (action: EActionType) => void;
}

const ThresholdSection = () => {
  const [withdrawValue, setWithdrawValue] = useState<{
    sats: number;
    dollars: number;
  }>({
    sats: 20,
    dollars: 10,
  });

  const [reserveValue, setReserveValue] = useState<{
    sats: number;
    dollars: number;
  }>({
    sats: 20,
    dollars: 10,
  });

  const handleLearnMore = () => {
    dispatchNavigate("Withdraw");
  };

  const handleCustomize = (action: EActionType) => {
     if (action === EActionType.WITHDRAW) {
      dispatchNavigate("CreateInvoiceWT", {
        fromField: "withdraw",
      });

      return;
    }

    dispatchNavigate("CreateInvoiceWT", {
      fromField: "reserve",
    });
  };

  const onWithdrawChange = (isAddition?: boolean) => {
    setWithdrawValue((prev) => {
      const newSats = isAddition ? prev.sats + 1 : Math.max(prev.sats - 1, 0);
      const newDollars = isAddition
        ? prev.dollars + 1
        : Math.max(prev.dollars - 1, 0);

      return {
        sats: newSats,
        dollars: newDollars,
      };
    });
  };

  const onReserveChange = (isAddition?: boolean) => {
    setReserveValue((prev) => {
      const newSats = isAddition ? prev.sats + 1 : Math.max(prev.sats - 1, 0);
      const newDollars = isAddition
        ? prev.dollars + 1
        : Math.max(prev.dollars - 1, 0);

      return {
        sats: newSats,
        dollars: newDollars,
      };
    });
  };

  return (
    <View style={styles.container}>
      <TopView
        value={withdrawValue}
        onClick={handleLearnMore}
        onChange={onWithdrawChange}
        handleCustomize={handleCustomize}
      />
      <BottomView
        value={reserveValue}
        onChange={onReserveChange}
        handleCustomize={handleCustomize}
      />
    </View>
  );
};

const TopView: React.FC<TopViewProps> = ({
  value,
  onClick,
  onChange,
  handleCustomize,
}) => (
  <View>
    <Text subHeader bold white>
      Withdraw Threshold{" "}
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      You can adjust the threshold at which you can withdraw and materialize the
      money accumulated on your Checking Account.
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      Be aware that adjusting this threshold involves balancing Bitcoin network
      fees against counter-party risk.{" "}
      <Text h4 bold pink onPress={onClick}>
        Learn more{" "}
      </Text>
    </Text>

    <View style={styles.inputMain}>
      <View style={styles.input}>
        <TextInput
          value={value?.sats.toString() + " M"}
          onChangeText={() => {}}
          editable={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.linear} />
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onChange(true);
          }}
        >
          <Image source={Up} style={styles.actionImage} resizeMode="cover" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onChange();
          }}
        >
          <Image source={Down} style={styles.actionImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <Text h2 bold white style={styles.label}>
        sats{" "}
      </Text>
    </View>

    <View style={styles.center}>
      <Text h2 bold white style={styles.dollar}>
        {`$${value?.dollars}`}
      </Text>

      <Text
        h2
        bold
        pink
        onPress={() => {
          handleCustomize(EActionType.WITHDRAW);
        }}
      >
        Customize{" "}
      </Text>
    </View>
  </View>
);

const BottomView: React.FC<BottomViewProps> = ({
  value,
  onChange,
  handleCustomize,
}) => (
  <View style={styles.space}>
    <Text subHeader bold white>
      Reserve Amount{" "}
    </Text>

    <Text h4 bold style={[styles.text, styles.space]}>
      You should consider setting aside a ‘Reserve Amount’ to be left in your
      Checking Account after a withdrawal is completed to retain the ability to
      send bitcoin cheaply using the Lightning Network.
    </Text>

    <View style={styles.inputMain}>
      <View style={styles.input}>
        <TextInput
          value={value?.sats.toString() + " K"}
          onChangeText={() => {}}
          editable={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.linear} />
      <View style={styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onChange(true);
          }}
        >
          <Image source={Up} style={styles.actionImage} resizeMode="cover" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onChange();
          }}
        >
          <Image source={Down} style={styles.actionImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <Text h2 bold white style={styles.label}>
        sats{" "}
      </Text>
    </View>

    <View style={styles.center}>
      <Text h2 bold white style={styles.dollar}>
        {`$${value?.dollars}`}
      </Text>

      <Text
        h2
        bold
        pink
        onPress={() => {
          handleCustomize(EActionType.RESERVE);
        }}
      >
        Customize{" "}
      </Text>
    </View>
  </View>
);

export default ThresholdSection;
