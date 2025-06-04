import { CoinOSSmall, PlusNew, Refresh, Strike2 } from "@Cypher/assets/images";
import { Text } from "@Cypher/component-library";
import { BlackBGView, Card, CircleTimer, GradientButtonWithShadow, GradientCardWithShadow, GradientView } from "@Cypher/components";
import { calculateBalancePercentage, dispatchNavigate } from "@Cypher/helpers";
import useAuthStore from "@Cypher/stores/authStore";
import React, { useState } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { colors, shadow, widths } from "@Cypher/style-guide";
import GradientBorderView from "../GradientBorderView";
import CircleProgressBar from "../CircleProgressBar";

interface Props {
    balance: any;
    wallet: any;
    isLoading: boolean;
    matchedRate: any;
    currency: any;
    convertedRate: any;
    refRBSheet: any;
    setReceiveType: any;
}

export default function CoinosWallet({
    balance,
    wallet,
    isLoading,
    matchedRate,
    currency,
    convertedRate,
    refRBSheet,
    setReceiveType,
}: Props) {
    const { isAuth, withdrawThreshold, reserveAmount } = useAuthStore();

    const [isCheckingAccount, setCheckingAccount] = useState(true);

    const receiveClickHandler = (type: boolean) => {
        if(type){
            setReceiveType(type);
            refRBSheet.current.open();
        }else {
            dispatchNavigate('CheckingAccountNew', { wallet: wallet, matchedRate });
        }
    };

    const sendClickHandler = (walletType: boolean) => {
        dispatchNavigate('BuyBitcoin', { currency, matchedRate, receiveType: walletType });
        // dispatchNavigate('SendScreen', { currency, matchedRate, receiveType: walletType });
    };

    const hasFilledTheBar = calculateBalancePercentage(Number(balance), Number(withdrawThreshold), Number(reserveAmount)) === 100

    const checkingAccount = {
        first: {
            value: '1.5 M sats',
            convertedValue: '~  $750',
            image: Strike2,
        },
        second: {
            value: '0 sats',
            convertedValue: '~  $0',
            image: CoinOSSmall,
        }
    };

    const checkingAccountClickHandler = (walletType: boolean) => {
        dispatchNavigate('CheckingAccount', { matchedRate, receiveType: walletType });
    }

    const loginClickHandler = () => {
        // dispatchNavigate('LoginCoinOSScreen');
        dispatchNavigate('CheckingAccountIntro');
    };

    const createChekingAccountClickHandler = () => {
        Linking.openURL('https://coinos.io/register')
        // dispatchNavigate("CheckAccount");
    };

    return (
        <>
            {isAuth && !isCheckingAccount ?
                <>
                    <Card
                        balance={balance}
                        convertedRate={convertedRate}
                        reserveAmount={reserveAmount}
                        withdrawThreshold={withdrawThreshold}
                        onPress={checkingAccountClickHandler}
                        isShowButtons
                        receiveClickHandler={receiveClickHandler}
                        sendClickHandler={sendClickHandler}
                    />
                    {!isLoading &&
                        (hasFilledTheBar ?
                            <Text h4 style={styles.alert}>
                                Your sats have materialized! You can create a Hot Storage Savings Vault and take full self-custody of your money by withdrawing a large chunk of a bitcoin from your custodian Lightning Account. Click the Withdraw button to know more
                                {/* You can receive, send, and accumulate bitcoin using your Lightning Account. New security features will be revealed once you meet the withdrawal threshold at 2 million sats */}
                            </Text>
                            : (Number(balance) === Number(withdrawThreshold + reserveAmount)) ?
                                <Text h4 style={styles.alert}>
                                    Congrats! You've completed the bar, It's time to create your Hot Storage Savings Vault and take full self-custody of your bitcoi. Click 'Withdraw' to know more.
                                </Text>
                                :
                                <Text h4 style={styles.alertGrey}>
                                    {/* New security upgrades will be revealed once you meet fill up the bar displayed on your Lightning Account. */}
                                    {'\n'}
                                </Text>
                        )
                    }
                </>
                :
                <View style={{
                    // backgroundColor:'red',
                    // backgroundColor: 'green',
                    marginBottom: 20
                }}>
                    <View style={styles.circularView}>
                        <TouchableOpacity onPress={() => { }} style={styles.circleContainer}>
                            <CircleTimer progress={90} size={135} strokeWidth={7} {...checkingAccount.first} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={styles.circleContainer}>
                            <CircleTimer progress={0} size={135} strokeWidth={7}{...checkingAccount.second} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnView}>
                        <GradientView
                            onPress={() => receiveClickHandler(true)}
                            topShadowStyle={styles.outerShadowStyle}
                            bottomShadowStyle={styles.innerShadowStyle}
                            style={styles.linearGradientStyle}
                            linearGradientStyle={styles.mainShadowStyle}
                        >
                            <Text h3 style={{ ...shadow.text25 }}>Receive</Text>
                        </GradientView>
                        <GradientView
                            topShadowStyle={styles.shadowTop2}
                            bottomShadowStyle={styles.shadowBottom2}
                            style={styles.refresh}
                            linearGradientStyleMain={styles.refresh}
                            isShadow
                        >
                            <Image source={Refresh} />
                        </GradientView>
                        <GradientView
                            onPress={() => receiveClickHandler(false)}
                            topShadowStyle={styles.outerShadowStyle}
                            bottomShadowStyle={styles.innerShadowStyle}
                            style={styles.linearGradientStyle}
                            linearGradientStyle={styles.mainShadowStyle}
                        >
                            <Text h3 style={{ ...shadow.text25 }}>Send</Text>
                        </GradientView>
                    </View>
                </View>
            }

            {!isAuth &&
                // <View style={{ height: '42%' }}>
                <View>
                    <GradientCardWithShadow
                        style={styles.createView}
                        onPress={loginClickHandler}
                    >
                        <View style={styles.middle}>
                            <Image
                                style={styles.arrow}
                                resizeMode="contain"
                                source={require("../../../img/arrow-right.png")}
                            />
                            <Text h2 style={styles.shadow} center>
                                Login to Your Lightning Account
                            </Text>
                        </View>
                    </GradientCardWithShadow>
                    <View style={styles.createAccount}>
                        <Text bold style={styles.text}>
                            Don’t have an account?
                        </Text>
                        <TouchableOpacity onPress={createChekingAccountClickHandler}>
                            <Text bold style={styles.login}>
                                Create on Coinos.io
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}
