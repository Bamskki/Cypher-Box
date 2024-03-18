import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
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
import { BlinkText, Current } from "@Cypher/assets/images";
import {
  GradientButtonWithShadow,
  GradientCardWithShadow,
} from "@Cypher/components";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { Shadow } from "react-native-neomorph-shadows";

interface Props {
  route: any;
}

export default function HomeScreen({ route }: Props) {
  const { navigate } = useNavigation();
  const routeName = useRoute().name;
  const [isLogin, setLogin] = useState<boolean>(false);

  const navigateToSettings = () => {
    dispatchNavigate("Settings");
  };

  const onScanButtonPressed = () => {
    scanQrHelper(navigate, routeName).then(onBarScanned);
  };

  const loginClickHandler = () => {
    dispatchNavigate("LoginBlink");
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
    dispatchNavigate("CheckAccount");
  };

  const receiveClickHandler = () => {};

  const sendClickHandler = () => {};

  return (
    <ScreenLayout>
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
              <Text subHeader bold>
                0.00000000 BTC
              </Text>
              <Text subHeader bold>
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
              <GradientCardWithShadow style={styles.linearGradient} disabled>
                <View style={styles.view}>
                  <Text h2 bold style={styles.check}>
                    Checking Account
                  </Text>
                  <Image
                    source={BlinkText}
                    style={styles.blink}
                    resizeMode="contain"
                  />
                </View>
                <Text h2 bold style={styles.sats}>
                  0 sats
                </Text>
                <View style={styles.showLine} />
              </GradientCardWithShadow>
              <View style={styles.btnView}>
                <View style={styles.receiveView}>
                  <Image source={Current} style={styles.current} />
                  <GradientButtonWithShadow
                    title="Receive"
                    style={styles.flex}
                    onPress={receiveClickHandler}
                    isShadow
                    isTextShadow
                  />
                </View>
                <GradientButtonWithShadow
                  title="Send"
                  style={styles.flex}
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
                style={styles.linearGradient}
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
              <Text h2>Savings Vault</Text>
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
