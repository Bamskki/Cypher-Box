import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { scanQrHelper } from "../../../helpers/scan-qr";
import DeeplinkSchemaMatch from "../../../class/deeplink-schema-match";
import triggerHapticFeedback, {
  HapticFeedbackTypes,
} from "../../../blue_modules/hapticFeedback";
import { CoinOSSmall } from "@Cypher/assets/images";
import {
  GradientButtonWithShadow,
  GradientCard,
  GradientCardWithShadow,
  GradientText,
  GradientView,
  SavingVault,
} from "@Cypher/components";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { Shadow } from "react-native-neomorph-shadows";
import { colors, heights } from "@Cypher/style-guide";
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from "react-native-linear-gradient";
import ReceivedList from "./ReceivedList";
import useAuthStore from "@Cypher/stores/authStore";
import { getCurrencyRates, getMe, getTransactionHistory } from "@Cypher/api/coinOSApis";
import { btc, formatNumber, matchKeyAndValue } from "@Cypher/helpers/coinosHelper";

interface Props {
  route: any;
}

export const calculatePercentage = (withdrawThreshold: number, reserveAmount: number) => {
  const threshold = Number(withdrawThreshold);
  const reserve = Number(reserveAmount);

  const percentage = (threshold / (threshold + reserve)) * 100;
  return Math.min(percentage, 100);
};


