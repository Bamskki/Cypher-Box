import { bitcoinRecommendedFee, getCurrencyRates, getInvoiceByLightening, getMe, getTransactionHistory } from "@Cypher/api/coinOSApis";
import { getBalances } from "@Cypher/api/strikeAPIs";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate, isIOS } from "@Cypher/helpers";
import { btc, matchKeyAndValue } from "@Cypher/helpers/coinosHelper";
import useAuthStore from "@Cypher/stores/authStore";
import { colors, heights, widths } from "@Cypher/style-guide";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, TouchableOpacity, View } from "react-native";
import { authorize } from "react-native-app-auth";
import RBSheet from 'react-native-raw-bottom-sheet';
import SimpleToast from "react-native-simple-toast";
import Carousel from "react-native-snap-carousel";
import { mostRecentFetchedRate } from "../../../blue_modules/currency";
import triggerHapticFeedback, {
  HapticFeedbackTypes,
} from "../../../blue_modules/hapticFeedback";
import { BlueStorageContext } from '../../../blue_modules/storage-context';
import { AbstractWallet, HDSegwitBech32Wallet, HDSegwitP2SHWallet } from "../../../class";
import loc, { formatBalance, formatBalanceWithoutSuffix } from '../../../loc';
import { initialState, walletReducer } from "../../../screen/wallets/add";
import { startsWithLn } from "../Send";
import BalanceView from "./BalanceView";
import BottomBar from "./BottomBar";
import CreateLightningAccount from "./CreateLightningAccount";
import Header from "./Header";
import ReceivedListNew from "./ReceivedListNew";
import styles from "./styles";
import WalletsView from "./WalltetsView";
import { BlackBGView } from "@Cypher/components";
import { PlusNew } from "@Cypher/assets/images";

interface Props {
  route: any;
}

const config = {
  id: 'strike',
  name: 'Strike',
  type: 'oauth',
  issuer: "https://auth.strike.me", // Strike Identity Server URL
  clientId: "cypherbox",
  clientSecret: "SbYmuewpZGS8XDktirso8ficpChSGu7dEaYuMrLx+3k=", // If needed (but avoid hardcoding secrets in client-side code)
  redirectUrl: "cypherbox://oauth/callback", // Must match the redirect URI in your Strike app settings
  scopes: ["offline_access", "partner.balances.read", "partner.currency-exchange-quote.read", "partner.account.profile.read", "profile", "openid", "partner.invoice.read", "partner.invoice.create", "partner.invoice.quote.generate", "partner.invoice.quote.read", "partner.rates.ticker"], // Specify necessary scopes
  //clientAuthMethod: "post",
  //wellKnown: `https://auth.strike.me/.well-known/openid-configuration`,
  // authorization: {
  //     params: {
  //         scope: 'partner.invoice.read offline_access',
  //         response_type: 'code',
  //     }
  // },
  idToken: false,
  checks: ['pkce', 'state'],
  // serviceConfiguration: {
  //   authorizationEndpoint: "https://auth.strike.me/oauth/authorize",
  //   tokenEndpoint: "https://auth.strike.me/oauth/token",
  //   revocationEndpoint: "https://auth.strike.me/oauth/revoke",
  // },
};

