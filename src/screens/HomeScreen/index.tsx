import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { scanQrHelper } from "../../../helpers/scan-qr";
import DeeplinkSchemaMatch from "../../../class/deeplink-schema-match";
import { CoinOSSmall, Current } from "@Cypher/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetBalanceQuery from "../../../apollo/hooks/useGetBalanceQuery";
import triggerHapticFeedback, {
  HapticFeedbackTypes,
} from "../../../blue_modules/hapticFeedback";
import {
  GradientButtonWithShadow,
  GradientCardWithShadow,
} from "@Cypher/components";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { Shadow } from "react-native-neomorph-shadows";
import { getMe, testAPI } from "../../../api/coinOSApis";

interface Props {
  route: any;
}

export let SATS = 100000000;
export let sats = (n: number) => Math.round(n * SATS);
export let btc = (n: number) => parseFloat((n / SATS).toFixed(8));
export let fiat = (n: number, r: number) => (n * r) / SATS;
export function matchKeyAndValue(obj1: Record<string, number>, value: string) {
  // Iterate through the keys of the first object
  for (let key in obj1) {
      // Check if the value matches any value in the first object
      if (key === value) {
          // Return the key if a match is found
          return obj1[key];
      }
  }
  // If no match is found, return null or any other appropriate value
  return null;
}


export default function HomeScreen({ route }: Props) {
    const { navigate }: any = useNavigation();
    const routeName = useRoute().name;
    const [isLogin, setLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [balance, setBalance] = useState(0);
    const [currency, setCurrency] = useState('$');
    const [convertedRate, setConvertedRate] = useState(0);
    const [matchedRate, setMatchedRate] = useState(0);

    useEffect(() => {
        async function handleToken() {
          const token = await getToken()
          setLogin(!!token);
          console.log('token: ', token)
          if(token) {
            handleUser();
          } else {
            setIsLoading(false)
          }
        }
        handleToken();
      }, []);
      
      const handleUser = async () => {
        try {
          const response = await getMe();
          console.log('response: ', response);
          const responsetest = await testAPI();
          const currency = btc(1);
          const matched = matchKeyAndValue(responsetest, 'USD')
          setMatchedRate(matched || 0)
          console.log('converter: ', (matched || 0) * currency * response.balance);
          setConvertedRate((matched || 0) * currency * response.balance)
          setCurrency("USD")
          console.log('currency: ', currency)
          if(response?.balance) {
            setBalance(response?.balance || 0);
          }
          await AsyncStorage.setItem('user', response?.username);
        } catch (error) {
          console.log('error: ', error);
        } finally {
            setIsLoading(false)
        }
      }

      const getToken = async () => {
        const authToken = await AsyncStorage.getItem('authToken');
        return authToken;
      };
    
    // const navigateToSettings = () => {
    //     navigate('Settings');
    // };

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

  useFocusEffect(() => {
    if (route?.params?.isLogin_) setLogin(route?.params?.isLogin_);
  });

  const onBarScanned = (value: any) => {
    if (!value) return;
    DeeplinkSchemaMatch.navigationRouteFor(
      { url: value },
      (completionValue: any) => {
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
    dispatchNavigate('ReceivedMethodScreen');
  };

  const sendClickHandler = () => {
    console.log('send click');
    dispatchNavigate('SendScreen', {matchedRate, currency, balance});
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <View>
          {isLoading ?
            <ActivityIndicator size="large" color="#ffffff" />
            :
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
                  <Text subHeader bold style={{ marginStart: 2 }}>
                    {btc(1) * (balance || 0)} BTC
                  </Text>
                  <Text bold style={{ fontSize: 20, lineHeight: 24 }} >
                    {"$"+convertedRate.toFixed(2)}
                  </Text>
                  <Shadow
                    inner
                    useArt
                    style={styles.shadowBottom}
                  />
                </Shadow>
              </View>
            </>
          }
          {isLogin ? (
            <>
              <GradientCardWithShadow style={styles.linearGradient} disabled linearStyle={styles.height} shadowStyleTop={styles.top} shadowStyleBottom={styles.height}>
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
                <Text h2 bold style={styles.sats}>
                  {balance}   sats
                </Text>
                <View style={styles.showLine} />
              </GradientCardWithShadow>
              <View style={styles.btnView}>
                <View>
                  <Image source={Current} style={styles.current} />
                  <GradientButtonWithShadow
                    title="Receive"
                    onPress={receiveClickHandler}
                    isShadow
                    isTextShadow
                  />
                </View>
                <GradientButtonWithShadow
                  title="Send"
                  onPress={sendClickHandler}
                  isShadow
                  isTextShadow
                />
              </View>
              <Text h4 style={styles.alert}>
                Nice! You can now deposit and accumulate bitcoin into your
                Checking Account.{" "}
              </Text>
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
      </View>
    </ScreenLayout>
  );
}
