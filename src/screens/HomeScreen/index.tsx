import React, { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { Bitcoin, CoinOSSmall, CurrencyWhite, Current, LeftArrow, LiquidBitCoin, Socked } from "@Cypher/assets/images";
import {
  GradientButtonWithShadow,
  GradientCard,
  GradientCardWithShadow,
  GradientText,
} from "@Cypher/components";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { Shadow } from "react-native-neomorph-shadows";
import { colors, heights } from "@Cypher/style-guide";
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from "react-native-linear-gradient";
import ReceivedList from "./ReceivedList";

interface Props {
  route: any;
}

export default function HomeScreen({ route }: Props) {
  const { navigate } = useNavigation();
  const routeName = useRoute().name;
  const [isLogin, setLogin] = useState<boolean>(true);
  // const [storage, setStorage] = useState<number>(-1);
  const refRBSheet = useRef<any>(null);

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
    dispatchNavigate('SendScreen');
  };

  const checkingAccountClickHandler = () => {
    dispatchNavigate('CheckingAccount');
  }

  return (
    <ScreenLayout disableScroll>
      <View style={styles.container}>
        <View>
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
                0.00000000 BTC
              </Text>
              <Text bold style={styles.priceusd} >
                $0
              </Text>
              <Shadow
                inner
                useArt
                style={styles.shadowBottom}
              />
            </Shadow>
          </View>
          {isLogin ? (
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
                      0   sats ~ $0
                    </Text>
                    <Text bold style={styles.totalsats}>2M sats</Text>
                  </View>
                  <View style={styles.showLine}>
                    <View style={styles.box} />
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
              <Text h4 style={styles.alert}>
                Nice! You can now receive, send, and accumulate bitcoin using your Checking Account. New security features will be revealed once you meet the withdrawal threshold at 2 million sats
              </Text>
              <View style={styles.bottom}>
                <View style={styles.bottominner}>
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
                <View style={styles.container3}>
                  <GradientCard colors_={['#464D6854', '#FFF']} style={styles.container2} linearStyle={styles.main}>
                    <View style={styles.container4}>
                      <Text h3 bold style={styles.storageText}>Hot Storage</Text>
                      <Text h3 bold style={styles.storageText}>Cold Storage</Text>
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
        <ReceivedList refRBSheet={refRBSheet} />
      </RBSheet>
    </ScreenLayout>
  );
}