export default function HomeScreen({ route }: Props) {
  const { navigate } = useNavigation();
  const routeName = useRoute().name;
  // const [storage, setStorage] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('$');
  const [convertedRate, setConvertedRate] = useState(0);
  const [matchedRate, setMatchedRate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [payment, setPayments] = useState([])
  const [wt, setWt] = useState<number>();
  const [isWithdraw, setIsWithdraw] = useState<boolean>(true);
  const [isAllDone, setIsAllDone] = useState<boolean>(true);
  console.log("🚀 ~ HomeScreen ~ route?.params?.isComplete:", route?.params?.isComplete)

  const refRBSheet = useRef<any>(null);
  const { isAuth, token, user, withdrawThreshold, reserveAmount, setUser } = useAuthStore();

  useFocusEffect(() => {
    if (route?.params?.isComplete) setIsAllDone(true);
  });

  useEffect(() => {
    async function handleToken() {
      if (isAuth && token) {
        handleUser();
        loadPayments();
      } else {
        setIsLoading(false)
      }
    }
    // async function getWithdrawal() {
    //   const wt = await AsyncStorage.getItem('withdrawThreshold');
    //   if(wt){
    //     setWt(Number(wt));
    //   }
    // }
    // getWithdrawal();
    handleToken();
  }, [isAuth, token]);


  const handleUser = async () => {
    try {
      const response = await getMe();
      console.log('response: ', response);
      const responsetest = await getCurrencyRates();
      const currency = btc(1);
      const matched = matchKeyAndValue(responsetest, 'USD')
      setMatchedRate(matched || 0)
      console.log('converter: ', (matched || 0) * currency * response.balance);
      setConvertedRate((matched || 0) * currency * response.balance)
      setCurrency("USD")
      console.log('currency: ', currency)
      if (response?.balance) {
        setBalance(response?.balance || 0);
      }
      setUser(response?.username);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false)
      setRefreshing(false);
    }
  }

  const loadPayments = async (append = true) => {
    try {
      const paymentList = await getTransactionHistory(0, 5);
      setPayments(paymentList.payments);
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  const navigateToSettings = () => {
    console.log('setting click');
    dispatchNavigate("Settings");
  };

  const onScanButtonPressed = () => {
    console.log('scan click');
    scanQrHelper(navigate, routeName).then(onBarScanned);
  };

  const loginClickHandler = () => {
    console.log('login click');
    dispatchNavigate('LoginCoinOSScreen');
  };

  const onBarScanned = (value: any) => {
    if (!value) return;
    DeeplinkSchemaMatch.navigationRouteFor(
      { url: value },
      (completionValue) => {
        triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
        navigate(...completionValue);
      }
    );
  };

  const createChekingAccountClickHandler = () => {
    console.log('create account click');
    dispatchNavigate("CheckAccount");
  };

  const receiveClickHandler = () => {
    console.log('received click');
    refRBSheet.current.open();
  };

  const sendClickHandler = () => {
    console.log('send click');
    dispatchNavigate('SendScreen', { currency, matchedRate });
  };

  const checkingAccountClickHandler = () => {
    dispatchNavigate('CheckingAccount', { matchedRate });
  }

  const withdrawClickHandler = () => {
    dispatchNavigate('SavingVaultIntro');
  };

  const topupClickHandler = () => {
    dispatchNavigate('PurchaseVault', {
      data: {}
    });
  };

  const savingVaultClickHandler = () => {
    console.log('savingVaultClickHandler click');
    dispatchNavigate('HotStorageVault');
  };

  const coldStorageClickHandler = () => {
    console.log('coldStorageClickHandler click');
    dispatchNavigate('ColdStorage');
  };

  const hotStorageClickHandler = () => {
    dispatchNavigate('SavingVaultIntroNew');
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleUser()
  };

  return (
    <ScreenLayout RefreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor="white"
      />
    } disableScroll>
      <View style={styles.container}>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          )
            :
            (
              <>
                <View style={styles.title}>
                  <Text subHeader bold>
                    Total Balance
                  </Text>
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={styles.imageView}
                      onPress={navigateToSettings}
                    >
                      <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../img/settings.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.imageViews}
                      onPress={onScanButtonPressed}
                    >
                      <Image
                        style={styles.scan}
                        resizeMode="contain"
                        source={require("../../../img/scan-new.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.shadowView}>
                  <Shadow
                    style={styles.shadowTop}
                    inner
                    useArt
                  >
                    <Text subHeader bold style={styles.price}>
                      {btc(1) * (balance || 0)} BTC
                    </Text>
                    <Text bold style={styles.priceusd} >
                      {"$" + convertedRate.toFixed(2)}
                    </Text>
                    <Shadow
                      inner
                      useArt
                      style={styles.shadowBottom}
                    />
                  </Shadow>
                </View>
              </>
            )}
          {isAuth ? (
            <>
              <TouchableOpacity style={styles.shadowView} onPress={checkingAccountClickHandler}>
                <Shadow
                  style={StyleSheet.flatten([styles.shadowTop, { shadowColor: colors.pink.shadowTop, padding: 0 }])}
                  inner
                  useArt
                >
                  <View style={styles.view}>
                    <Text h2 bold style={styles.check}>
                      Checking Account
                    </Text>
                    <Image
                      source={CoinOSSmall}
                      style={styles.blink}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.view}>
                    <Text h2 bold style={styles.sats}>
                      {balance}   sats ~ {"$" + convertedRate.toFixed(2)}
                    </Text>
                    <Text bold style={styles.totalsats}>
                      {formatNumber(Number(withdrawThreshold))} sats
                    </Text>
                  </View>
                  <View>
                    <View style={styles.showLine} />
                    <View style={[styles.box, { left: `${calculatePercentage(withdrawThreshold, reserveAmount)}%` }]} />
                    <LinearGradient
                      start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                      colors={[colors.white, colors.pink.dark]}
                      style={[styles.linearGradient2, { width: `${calculatePercentage(balance, reserveAmount)}%` }]}>
                      {/* <View style={[styles.box, {marginLeft: `${Math.min((withdrawThreshold / (Number(withdrawThreshold + reserveAmount) || 0)) * 100, 100)}%`}]} /> */}
                      {/* <Shadow
                          inner // <- enable inner shadow
                          useArt // <- set this prop to use non-native shadow on ios
                          style={styles.top2} >
                      </Shadow> */}
                    </LinearGradient>

                    {/* <View style={styles.showLine} /> */}
                    {/* <View style={[styles.box, {marginLeft: `${Math.min((balance / (Number(withdrawThreshold) || 0)) * 100, 100)}%`}]} />
                    </View> */}
                  </View>
                  <Shadow
                    inner
                    useArt
                    style={StyleSheet.flatten([styles.shadowBottom, { shadowColor: colors.pink.shadowBottom }])}
                  />
                </Shadow>
              </TouchableOpacity>
              <View style={styles.btnView}>
                <GradientButtonWithShadow
                  title="Receive"
                  onPress={receiveClickHandler}
                  isShadow
                  isTextShadow
                />
                <GradientButtonWithShadow
                  title="Send"
                  onPress={sendClickHandler}
                  isShadow
                  isTextShadow
                />
              </View>
              {!isLoading &&
                (payment.length == 0 ?
                  <Text h4 style={styles.alert}>
                    Your sats have materialized! You can create a Hot Storage Savings Vault and take full self-custody of your money by withdrawing a large chunk of a bitcoin from your custodian Checking Account. Click the Withdraw button to know more
                    {/* You can receive, send, and accumulate bitcoin using your Checking Account. New security features will be revealed once you meet the withdrawal threshold at 2 million sats */}
                  </Text>
                  : (Number(balance) === Number(withdrawThreshold + reserveAmount)) ?
                    <Text h4 style={styles.alert}>
                      Congrats! You've completed the bar, It's time to create your Hot Storage Savings Vault and take full self-custody of your bitcoi. Click 'Withdraw' to know more.
                    </Text>
                    :
                    <Text h4 style={styles.alertGrey}>
                      New security upgrades will be revealed once you meet fill up the bar displayed on your Checking Account.
                    </Text>
                )
              }
              <View style={styles.bottom}>
                <View style={styles.bottominner}>
                  {isAllDone ?
                    <GradientView
                      onPress={topupClickHandler}
                      topShadowStyle={styles.outerShadowStyle}
                      bottomShadowStyle={styles.innerShadowStyle}
                      style={styles.linearGradientStyle}
                      linearGradientStyle={styles.mainShadowStyle}
                    >
                      <Image
                        style={styles.arrowLeft}
                        resizeMode="contain"
                        source={require("../../../img/arrow-right.png")}
                      />
                      <Text bold h3 center style={{ marginStart: 20 }}>Top-up</Text>
                    </GradientView>
                    :
                    <TouchableOpacity style={styles.topup}>
                      <LinearGradient colors={['#333333', '#282727']} style={styles.topup}>
                        <Image
                          style={styles.arrowLeft}
                          resizeMode="contain"
                          source={require("../../../img/arrow-right.png")}
                        />
                        <Text
                          bold
                          h3
                          center
                          style={{ marginStart: 20 }}
                        >
                          Top-up
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  }
                  {isWithdraw ?
                    <GradientView
                      onPress={withdrawClickHandler}
                      topShadowStyle={styles.outerShadowStyle}
                      bottomShadowStyle={styles.innerShadowStyle}
                      style={styles.linearGradientStyle}
                      linearGradientStyle={styles.mainShadowStyle}
                    >
                      <Text bold h3 center style={{ marginEnd: 20 }}>Withdraw</Text>
                      <Image
                        style={styles.arrowRight}
                        resizeMode="contain"
                        source={require("../../../img/arrow-right.png")}
                      />
                    </GradientView>
                    :
                    <TouchableOpacity style={styles.topup}>
                      <LinearGradient colors={['#333333', '#282727']} style={styles.topup}>
                        <Text
                          bold
                          h3
                          center
                          style={{ marginEnd: 20 }}
                        >
                          Withdraw
                        </Text>
                        <Image
                          style={styles.arrowRight}
                          resizeMode="contain"
                          source={require("../../../img/arrow-right.png")}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  }
                </View>
                {isAllDone ?
                  <SavingVault
                    container={styles.savingVault}
                    innerContainer={styles.savingVault}
                    shadowTopBottom={styles.savingVault}
                    shadowBottomBottom={styles.savingVault}
                    bitcoinText={styles.bitcoinText}
                    onPress={savingVaultClickHandler}
                  />
                  :
                  <View style={styles.shadowViewBottom}>
                    <Shadow
                      style={styles.shadowTopBottom}
                      inner
                      useArt
                    >
                      <View style={styles.bottominner}>
                        <Text h2 bold>Savings Vault</Text>
                        <View style={styles.row}>
                          <Text h3 bold style={styles.bitcointext}>
                            Bitcoin Network
                          </Text>
                          <Image
                            style={styles.bitcoinimg}
                            resizeMode="contain"
                            source={require("../../../img/bitcoin.png")}
                          />
                        </View>
                      </View>
                      <Shadow
                        inner
                        useArt
                        style={styles.shadowBottomBottom}
                      />
                    </Shadow>
                  </View>
                }
                <View style={styles.container3}>
                  <GradientCard colors_={['#464D6854', '#FFF']} style={styles.container2} linearStyle={styles.main}>
                    <View style={styles.container4}>
                      <Text h3 bold style={styles.storageText} onPress={hotStorageClickHandler}>Hot Storage</Text>
                      <Text h3 bold style={styles.storageText} onPress={coldStorageClickHandler}>Cold Storage</Text>
                      {/* <GradientCard
                        colors_={[colors.gray.dark, colors.gray.dark]}
                        // colors_={!storage ? ['#737373', '#737373'] : [colors.gray.dark, colors.gray.dark]}
                        // onPress={() => setStorage(0)}
                        style={styles.view2}
                        linearStyle={styles.gradient}>
                        <View style={styles.inside}>
                          <Text h3 bold style={styles.storageText}>Hot Storage</Text>
                        </View>
                      </GradientCard>
                      <GradientCard
                        colors_={[colors.gray.dark, colors.gray.dark]}
                        // onPress={() => setStorage(1)}
                        style={styles.view2}
                        linearStyle={styles.gradient}>
                        <View style={styles.inside}>
                          <Text h3 bold style={styles.storageText}>Hot Storage</Text>
                        </View>
                      </GradientCard> */}
                    </View>
                  </GradientCard>
                  {/* <View style={styles.circle}>
                    <Image
                      style={styles.arrow2}
                      resizeMode="contain"
                      source={require("../../../img/arrow-right.png")}
                    />
                    <Image
                      style={styles.arrow3}
                      resizeMode="contain"
                      source={require("../../../img/arrow-right.png")}
                    />
                  </View> */}
                </View>
              </View>
            </>
          ) : (
            <>
              <GradientCardWithShadow
                style={styles.createView}
                onPress={createChekingAccountClickHandler}
              >
                <View style={styles.middle}>
                  <Image
                    style={styles.arrow}
                    resizeMode="contain"
                    source={require("../../../img/arrow-right.png")}
                  />
                  <Text h2 style={styles.shadow}>
                    Create Your Checking Account
                  </Text>
                </View>
              </GradientCardWithShadow>
              <View style={styles.alreadyView}>
                <Text bold style={styles.text}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={loginClickHandler}>
                  <Text bold style={styles.login}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'red',
          },
          container: {
            height: heights / 2 + 80,
          }
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}
      >
        <ReceivedList refRBSheet={refRBSheet} matchedRate={matchedRate} currency={currency} />
      </RBSheet>
    </ScreenLayout>
  );
}
