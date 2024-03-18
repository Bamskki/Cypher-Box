import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { scanQrHelper } from "../../../helpers/scan-qr";
import DeeplinkSchemaMatch from "../../../class/deeplink-schema-match";
import triggerHapticFeedback, { HapticFeedbackTypes } from "../../../blue_modules/hapticFeedback";
import { BlinkText, Current } from "@Cypher/assets/images";
import { GradientButton, GradientCard } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { Text } from "@Cypher/component-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGetBalanceQuery from "../../../apollo/hooks/useGetBalanceQuery";

interface Props {
    route: any;
}

export default function HomeScreen({ route }: Props) {
    const { navigate }: any = useNavigation();
    const routeName = useRoute().name;
    const [isLogin, setLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { data, loading, error } = useGetBalanceQuery();

    useEffect(() => {
        async function handleToken() {
          const token = await getToken()
          setLogin(!!token);
          setIsLoading(false);
        }
        handleToken();
      }, []);
      
      const getToken = async () => {
        const authToken = await AsyncStorage.getItem('authToken');
        return authToken;
      };
    
    const navigateToSettings = () => {
        navigate('Settings');
    };

    const onScanButtonPressed = () => {
        // scanQrHelper(navigate, routeName).then(onBarScanned);
    };

    const loginClickHandler = () => {
        navigate('LoginBlink');
    };

    useFocusEffect(() => {
        if (route?.params?.isLogin_)
            setLogin(route?.params?.isLogin_);
    });

    // const onBarScanned = (value: any) => {
    //     if (!value) return;
    //     DeeplinkSchemaMatch.navigationRouteFor({ url: value }, completionValue => {
    //         triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
    //         navigate(...completionValue);
    //     });
    // };

    const createChekingAccountClickHandler = () => {
        navigate('DownloadBlink');
    }

    const receiveClickHandler = () => {
        navigate('ReceivedMethodScreen');
    }

    console.log('data: ',data)
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.title}>
                    <Text subHeader bold>Total Balance</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.imageView}
                            onPress={navigateToSettings}>
                            <Image style={styles.image}
                                resizeMode="contain"
                                source={require('../../../img/settings.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageView}
                            onPress={onScanButtonPressed}>
                            <Image style={styles.image}
                                resizeMode="contain"
                                source={require('../../../img/scan-new.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <GradientCard style={styles.priceView} disabled>
                    <View style={styles.inner}>
                        <Text subHeader bold>{data && data.me.defaultAccount.wallets[0].balance ? data.me.defaultAccount.wallets[0].balance : 0.00000000} BTC</Text>
                        <Text subHeader bold>$0</Text>
                    </View>
                </GradientCard>
                {!data && loading && isLoading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={colors.pink.default} />
                    </View>
                    :
                    isLogin && data ?
                    <>
                        <GradientCard style={styles.linearGradient2} disabled>
                            <View style={styles.view}>
                                <Text h2 bold style={styles.check}>Checking Account</Text>
                                <Image source={BlinkText} style={styles.blink} resizeMode="contain" />
                            </View>
                            <Text h2 bold style={styles.sats}>{data?.me?.defaultAccount.wallets[0].balance ? data.me.defaultAccount.wallets[0].balance : 0} sats</Text>
                            <View style={styles.showLine} />
                        </GradientCard>
                        <View style={styles.btnView}>
                            <View style={styles.receiveView}>
                                <Image source={Current} style={styles.current} />
                                <GradientButton title="Receive" style={styles.flex} />
                            </View>
                            <GradientButton title="Send" style={styles.flex} disabled />
                        </View>
                        <Text h4 style={styles.alert}>Nice! You can now deposit and accumulate bitcoin into your Checking Account. </Text>
                    </>
                    : !loading && !isLoading &&
                    <>
                        <GradientCard style={styles.linearGradient} onPress={createChekingAccountClickHandler}>
                            <View style={styles.middle}>
                                <Image style={styles.arrow}
                                    resizeMode="contain"
                                    source={require('../../../img/arrow-right.png')}
                                />
                                <Text h2>Create Your Checking Account</Text>
                            </View>
                        </GradientCard>
                        <View style={styles.alreadyView}>
                            <Text bold style={styles.text}>Already have an account?</Text>
                            <TouchableOpacity onPress={loginClickHandler}>
                                <Text bold style={styles.login}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
            <GradientCard colors_={[colors.silver, colors.silver]} disabled>
                <View style={styles.bottomcard}>
                    <View style={styles.bottominner}>
                        <Text h2>Savings Vault</Text>
                        <View style={styles.row}>
                            <Text h3 bold style={styles.bitcointext}>Bitcoin Network</Text>
                            <Image style={styles.bitcoinimg}
                                resizeMode="contain"
                                source={require('../../../img/bitcoin.png')}
                            />
                        </View>
                    </View>
                </View>
            </GradientCard>
        </View>
    )
}