export default function HomeScreen({ route }: Props) {
  const { navigate } = useNavigation();
  const routeName = useRoute().name;
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const label = state.label;
  const { addWallet, saveToDisk, isAdvancedModeEnabled, wallets, sleep, isElectrumDisabled, startAndDecrypt, setWalletsInitialized } = useContext(BlueStorageContext);
  const { isAuth, isStrikeAuth, strikeToken, walletTab, allBTCWallets, setAllBTCWallets, withdrawStrikeThreshold, reserveStrikeAmount, strikeUser, setWalletTab, setStrikeUser, setStrikeToken, setStrikeAuth, clearStrikeAuth, walletID, coldStorageWalletID, token, user, withdrawThreshold, reserveAmount, vaultTab, setUser, setVaultTab } = useAuthStore();
  const A = require('../../../blue_modules/analytics');
  // const [storage, setStorage] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState(0);
  const [strikeBalance, setStrikeBalance] = useState();
  const [currency, setCurrency] = useState('$');
  const [convertedRate, setConvertedRate] = useState(0);
  const [convertedStrikeRate, setConvertedStrikeRate] = useState(0);
  const [matchedRate, setMatchedRate] = useState(0);
  const [matchedStrikeRate, setMatchedStrikeRate] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [payment, setPayments] = useState([])
  const [wt, setWt] = useState<number>();
  const [isWithdraw, setIsWithdraw] = useState<boolean>(true);
  const [isAllDone, setIsAllDone] = useState<boolean>(false);
  const [wallet, setWallet] = useState(undefined);
  const [balanceVault, setBalanceVault] = useState<string | false | undefined>("");
  const [balanceWithoutSuffix, setBalanceWithoutSuffix] = useState()
  const [coldStorageWallet, setColdStorageWallet] = useState(undefined);
  const [coldStorageBalanceVault, setColdStorageBalanceVault] = useState<string | false | undefined>("");
  const [coldStorageBalanceWithoutSuffix, setColdStorageBalanceWithoutSuffix] = useState()
  const [recommendedFee, setRecommendedFee] = useState<any>();
  const [vaultAddress, setVaultAddress] = useState('')
  const [coldStorageAddress, setColdStorageAddress] = useState('')
  const [hasSavingVault, setHasSavingVault] = useState<boolean | null>()
  const [hasColdStorage, setHasColdStorage] = useState<boolean>(false);
  const [sendAddress, setSendAddress] = useState<any>()
  const [isWalletLoaded, setIsWalletLoaded] = useState(true);
  const [isColdWalletLoaded, setIsColdWalletLoaded] = useState(true);
  const [receiveType, setReceiveType] = useState(false);
  const refRBSheet = useRef<any>(null);
  const carouselRef = useRef<Carousel<any>>(null);

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

      // if(!walletID && coldStorageWalletID) {
      //   setVaultTab(true);
      // } else if(walletID && !coldStorageWalletID) {
      //   setVaultTab(false);
      // }
    }, [wallet, coldStorageWalletID, walletID]),
  );


  const getWallet = async () => {
    try {
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
    } catch (error) {
      console.error('Error getting wallet:', error);
    } finally {
      setIsWalletLoaded(false);
    }
  }

  const getColdStorageWallet = async () => {
    try {
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
    } catch (error) {
      console.error('Error getting wallet:', error);
    } finally {
      setIsColdWalletLoaded(false);
    }
  }

  // useEffect(() => {
  //   successfullyAuthenticated();
  // }, [])

  const handleStrikeLogin = async () => {
    try {
      const result = await authorize(config);
      setStrikeToken(result.accessToken);
      setStrikeAuth(true);
    } catch (error) {
      console.error("OAuth error", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    async function handleToken() {
      if (isAuth && token) {
        handleUser();
        loadPayments();
      } else {
        const rates = await exchangeRate();
        if (rates && rates?.Rate) {
          const numericAmount = Number(rates.Rate.replace(/[^0-9\.]/g, ''));
          setMatchedRate(numericAmount);
        }
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
    // if(!walletID){
    //   setIsWalletLoaded(false)
    // }
    // if(!coldStorageWalletID){
    //   setIsColdWalletLoaded(false)
    // }
    getWallet();
    coldStorageWalletID ? getColdStorageWallet() : setIsColdWalletLoaded(false);
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
    if (sendAddress && isAuth && token) {
      if (startsWithLn(sendAddress)) {
        handleLighteningInvoice()
      } else {
        dispatchNavigate('SendScreen', { currency, matchedRate, destination: sendAddress.toLowerCase() });
      }
    }
  }, [sendAddress, isAuth, token])

  useEffect(() => {
    const getInit = async () => {
      if (strikeToken) {
        const balances = await getBalances();
        if (balances.data?.status === 401) {
          SimpleToast.show("Authorization expired. Please login again to strike account", SimpleToast.SHORT)
          clearStrikeAuth();
        } else if (balances) {
          setStrikeUser(balances);
          // setStrikeBalance(balances);
        }
      }
    }

    getInit();
  }, [strikeToken])

  console.log('strikeToken: ', strikeToken)
  const successfullyAuthenticated = async () => {
    // const hasAcceptedTerms = await AsyncStorage.getItem('hasAcceptedTermsOfService')
    await startAndDecrypt()
    setWalletsInitialized(true);

    // if (await startAndDecrypt()) {
    //     setWalletsInitialized(true);
    //     if (hasAcceptedTerms === 'true') {
    //         dispatch(StackActions.replace(isHandset ? 'Navigation' : 'DrawerRoot'));
    //     } else {
    //         dispatch(StackActions.replace('GetStartedScreen'));
    //     }
    // }
    // else {
    //     dispatchNavigate('WelcomeScreen')
    // }
    // setIsLoading(false);
  };
  const handleLighteningInvoice = async () => {
    try {
      const response = await getInvoiceByLightening(sendAddress);
      const dollarAmount = (response.amount_msat / 1000) * matchedRate * btc(1);
      if (dollarAmount) {
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
      console.error('error: ', error);
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

  const loginClickHandler = () => {
    // dispatchNavigate('LoginCoinOSScreen');
    dispatchNavigate('CheckingAccountIntro');
  };

  const onBarScanned = (value: any) => {
    if (!value) return;
    setSendAddress(value);
    // DeeplinkSchemaMatch.navigationRouteFor(
    //   { url: value },
    //   (completionValue) => {
    //     triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
    //     navigate(...completionValue);
    //   }
    // );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (wallet) {
      await wallet?.fetchBalance();
    }
    if (coldStorageWallet) {
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

  const exchangeRate = async () => {
    const rates = await mostRecentFetchedRate();
    return rates
  }

  console.log('allBTCWallets: ', allBTCWallets)
  return (
    <ScreenLayout
      RefreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }
      disableScroll={isAuth ? false : true}
    >
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          )
            :
            (
              <>
                <Header onBarScanned={onBarScanned} />
                <BalanceView
                  balance={`${((btc(1) * (Number(balance) || 0)) + Number(strikeUser?.[0]?.available || 0) + (Number(coldStorageBalanceVault?.split(' ')[0]) || 0) + (Number(balanceVault?.split(' ')[0]) || 0)).toFixed(8)} BTC`}
                  convertedRate={`$${((Number(strikeUser?.[0]?.available || 0) * matchedRate) + Number(convertedRate || 0) + ((Number(coldStorageBalanceWithoutSuffix || 0) * Number(matchedRate || 0)) + (Number(balanceWithoutSuffix || 0) * Number(matchedRate || 0)))).toFixed(2)}`}
                />
              </>
            )}

          {/* */}

          {(allBTCWallets.length > 0 && allBTCWallets.length < 2) &&
            <View style={styles.checkingaccContainer}>
              <Text bold h2 style={{ height: 32 }}>Checking Accounts</Text>
              <TouchableOpacity
                onPress={() => dispatchNavigate('CheckingAccountIntro')}
                style={{ flex: 1, alignItems: 'flex-end' }}>
                <BlackBGView
                  linearFirstStyle={styles.linearFirstStyle}
                  linearSecondStyle={styles.linearSecondStyle}
                  linearFirstColors={[colors.pink.gradient2, colors.pink.gradient1]}
                  linearSecondColors={[colors.primary, colors.primary]}
                >
                  <Image source={PlusNew} style={styles.plusImage} resizeMode="contain" />
                  <Text h4 semibold style={{ marginStart: 15 }}>Add Account</Text>
                </BlackBGView>
              </TouchableOpacity>
            </View>
          }

          {/* <View style={!isAuth && !isLoading && !isStrikeAuth && {height: '42%'}}> */}
          <View>
            {!isAuth && !isLoading && !isStrikeAuth ?
              <CreateLightningAccount onPress={loginClickHandler} />
              : !isLoading &&
              <WalletsView
                balance={balance}
                convertedRate={convertedRate}
                currency={currency}
                isLoading={isLoading}
                matchedRate={matchedRate}
                refRBSheet={refRBSheet}
                setReceiveType={setReceiveType}
                strikeBalance={strikeBalance}
                wallet={wallet}
              />
            }
          </View>

          {/* */}

        </View>
          {!isLoading && !isWalletLoaded && !isColdWalletLoaded &&
            // <View style={[{height: isIOS && !isAuth ? '36.2%' : isAuth ? '37%' : '35%' }, isIOS && {bottom: 20}, isAuth && styles.bottom, isStrikeAuth && {top: 0}]}>
            // <View style={[{ height: isIOS && !isAuth ? '36.2%' : isAuth ? '37%' : '35%' }, isIOS && { bottom: 20 }, isAuth && styles.bottom, isStrikeAuth && {top: 0}]}>
            // <View style={{backgroundColor:'red',flex: 1,position: 'absolute',bottom:0}}>
            <View style={{height: 205,marginVertical: 15}}>
              <BottomBar
                balance={balance}
                balanceVault={balanceVault}
                balanceWithoutSuffix={balanceWithoutSuffix}
                coldStorageAddress={coldStorageAddress}
                coldStorageBalanceVault={coldStorageBalanceVault}
                coldStorageBalanceWithoutSuffix={coldStorageBalanceWithoutSuffix}
                coldStorageWallet={coldStorageAddress}
                currency={currency}
                hasColdStorage={hasColdStorage}
                hasSavingVault={hasSavingVault}
                matchedRate={matchedRate}
                recommendedFee={recommendedFee}
                vaultAddress={vaultAddress}
                wallet={wallet}
              />
            </View>
          }
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
            height: heights / 2 + 20,
            backgroundColor: 'transparent',
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
        <ReceivedListNew refRBSheet={refRBSheet} receiveType={receiveType} matchedRate={matchedRate} currency={currency} />
      </RBSheet>
    </ScreenLayout>
  );
}
