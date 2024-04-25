import { Image, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { CoinOS, History, Threshold } from "@Cypher/assets/images";
import { colors } from "@Cypher/style-guide";
import LinearGradient from "react-native-linear-gradient";
import HistorySection from "./components/HistorySection";
import styles from "./styles";
import { dispatchNavigate } from "@Cypher/helpers";
import ThresholdSection from "./components/ThresholdSection";

enum ETabType {
  HISTORY = "History",
  THERESHOLD = "Threshold",
}

interface TopViewProps {
  selectedTab: ETabType;
  handleTabChange: () => void;
  inActiveColors: string[];
  activeColors: string[];
}

interface BottomViewProps {
  visible: boolean;
}

type RootStackParamList = {
  Withdraw: { fromScreen: string };
};

type RouteProps = RouteProp<RootStackParamList, "Withdraw">;

const CheckingAccountScreen = () => {
  const route = useRoute<RouteProps>();
  const fromScreen: string | undefined = route.params?.fromScreen;

  const [selectedTab, setSelectedTab] = useState<ETabType>(
    fromScreen ? ETabType.THERESHOLD : ETabType.HISTORY
  );
  const isHistory: boolean = selectedTab === ETabType.HISTORY;

  const inActiveColors: string[] = [colors.gray.charcoal, colors.gray.charcoal];
  const activeColors: string[] = [
    colors.gray.gradientOne,
    colors.gray.gradientTwo,
    colors.gray.gradientThree,
  ];

  useEffect(() => {
    const checkWithdraw = async () => {
      const value = await AsyncStorage.getItem("viewWithdraw");

      if (selectedTab === ETabType.THERESHOLD && value == "1") {
        await AsyncStorage.setItem("viewWithdraw", "0");
        dispatchNavigate("Withdraw");
      }
    };

    checkWithdraw();
  }, [selectedTab]);

  const handleTabChange = () => {
    setSelectedTab(
      selectedTab === ETabType.HISTORY ? ETabType.THERESHOLD : ETabType.HISTORY
    );
  };

  return (
    <ScreenLayout showToolbar isBackButton>
      <View style={styles.container}>
        <TopView
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
          inActiveColors={inActiveColors}
          activeColors={activeColors}
        />
        {isHistory ? <HistorySection /> : <ThresholdSection />}
        <BottomView visible={isHistory} />
      </View>
    </ScreenLayout>
  );
};

const TopView: React.FC<TopViewProps> = ({
  selectedTab,
  handleTabChange,
  inActiveColors,
  activeColors,
}) => {
  const renderTab = (tabType: ETabType, text: string, imageSource: any) => {
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
          <Text bold style={styles.tabText}>
            {text}
          </Text>
          <Image
            source={imageSource}
            resizeMode="contain"
            style={
              tabType === ETabType.THERESHOLD
                ? {
                    marginTop: 8,
                  }
                : undefined
            }
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.innerView,
        selectedTab === ETabType.THERESHOLD && { borderBottomWidth: 0 },
      ]}
    >
      <Text subHeader bold>
        Checking Account
      </Text>

      <View style={styles.tabView}>
        {renderTab(ETabType.HISTORY, ETabType.HISTORY, History)}
        {renderTab(ETabType.THERESHOLD, ETabType.THERESHOLD, Threshold)}
      </View>
    </View>
  );
};

const BottomView: React.FC<BottomViewProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.bottomView}>
      <Image source={CoinOS} style={styles.coinOsImage} resizeMode="cover" />
    </View>
  );
};
export default CheckingAccountScreen;
