import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { ActivityIndicator, Image, Linking, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import SimpleToast from "react-native-simple-toast";
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
import { bitcoinRecommendedFee, createInvoice, getCurrencyRates, getInvoiceByLightening, getMe, getTransactionHistory } from "@Cypher/api/coinOSApis";
import { btc, formatNumber, matchKeyAndValue } from "@Cypher/helpers/coinosHelper";
import { AbstractWallet, HDSegwitBech32Wallet, HDSegwitP2SHWallet } from "../../../class";
import loc, { formatBalance, formatBalanceWithoutSuffix } from '../../../loc';
import { initialState, walletReducer } from "../../../screen/wallets/add";
import { BlueStorageContext } from '../../../blue_modules/storage-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { startsWithLn } from "../Send";

interface Props {
  route: any;
}

export const calculatePercentage = (withdrawThreshold: number, reserveAmount: number) => {
  const threshold = Number(withdrawThreshold);
  const reserve = Number(reserveAmount);

  const percentage = (threshold / (threshold + reserve)) * 100;
  return Math.min(percentage, 100);
};

export function calculateBalancePercentage(balance: number, withdrawThreshold: number, reserveAmount: number) {
  const total = withdrawThreshold + reserveAmount;

  if (total === 0) {
    return 0; // Prevent division by zero
  }

  const percentage = (balance / total) * 100;
  const resPercentage = percentage > 100 ? 100 : percentage;
  return parseFloat(resPercentage.toFixed(2)); // Return percentage rounded to 2 decimal places
}

export default function HomeScreen({ route }: Props) {
  const { navigate } = useNavigation();
  const routeName = useRoute().name;
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const label = state.label;
  const { addWallet, saveToDisk, isAdvancedModeEnabled, wallets, sleep, isElectrumDisabled } = useContext(BlueStorageContext);
  const { isAuth, walletID, coldStorageWalletID, token, user, withdrawThreshold, reserveAmount, vaultTab, setUser, setVaultTab } = useAuthStore();
  const A = require('../../../blue_modules/analytics');
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
  const [isAllDone, setIsAllDone] = useState<boolean>(false);
  const [wallet, setWallet] = useState(undefined);
  const [balanceVault, setBalanceVault] = useState<string | false | undefined>("");
  const [balanceWithoutSuffix, setBalanceWithoutSuffix] = useState()
  const [coldStorageWallet, setColdStorageWallet] = useState(undefined);
  const [ColdStorageBalanceVault, setColdStorageBalanceVault] = useState<string | false | undefined>("");
  const [coldStorageBalanceWithoutSuffix, setColdStorageBalanceWithoutSuffix] = useState()
  const [recommendedFee, setRecommendedFee] = useState<any>();
  const [vaultAddress, setVaultAddress] = useState('')
  const [coldStorageAddress, setColdStorageAddress] = useState('')
  const [hasSavingVault, setHasSavingVault] = useState<boolean | null>()
  const [hasColdStorage, setHasColdStorage] = useState<boolean>(false);
  const [sendAddress, setSendAddress] = useState<any>()
  const refRBSheet = useRef<any>(null);

  const getWalletID = async () => {
    try {
      return await AsyncStorage.getItem('wallet@ID');
    } catch (error) {
      console.error('Error getting auth token from AsyncStorage:', error);
      throw error;
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.isComplete) setIsAllDone(true);
      if (!coldStorageWalletID) setColdStorageWallet(undefined)
      if (!walletID) setWallet(undefined)

      if(!walletID && coldStorageWalletID) {
        setVaultTab(true);
      } else if(walletID && !coldStorageWalletID) {
        setVaultTab(false);
      }
    }, [wallet, coldStorageWalletID, walletID]),
  );


  const getWallet = async () => {
    const allWallets = wallets.concat(false);
    const walletTemp = allWallets.find((w: AbstractWallet) => w.getID() === walletID);
    const balanceTemp = !walletTemp?.hideBalance && formatBalance(walletTemp?.getBalance(), walletTemp?.getPreferredBalanceUnit(), true);
    const balanceWithoutSuffixTemp = !walletTemp?.hideBalance && formatBalanceWithoutSuffix(Number(walletTemp?.getBalance()), walletTemp?.getPreferredBalanceUnit(), true);
    await walletTemp.fetchBalance()
    setWallet(walletTemp);
    setBalanceWithoutSuffix(balanceWithoutSuffixTemp)
    setBalanceVault(balanceTemp)
    const hasVault = walletTemp.secret ? true : false;
    setHasSavingVault(hasVault)
    if (wallets && walletID) {
      setIsAllDone(!!walletTemp);
    } else {
      setIsAllDone(false)
    }
  }

  const getColdStorageWallet = async () => {
    const allWallets = wallets.concat(false);
    const walletTemp = allWallets.find((w: AbstractWallet) => w.getID() === coldStorageWalletID);
    const balanceTemp = !walletTemp?.hideBalance && formatBalance(walletTemp?.getBalance(), walletTemp?.getPreferredBalanceUnit(), true);
    const balanceWithoutSuffixTemp = !walletTemp?.hideBalance && formatBalanceWithoutSuffix(Number(walletTemp?.getBalance()), walletTemp?.getPreferredBalanceUnit(), true);
    await walletTemp.fetchBalance()
    setColdStorageWallet(walletTemp);
    setColdStorageBalanceWithoutSuffix(balanceWithoutSuffixTemp)
    setColdStorageBalanceVault(balanceTemp)
    const hasVault = walletTemp.secret ? true : false;
    setHasColdStorage(hasVault)
    if (wallets && coldStorageWalletID) {
      setIsAllDone(!!walletTemp);
    } else {
      setIsAllDone(false)
    }
  }

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
    getWallet();
    coldStorageWalletID && getColdStorageWallet();
    handleToken();
  }, [isAuth, token, wallets, walletID, coldStorageWalletID]);

  useEffect(() => {
    if (isAuth && token && ((!vaultAddress.startsWith('ln') && !vaultAddress.includes('@')) || (!coldStorageAddress.startsWith('ln') && !coldStorageAddress.includes('@'))) && !recommendedFee) {
      const init = async () => {
        const res = await bitcoinRecommendedFee();
        setRecommendedFee(res);
      }
      init();
    }
  }, [vaultAddress, coldStorageAddress])

  useEffect(() => {
    if(sendAddress && isAuth && token){
      if(startsWithLn(sendAddress)){
        handleLighteningInvoice()
      } else {
        dispatchNavigate('SendScreen', { currency, matchedRate, destination: sendAddress.toLowerCase() });
      }
    }
  }, [sendAddress, isAuth, token])

  const handleLighteningInvoice = async () => {
    try {
      const response = await getInvoiceByLightening(sendAddress);
      console.log('response getInvoiceByLightening: ', response)
      const dollarAmount = (response.amount_msat / 1000) * matchedRate * btc(1);
      console.log('dollarAmount: ', dollarAmount)
      if(dollarAmount){
        dispatchNavigate('ReviewPayment', {
          value: response.amount_msat / 1000,
          converted: dollarAmount,
          isSats: true,
          to: sendAddress,
          fees: 0,
          type: 'lightening',
          description: response?.description,
          matchedRate: matchedRate,
          currency: currency,
          recommendedFee: recommendedFee || 0
        });
      } else {
        dispatchNavigate('SendScreen', { currency, matchedRate, destination: sendAddress.toLowerCase() });
      }
    } catch (error) {
        console.error('Error Send Lightening:', error);
        SimpleToast.show('Failed to generate lightening. Please try again.', SimpleToast.SHORT);
    }
}
  const obtainWalletAddress = async () => {
    let newAddress;
    try {
      if (!isElectrumDisabled && wallet) newAddress = await Promise.race([wallet?.getAddressAsync(), sleep(1000)]);
    } catch (_) { }
    if (newAddress === undefined && wallet) {
      // either sleep expired or getAddressAsync threw an exception
      console.warn('either sleep expired or getAddressAsync threw an exception');
      newAddress = wallet._getExternalAddressByIndex(wallet.getNextFreeAddressIndex());
    } else {
      saveToDisk(); // caching whatever getAddressAsync() generated internally
    }
    setVaultAddress(newAddress);
  }

  const obtainColdWalletAddress = async () => {
    let newAddress;
    try {
      if (!isElectrumDisabled && coldStorageWallet) newAddress = await Promise.race([coldStorageWallet?.getAddressAsync(), sleep(1000)]);
    } catch (_) { }
    if (newAddress === undefined && coldStorageWallet) {
      // either sleep expired or getAddressAsync threw an exception
      console.warn('either sleep expired or getAddressAsync threw an exception');
      newAddress = coldStorageWallet._getExternalAddressByIndex(coldStorageWallet.getNextFreeAddressIndex());
    } else {
      saveToDisk(); // caching whatever getAddressAsync() generated internally
    }
    setColdStorageAddress(newAddress);
  }

  useFocusEffect(
    useCallback(() => {
      setSendAddress(null)
      if (wallet) {
        obtainWalletAddress();
        (async () => {
          try {
            await Promise.race([wallet?.fetchUtxo(), sleep(10000)]);
          } catch (e) {
            console.log('coincontrol wallet.fetchUtxo() failed'); // either sleep expired or fetchUtxo threw an exception
          }
        })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet, sleep]),
  );

  useFocusEffect(
    useCallback(() => {
      if (coldStorageWallet) {
        obtainColdWalletAddress();
        (async () => {
          try {
            await Promise.race([coldStorageWallet?.fetchUtxo(), sleep(10000)]);
          } catch (e) {
            console.log('coincontrol coldStorageWallet.fetchUtxo() failed'); // either sleep expired or fetchUtxo threw an exception
          }
        })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coldStorageWallet, sleep]),
  );

  const handleUser = async () => {
    try {
      const response = await getMe();
      const responsetest = await getCurrencyRates();
      const currency = btc(1);
      const matched = matchKeyAndValue(responsetest, 'USD')
      setMatchedRate(matched || 0)
      setConvertedRate((matched || 0) * currency * response.balance)
      setCurrency("USD")
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
    dispatchNavigate("Settings");
  };

  const onScanButtonPressed = () => {
    scanQrHelper(navigate, routeName).then(onBarScanned);
  };

  const loginClickHandler = () => {
    dispatchNavigate('LoginCoinOSScreen');
  };

  const onBarScanned = (value: any) => {
    if (!value) return;
    console.log('value: ', value)
    setSendAddress(value);
    // DeeplinkSchemaMatch.navigationRouteFor(
    //   { url: value },
    //   (completionValue) => {
    //     triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
    //     navigate(...completionValue);
    //   }
    // );
  };

  const createChekingAccountClickHandler = () => {
    Linking.openURL('https://coinos.io/register')
    // dispatchNavigate("CheckAccount");
  };

  const receiveClickHandler = () => {
    refRBSheet.current.open();
  };

  const sendClickHandler = () => {
    dispatchNavigate('SendScreen', { currency, matchedRate });
  };

  const checkingAccountClickHandler = () => {
    dispatchNavigate('CheckingAccount', { matchedRate });
  }
  

  const withdrawClickHandler = () => {
    console.log('recommendedFee: ', recommendedFee)
    if(vaultTab && !coldStorageWallet){
      SimpleToast.show('You need to have a cold storage wallet to withdraw', SimpleToast.SHORT);
      return
    }

    if (wallet || coldStorageWallet) {
      const amount = withdrawThreshold > balance ? balance : withdrawThreshold;
      dispatchNavigate('ReviewPayment', {
        value: amount,
        converted: ((Number(matchedRate) || 0) * btc(1) * Number(amount)).toFixed(2),
        isSats: true,
        to: vaultTab ? coldStorageAddress : vaultAddress,
        fees: 0,
        matchedRate: matchedRate,
        currency: currency,
        type: 'bitcoin',
        feeForBamskki: 0,
        recommendedFee,
        wallet: vaultTab ? coldStorageWallet : wallet,
        isWithdrawal: true
      });
    } else {
      dispatchNavigate('SavingVaultIntro');
    }
  };

  const topupClickHandler = async () => {
    // dispatchNavigate('PurchaseVault', {
    //   data: {}
    // });
    if(vaultTab && !coldStorageWallet){
      SimpleToast.show('You need to have a cold storage wallet to top up', SimpleToast.SHORT);
      return
    }
    try {
      const response = await createInvoice({
        type: 'bitcoin',
      });
      dispatchNavigate('HotStorageVault', { wallet: vaultTab ? coldStorageWallet : wallet, matchedRate, to: response.hash });
      console.log('response: ', response)
    } catch (error) {
      console.error('Error generating bitcoin address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savingVaultClickHandler = () => {
    dispatchNavigate('HotStorageVault', { wallet: vaultTab ? coldStorageWallet : wallet, matchedRate });
  };

  const coldStorageClickHandler = () => {
    setVaultTab(true);
  };

  const handleCreateColdVault = () => {
    dispatchNavigate('ConnectColdStorage');
  }

  const hotStorageClickHandler = () => {
    setVaultTab(false);
    if(!walletID){
      dispatchNavigate('SavingVaultIntroNew');      
    }
  };

  const handleCreateVault = () => {
    dispatchNavigate('SavingVaultIntro');
  }

  const handleRecoverSavingVault = () => {
    dispatchNavigate('RecoverSavingVault');
  };


  const onRefresh = async () => {
    setRefreshing(true);
    if (wallet) {
      await wallet?.fetchBalance();
    }
    if(coldStorageWallet){
      await coldStorageWallet?.fetchBalance();
    }
    handleUser()
  };


  const createWallet = async () => {
    setIsLoading(true);

    let w: HDSegwitBech32Wallet;
    // btc was selected
    // index 2 radio - hd bip84
    w = new HDSegwitBech32Wallet();
    w.setLabel(label || loc.wallets.details_title);

    await w.generate();
    addWallet(w);
    await saveToDisk();
    A(A.ENUM.CREATED_WALLET);
    triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
    if (w.type === HDSegwitP2SHWallet.type || w.type === HDSegwitBech32Wallet.type) {
      // @ts-ignore: Return later to update
      dispatchNavigate('SavingVaultIntro', {
        walletID: w.getID(),
      });
    }
  };

  const hasFilledTheBar = calculateBalancePercentage(Number(balance), Number(withdrawThreshold), Number(reserveAmount)) === 100

  console.log('ColdStorageBalanceVault: ', Number(ColdStorageBalanceVault?.split(' ')[0]), Number(balanceVault?.split(' ')[0]))
  return (
    <ScreenLayout
      RefreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }
      disableScroll={isAuth ? false : true}>
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
                      {/* {(btc(1) * (Number(balance) || 0)) + (Number(ColdStorageBalanceVault?.split(' ')[0]) || 0) + (Number(balanceVault?.split(' ')[0]) || 0)} BTC */}
                      {((btc(1) * (Number(balance) || 0)) + (Number(ColdStorageBalanceVault?.split(' ')[0]) || 0) + (Number(balanceVault?.split(' ')[0]) || 0)).toFixed(8)} BTC
                      </Text>
                    <Text bold style={styles.priceusd} >
                      {"$" + (Number(convertedRate || 0) + ((Number(coldStorageBalanceWithoutSuffix || 0) * Number(matchedRate || 0)) + (Number(balanceWithoutSuffix || 0) * Number(matchedRate || 0)))).toFixed(2)}
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

          {isAuth &&
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
                      {formatNumber(Number(withdrawThreshold) + Number(reserveAmount))} sats
                    </Text>
                  </View>
                  <View>
                    <View style={styles.showLine} />
                    <View style={[styles.box, { left: `${calculatePercentage(Number(withdrawThreshold), (Number(reserveAmount)))}%` }]} />
                    <LinearGradient
                      start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                      colors={[colors.white, colors.pink.dark]}
                      style={[styles.linearGradient2, { width: `${calculateBalancePercentage(Number(balance), Number(withdrawThreshold), Number(reserveAmount))}%` }]}>
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
                (hasFilledTheBar ?
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
            </>
          }

          {/* {isAuth ? (
            <> */}

          {!isAuth &&
            <View style={{ height: '42%' }}>
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
                  <Text h2 style={styles.shadow}>
                    Login to Your Checking Account
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
          <View style={styles.bottom}>
            {isAuth &&
              <View style={styles.bottominner}>
                {(hasSavingVault && walletID) &&
                  <GradientView
                    onPress={topupClickHandler}
                    topShadowStyle={[styles.outerShadowStyle, vaultTab && {shadowColor: colors.blueText}]}
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
                }
                {(hasSavingVault && walletID) &&
                  <GradientView
                    onPress={withdrawClickHandler}
                    topShadowStyle={[styles.outerShadowStyle, vaultTab && {shadowColor: colors.blueText}]}
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

                }
              </View>
            }

            {(hasSavingVault && walletID && !vaultTab) &&
              <SavingVault
                container={StyleSheet.flatten([styles.savingVault, { marginTop: 10 }])}
                innerContainer={styles.savingVault}
                shadowTopBottom={styles.savingVault}
                shadowBottomBottom={styles.savingVault}
                bitcoinText={styles.bitcoinText}
                onPress={savingVaultClickHandler}
                bitcoinValue={balanceVault}
                inDollars={`$${(Number(balanceWithoutSuffix) * Number(matchedRate)).toFixed(2)}`}
                isColorable
              />
            }

            {(hasColdStorage && vaultTab) ?
              <SavingVault
                container={StyleSheet.flatten([styles.savingVault, { marginTop: 10 }])}
                innerContainer={styles.savingVault}
                shadowTopBottom={styles.savingVault}
                shadowBottomBottom={styles.savingVault}
                bitcoinText={styles.bitcoinText}
                title={"Cold Storage"}
                onPress={savingVaultClickHandler}
                bitcoinValue={ColdStorageBalanceVault}
                inDollars={`$${(Number(coldStorageBalanceWithoutSuffix) * Number(matchedRate)).toFixed(2)}`}
                isColorable
              />
              : vaultTab && !coldStorageWalletID &&
              <View style={[styles.createVaultContainer, {top: 0}]}>
                <TouchableOpacity
                  onPress={handleCreateColdVault}
                >
                  <LinearGradient
                    colors={['#1E1E1E', '#6D6D6D']}
                    start={{ x: 0, y: -0.1 }}
                    end={{ x: 0, y: 2 }}
                    locations={[0, 1]}
                    style={[styles.createVault, {justifyContent: 'center'}]}>
                    <Text h2 style={styles.createVaultText}>
                      Create Cold Vault
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            }
            <View style={[styles.container3, { opacity: hasSavingVault ? 1 : 0.5, }]}>
              {(hasSavingVault && walletID) &&
                <GradientCard colors_={['#464D6854', '#FFF']} style={styles.container2} linearStyle={styles.main}>
                  <View style={styles.container4}>
                    {!hasSavingVault ?
                      <Text h3 bold style={styles.storageText} onPress={hotStorageClickHandler}>Hot Storage</Text>
                      :
                      <View style={[styles.bottomBtn, !vaultTab && {        
                        borderWidth: !vaultTab ? 2 : 0,
                        borderColor: !vaultTab ? colors.greenShadow : 'transparent',
                        borderRadius: 25,
                      }]}>
                        <LinearGradient
                          start={{ x: 1, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          locations={[0.25, 1]}
                          colors={['#333333', '#282727']}
                          style={styles.linearGradientbottom}>
                          <Text h3 bold style={{ color: '#FD7A68' }} onPress={hotStorageClickHandler}>Hot Storage</Text>
                        </LinearGradient>
                      </View>
                    }
                    {isAllDone &&
                      <View style={[styles.bottomBtn, { marginEnd: 7.5, marginStart: 0 }, vaultTab && {        
                        borderWidth: vaultTab ? 2 : 0,
                        borderColor: vaultTab ? colors.blueText : 'transparent',
                      }]}>
                        <LinearGradient
                          start={{ x: 1, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          locations={[0.25, 1]}
                          colors={
                            !isAllDone
                              ? [colors.gray.light, colors.gray.light]
                              : ['#333333', '#282727']
                          }
                          style={styles.linearGradientbottom}>
                          <Text h3 bold onPress={coldStorageClickHandler} style={{color: colors.blueText}}>Cold Storage</Text>
                        </LinearGradient>
                      </View>
                    }
                  </View>
                </GradientCard>
              }
              {isAllDone &&
                <View style={styles.circle}>
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
                </View>
              }
            </View>
          </View>

          {/* </>
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
          )} */}
        </View>
      </View>
      <>


        {!walletID &&
          <View style={styles.createVaultContainer}>
            <TouchableOpacity
              onPress={handleCreateVault}
            >
              <LinearGradient
                colors={['#1E1E1E', '#6D6D6D']}
                start={{ x: 0, y: -0.1 }}
                end={{ x: 0, y: 2 }}
                locations={[0, 1]}
                style={styles.createVault}>
                <Text h3 style={styles.advancedText}>⚠  Advanced</Text>
                <Text h2 style={styles.createVaultText}>
                  Create Vault
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.alreadyView}>
              <Text bold style={styles.text}>
                Already have a vault?
              </Text>
              <TouchableOpacity onPress={handleRecoverSavingVault}>
                <Text bold style={[styles.login, { color: colors.green }]}>
                  Recover
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </>
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