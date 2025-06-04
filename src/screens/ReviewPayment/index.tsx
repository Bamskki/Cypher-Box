import { bitcoinSendFee, getCurrencyRates, getMe, sendBitcoinPayment, sendCoinsViaUsername, sendLightningPayment } from "@Cypher/api/coinOSApis";
import { getOnChainTiers, getPaymentQoute, getPaymentQouteByLightening, getPaymentQouteByLighteningURL, getPaymentQouteByOnChain } from "@Cypher/api/strikeAPIs";
import { Check, Edit } from "@Cypher/assets/images";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { GradientButton, GradientCard, SwipeButton } from "@Cypher/components";
import { dispatchNavigate, isIOS } from "@Cypher/helpers";
import { btc, matchKeyAndValue } from "@Cypher/helpers/coinosHelper";
import useAuthStore from "@Cypher/stores/authStore";
import { colors } from "@Cypher/style-guide";
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import ReactNativeModal from "react-native-modal";
import SimpleToast from "react-native-simple-toast";
import { mostRecentFetchedRate } from "../../../blue_modules/currency";
import TextViewV2 from "../Invoice/TextView";
import { startsWithLn } from "../Send";
import styles from "./styles";
import TextView from "./TextView";

interface Props {
    route: any;
}
type Fee = keyof Fees;

type Fees = {
    fastestFee: number;
    halfHourFee: number;
    hourFee: number;
    economyFee: number;
};

export const shortenAddress = (address: string) => {
    // Take the first 6 characters
    const start = address.substring(0, 6);
    // Take the last 6 characters
    const end = address.substring(address.length - 6);
    // Combine with three dots in the middle
    return `${start}...${end}`;
};

function usdToSats(usdAmount: number, exchangeRate: number): string {
  const btcAmount = usdAmount / exchangeRate;
  const satoshiAmount = Number(btcAmount * 100000000).toFixed(2);
  return satoshiAmount;
}

export default function ReviewPayment({ route }: Props) {
    const { value, converted, isSats, to, type, recommendedFee, isWithdrawal = false, wallet = null, description, receiveType } = route?.params;
    const { withdrawThreshold, reserveAmount, vaultTab } = useAuthStore();
    const [note, setNote] = useState(description || '');
    const [balance, setBalance] = useState(0);
    const [currency, setCurrency] = useState('$');
    const [convertedRate, setConvertedRate] = useState(0);
    const [matchedRate, setMatchedRate] = useState(0);
    const [isStartLoading, setIsStartLoading] = useState(false)
    const [selectedFee, setSelectedFee] = useState<number | null>(null);
    const [selectedFeeName, setSelectedFeeName] = useState<string>("Select Fee");
    const [estimatedFee, setEstimatedFee] = useState<number>(0);
    const [networkFee, setNetworkFee] = useState<number>(0);
    const [bamskiiFee, setBamskiiFee] = useState<number>(0);
    const [feeLoading, setFeeLoading] = useState<boolean>(false);
    const [isSendLoading, setIsSendLoading] = useState<boolean>(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEditAmount, setIsEditAmount] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const [strikeFees, setStrikeFees] = useState<any[]>([]);
    const [selectedStrikeFee, setSelectedStrikeFee] = useState<any>(null);
    const [paymentQuoteData, setPaymentQuoteData] = useState<any>(null);

    const swipeButtonRef = useRef(null);
    const feeNames: Record<Fee, string> = {
        fastestFee: "Fastest",
        halfHourFee: "Fast",
        hourFee: "Medium",
        economyFee: "Slow",
    };

    useEffect(() => {
        if(receiveType)
            handleUser();
        else {
            handleRates();
        }
    }, [receiveType]);

    useEffect(() => {
        if(to.startsWith('bc') && !receiveType){
            handleStrikeOnChainFee();
        }
    }, [to, receiveType])

    useEffect(() => {
        if(to && !receiveType){
            handlePaymentQuote();
        }
    }, [to, isSats, receiveType])

    useEffect(() => {
        if(to.startsWith('bc') && selectedStrikeFee && !receiveType){
            handleStrikeBTCFee(selectedStrikeFee?.id);
        }
    }, [to, selectedStrikeFee, receiveType])

    const exchangeRate = async () => {
        const rates = await mostRecentFetchedRate();
        return rates
    }

    const handleRates = async () => {
        const rates = await exchangeRate();
        if (rates && rates?.Rate) {
          const numericAmount = Number(rates.Rate.replace(/[^0-9\.]/g, ''));
          setMatchedRate(numericAmount);
        }

    }

    const handleStrikeBTCFee = async (onChainTierId: string) => {
        const amount =  receiveType ? isSats ? value : converted : isSats ? converted : value;
        try {
            let payload = {
                btcAddress: to,
                sourceCurrency: "USD",
                amount: {
                    amount: Number(amount),
                    currency: "USD",
                    feePolicy: "EXCLUSIVE"
                },
                description: note,
                onchainTierId: onChainTierId
            }
            let url = 'onchain'
            const response = await getPaymentQoute(url, payload);
            console.log('response: ', response)
            if(response?.amount){
                setPaymentQuoteData(response)
            } else if (response?.data?.message){
                SimpleToast.show(response?.data?.message, SimpleToast.SHORT)
            }
        } catch (error) {
            console.log('error: ', error)
        }
    }

    console.log('paymentQuoteData: ', paymentQuoteData, matchedRate)

    const handlePaymentQuote = async () => {
        setFeeLoading(true);
        try {
            let payload = {}, url = '';
            const amount =  receiveType ? isSats ? value : converted : isSats ? converted : value;
            if (startsWithLn(to)) {
                payload = {
                    lnInvoice: to,
                    sourceCurrency: "USD",
                    amount: {
                        amount: Number(amount),
                        currency: "USD",
                        feePolicy: "EXCLUSIVE"
                    },
                    description: note
                }
                url = 'lightning'
            } else if (to.includes("@")) { //username
                payload = {
                    lnAddressOrUrl: to,
                    sourceCurrency: "USD",
                    amount: {
                        amount: String(amount),
                        currency: "USD"
                    },
                    // description: note
                }
                url = 'lightning/lnurl'
            }
            const response = await getPaymentQoute(url, payload);
            if(response?.amount){
                console.log('setPaymentQuoteData paymentQuoteData?.paymentQuoteId: ', response?.paymentQuoteId)
                setPaymentQuoteData(response)
            }
            console.log('response: ', response)
        } catch (error) {
            console.error('Error Send Lightening:', error);
            SimpleToast.show('Failed to Send. Please try again.', SimpleToast.SHORT);
        } finally {
            setFeeLoading(false);
        }
    }

    const handleStrikeOnChainFee = async () => {
        const amount =  receiveType ? isSats ? value : converted : isSats ? converted : value;
        try {
            const payload = {
                btcAddress: to,
                sourceCurrency: "USD",
                amount: {
                    amount: Number(amount),
                    currency: "USD",
                    feePolicy: "EXCLUSIVE"
                },
                description: note,
                // onchainTierId: 'tier_fast' + Math.floor(Math.random() * 100)
            }
            console.log('payload: ', payload)

            const fees = await getOnChainTiers(payload);
            console.log('strikeFees, ', fees)
            const labeledTiers = fees.map((tier: any) => {
                switch (tier.id) {
                    case 'tier_fast':
                        tier.label = 'Fast';
                        break;
                    case 'tier_standard':
                        tier.label = 'Standard';
                        break;
                    case 'tier_free':
                        tier.label = 'Free';
                        break;
                    default:
                        tier.label = 'Unknown';
                }
                return tier;
            });

            // console.log('strikeFees: ', labeledTiers)
            setStrikeFees(labeledTiers);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const handleUser = async () => {
        setIsStartLoading(true);
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
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setIsStartLoading(false)
        }
    }

    const handleFeeEstimate = async (fee: string) => {
        setFeeLoading(true);
        const amount = isSats ? value : converted;
        if (to.startsWith('bc')) { //bitcoin onchain
            const feeForBamskki = (0.1 / 100) * Number(amount);
            // const remainingAmount = Number(amount) - feeForBamskki;
            const remainingAmount = Number(amount);
            console.log('feeForBamskki: ', feeForBamskki)
            console.log('remainingAmount: ', remainingAmount)
            if (remainingAmount <= 0) {
                SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
                setFeeLoading(false);
                return;
            }

            console.log('recommendedFee[fee]: ', recommendedFee[fee])
            try {
                const estimatedFee = await bitcoinSendFee(remainingAmount, to, recommendedFee[fee] < 9 ? 10 : Number(recommendedFee[fee]));
                let jsonObject = null;
                if (estimatedFee?.startsWith('{')) { // as estimatedFee is a string so this condition is helpful
                    jsonObject = JSON.parse(estimatedFee);
                    console.log(jsonObject, jsonObject.fee);
                    setEstimatedFee(Number(jsonObject.fee))
                    jsonObject?.ourfee && setNetworkFee(Number(jsonObject?.ourfee))
                    setBamskiiFee(Number(feeForBamskki))
                    setSelectedFee(recommendedFee[fee] < 9 ? 10 : Number(recommendedFee[fee]));
                    setSelectedFeeName(feeNames[fee as Fee])
                } else {
                    SimpleToast.show(estimatedFee, SimpleToast.SHORT);
                    return;
                }
                console.log('jsonObject: ', jsonObject);
            } catch (error) {
                console.error('Error Send to bitcoin:', error);
                SimpleToast.show(error?.message ? error?.message : 'Failed to estimate bitcoin fee. Please try again.', SimpleToast.SHORT);
            } finally {
                setModalVisible(false)
                setFeeLoading(false);
            }
        } else { //liquid address
            if (amount == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setFeeLoading(false);
                return;
            }
            const feeForBamskki = (0.1 / 100) * Number(amount);
            const remainingAmount = Number(amount) - feeForBamskki;
            console.log('feeForBamskki: ', feeForBamskki)
            console.log('remainingAmount: ', remainingAmount)
            if (remainingAmount <= 0) {
                SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
                setFeeLoading(false);
                return;
            }

            try {
                const estimatedFee = await bitcoinSendFee(remainingAmount, to, recommendedFee[fee] < 9 ? 10 : Number(recommendedFee[fee]));
                let jsonObject = null;
                if (estimatedFee?.startsWith('{')) { // as estimatedFee is a string so this condition is helpful
                    jsonObject = JSON.parse(estimatedFee);
                    console.log("jsonObject: ", jsonObject, jsonObject.fee);
                    setEstimatedFee(Number(jsonObject.fee))
                    jsonObject?.ourfee && setNetworkFee(Number(jsonObject?.ourfee))
                    setBamskiiFee(Number(feeForBamskki))
                    setSelectedFee(recommendedFee[fee] < 9 ? 10 : Number(recommendedFee[fee]));
                    setSelectedFeeName(feeNames[fee as Fee])
                } else {
                    SimpleToast.show(estimatedFee, SimpleToast.SHORT);
                    return;
                }
            } catch (error) {
                console.error('Error Send to liquid:', error);
                SimpleToast.show(error?.message ? error?.message : 'Failed to estimate liquid fee. Please try again.', SimpleToast.SHORT);
            } finally {
                setModalVisible(false)
                setFeeLoading(false);
            }
        }
    };

    const handleToggle = (val: any) => {
        console.log("🚀 ~ handleToggle ~ value:", val)
        if (val) {
            handleSendSats();
            // if(type == 'lightening' || type == 'username')
            //     dispatchNavigate('Transaction', {matchedRate, type, value, converted, isSats, to});
            // else 
            //     dispatchNavigate('TransactionBroadCast', {matchedRate, type, value, converted, isSats, to});        
        }
    }

    const handleFeeSelect = (fee: string) => {
        console.log('fee: ', fee)
        handleFeeEstimate(fee)
    };

    const handleStrikeFeeSelect = (fee: any) => {
        console.log('fee: ', fee)
        setSelectedStrikeFee(fee);
        setModalVisible(false)
    };

    const handleSendSats = async () => {
        setIsSendLoading(true);
        console.log('value: ', value, converted)
        console.log('handleSendSats paymentQuoteData?.paymentQuoteId: ', paymentQuoteData?.paymentQuoteId)
        const amount =  receiveType ? isSats ? value : converted : isSats ? converted : value;
        if (to == '') {
            SimpleToast.show('Please enter an address or username', SimpleToast.SHORT);
            setIsSendLoading(false);
            return;
        } else if (startsWithLn(to)) { //lightening invoice
            if(receiveType){
                try {
                    const response = await sendLightningPayment(to, note, amount);
                    console.log('response: ', response)
                    if (response?.startsWith('{')) {
                        const jsonLNResponse = JSON.parse(response);
                        dispatchNavigate('Transaction', { matchedRate, type, value, converted, isSats, to, item: jsonLNResponse });
                    } else {
                        SimpleToast.show(response, SimpleToast.SHORT)
                    }

                } catch (error) {
                    console.error('Error Send Lightening:', error);
                    SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
                } finally {
                    setIsSendLoading(false);
                }
            } else {
                try {
                    const payload = {
                        lnInvoice: to,
                        sourceCurrency: "USD",
                        amount: {
                            amount: Number(amount),
                            currency: "USD",
                            feePolicy: "EXCLUSIVE"
                        },
                        description: note
                    }
                    const response = await getPaymentQouteByLighteningURL(payload, paymentQuoteData?.paymentQuoteId);
                    if(response?.amount){
                        console.log('responserresponse: ', response)
                        dispatchNavigate('Transaction', { matchedRate, type, value, converted, receiveType, isSats, to, item: response });
                    } else {
                        SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT)
                    }
                } catch (error) {
                    console.error('Error Send Lightening Strike:', error);
                } finally {
                    setIsSendLoading(false);
                }
            }
        } else if (to.startsWith('bc')) { //bitcoin onchain
            if (amount == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsSendLoading(false);
                return;
            }
            if(!isCheck && isWithdrawal && vaultTab){
                SimpleToast.show("Please verify the destination address", SimpleToast.SHORT)
                setIsSendLoading(false);
                return;
            }
            if(receiveType){
                if (selectedFee == null) {
                    SimpleToast.show('Please select fee rate', SimpleToast.SHORT);
                    setIsSendLoading(false);
                    return;
                }
                const feeForBamskki = (0.1 / 100) * Number(amount);
                // const remainingAmount = Number(amount) - feeForBamskki;
                const remainingAmount = Number(amount);
                console.log('feeForBamskki: ', feeForBamskki)
                console.log('remainingAmount: ', remainingAmount)
                if (remainingAmount <= 0) {
                    SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
                    setIsSendLoading(false);
                    return;
                }

                console.log('selectedFee: ', selectedFee)
                try {
                    const sendResponse = await sendBitcoinPayment(remainingAmount, to, selectedFee, note);

                    let jsonSend = null
                    console.log('sendResponse: ', sendResponse)
                    if (sendResponse?.startsWith('{')) { // as estimatedFee is a string so this condition is helpful
                        jsonSend = JSON.parse(sendResponse);

                        console.log('jsonSend: ', jsonSend)
                        //send 0.1% fee to bamskii
                        // const response = await sendCoinsViaUsername("bamskki@coinos.io", feeForBamskki, '');
                        // console.log('response username: ', response, typeof response)
                        dispatchNavigate('TransactionBroadCast', { matchedRate, type, value, converted, isSats, to, item: jsonSend });

                    } else {
                        SimpleToast.show(sendResponse, SimpleToast.SHORT);
                        return;
                    }
                } catch (error) {
                    console.error('Error Send to bitcoin:', error);
                    SimpleToast.show('Failed to Send to bitcoin. Please try again.', SimpleToast.SHORT);
                } finally {
                    setIsSendLoading(false);
                }
            } else {
                if (selectedStrikeFee == null) {
                    SimpleToast.show('Please select fee rate', SimpleToast.SHORT);
                    setIsSendLoading(false);
                    return;
                }
                try {
                    const payload = {
                        btcAddress: to,
                        sourceCurrency: "USD",
                        amount: {
                            amount: Number(amount),
                            currency: "USD",
                            feePolicy: "EXCLUSIVE"
                        },
                        description: note,
                        onchainTierId: 'tier_fast' + Math.floor(Math.random() * 100)
                    }
                    console.log('payload: ', payload)
                    const response = await getPaymentQouteByOnChain(payload, paymentQuoteData?.paymentQuoteId);
                    if(response?.amount){
                        console.log('responserresponse: ', response)
                        dispatchNavigate('TransactionBroadCast', { matchedRate, type, value, converted, receiveType, isSats, to, item: response });
                    } else if(response?.data?.message) {
                        SimpleToast.show(response?.data?.message, SimpleToast.SHORT)
                    } else {
                        SimpleToast.show('Failed to Send Bitcoin. Please try again.', SimpleToast.SHORT)
                    }
                } catch (error) {
                    console.error('Error Send to bitcoin:', error);
                    SimpleToast.show('Failed to Send to bitcoin. Please try again.', SimpleToast.SHORT);
                } finally {
                    setIsSendLoading(false);
                }
            }

        } else if (to.includes("@")) { //username
            if (amount == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsSendLoading(false);
                return;
            }
            try {
                if(receiveType){
                    const response = await sendCoinsViaUsername(to, Number(amount), note);
                    console.log('response username: ', response, typeof response, amount, to, note)
                    if (typeof response == 'object' && response?.hash) {
                        dispatchNavigate('Transaction', { matchedRate, type, value, converted, isSats, to, item: response });
                    } else if (response?.startsWith('{')) {
                        const jsonResponse = JSON.parse(response);
                        console.log('jsonResponse: ', jsonResponse)
                        dispatchNavigate('Transaction', { matchedRate, type, value, converted, isSats, to, item: jsonResponse });
                    } else {
                        SimpleToast.show(response, SimpleToast.SHORT);
                    }
                } else {
                    try {
                        const payload = {
                            lnAddressOrUrl: to,
                            sourceCurrency: "USD",
                            amount: {
                                amount: String(amount),
                                currency: "USD"
                            },
                            ...(to.includes('blink') ? {} : { description: note })
                        }
                        console.log('payload: ', payload)
                        const response = await getPaymentQouteByLightening(payload, paymentQuoteData?.paymentQuoteId);
                        if(response?.amount){
                            console.log('responserresponse: ', response)
                            dispatchNavigate('Transaction', { matchedRate, type, value, converted, receiveType, isSats, to, item: response });
                        } else {
                            SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT)
                        }
                    } catch (error) {
                        console.error('Error Send Lightening Strike:', error);
                    } finally {
                        setIsSendLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error Send Lightening:', error);
                SimpleToast.show('Failed Send to User. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsSendLoading(false);
            }
        } else { //liquid address
            if (amount == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsSendLoading(false);
                return;
            }
            if (selectedFee == null) {
                SimpleToast.show('Please select fee rate', SimpleToast.SHORT);
                setIsSendLoading(false);
                return;
            }
            const feeForBamskki = (0.1 / 100) * Number(amount);
            // const remainingAmount = Number(amount) - feeForBamskki;
            const remainingAmount = Number(amount);
            console.log('feeForBamskki: ', feeForBamskki)
            console.log('remainingAmount: ', remainingAmount)
            if (remainingAmount <= 0) {
                SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
                setIsSendLoading(false);
                return;
            }

            try {
                const sendResponse: any = await sendBitcoinPayment(remainingAmount, to, selectedFee, note);

                let jsonSend = null
                console.log('sendResponse: ', sendResponse)
                if (sendResponse?.startsWith('{') || (typeof sendResponse == 'object' && sendResponse?.txid)) { // as estimatedFee is a string so this condition is helpful
                    jsonSend = JSON.parse(sendResponse);

                    //send 0.1% fee to bamskii
                    // const response = await sendCoinsViaUsername("bamskki@coinos.io", feeForBamskki, '');
                    // console.log('response username: ', response)
                    dispatchNavigate('TransactionBroadCast', { matchedRate, type, value, converted, isSats, to, item: jsonSend, receiveType });
                } else {
                    SimpleToast.show(sendResponse, SimpleToast.SHORT);
                    return;
                }
            } catch (error) {
                console.error('Error Send to liquid:', error);
                SimpleToast.show('Failed to Send to Liquid. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsSendLoading(false);
            }
        }
    };

    const increaseClickHandler = () => {
        const feeKeys = Object.values(feeNames);
        const currentIndex = feeKeys.indexOf(selectedFeeName !== "Select Fee" ? selectedFeeName : '');
        const fromFeeKeys = Object.keys(recommendedFee);
        if (currentIndex === feeKeys.length - 1) {
            SimpleToast.show('You have reached the end of the fee list.', SimpleToast.SHORT);
            return;
        }
        const newIndex = (currentIndex + 1) % feeKeys.length;
        const newFeeKey = fromFeeKeys[newIndex];
        handleFeeEstimate(newFeeKey)
    };

    const decreaseClickHandler = () => {
        const feeKeys = Object.values(feeNames);
        const currentIndex = feeKeys.indexOf(selectedFeeName !== "Select Fee" ? selectedFeeName : '');
        const fromFeeKeys = Object.keys(recommendedFee);
        if (currentIndex === 0) {
            SimpleToast.show('You have reached the start of the fee list.', SimpleToast.SHORT);
            return;
        }
        const newIndex = (currentIndex - 1 + feeKeys.length) % feeKeys.length;
        const newFeeKey = fromFeeKeys[newIndex];
        handleFeeEstimate(newFeeKey)
    };

    const increaseStrikeClickHandler = () => {
        let selectedFee = {}
        if (!selectedStrikeFee) {
            selectedFee = strikeFees[0];
            setSelectedStrikeFee(selectedFee)
        } else {
            const currentIndex = strikeFees.findIndex(fee => fee.id === selectedStrikeFee.id);
            if (currentIndex < strikeFees.length - 1) {
                selectedFee = strikeFees[currentIndex + 1];
                setSelectedStrikeFee(selectedFee)
            } else {
                SimpleToast.show('You have reached the end of the fee list.', SimpleToast.SHORT);
            }
        }

    };

    const decreaseStrikeClickHandler = () => {
        let selectedFee = {}
        if (!selectedStrikeFee) {
            selectedFee = strikeFees[0];
            setSelectedStrikeFee(selectedFee)
        } else {
            const currentIndex = strikeFees.findIndex(fee => fee.id === selectedStrikeFee.id);
            if (currentIndex > 0) {
                selectedFee = strikeFees[currentIndex - 1];
                setSelectedStrikeFee(selectedFee)
            } else {
                SimpleToast.show('You have reached the start of the fee list.', SimpleToast.SHORT);
            }
        }

    };

    const editAmountClickHandler = () => {
        dispatchNavigate('SendScreen', {
            currency,
            matchedRate,
            walletID: wallet.getID(),
            value,
            converted,
            isSats,
            to,
            type,
            recommendedFee,
            isWithdrawal,
            wallet,
            editAmount: () => {
                setIsEditAmount(true)
            }
        });
    };

    const addressHandler = () => {
        dispatchNavigate('WalletAddresses', {
            walletID: wallet.getID(),
            isTouchable: true,
            value,
            converted,
            isSats,
            to,
            type,
            recommendedFee,
            isWithdrawal,
            wallet
        });
    }

    const handleWithdrawalFee = (fee: number) => {
        const temp = ((Number(fee || 0) / Number(value || 0)) || 0) * 100
        return temp;
    }

    // console.log('strikeFees: ', strikeFees, receiveType)
    return (
        <ScreenLayout showToolbar isBackButton title="Review Payment">
            <View style={styles.topView}>
                {/* {isStartLoading ?
                    <ActivityIndicator style={{ marginTop: 10, marginBottom: 20 }} color={colors.white} />
                    :
                    <GradientCardWithShadow
                        colors_={[colors.gray.dark, colors.gray.dark]}
                        style={styles.linearGradient}
                        disabled
                        linearStyle={styles.height}
                        shadowStyleTop={styles.top}
                        shadowStyleBottom={styles.bottom}>
                        <View style={styles.view}>
                            <Text h2 bold style={styles.check}>
                                Lightning Account
                            </Text>
                            <Image
                                source={CoinOSSmall}
                                style={styles.blink}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.sats}><Text h2>{formatNumber(balance)} sats  ~  </Text><Text h3>${convertedRate.toFixed(2)}</Text></View>
                        <Text bold style={styles.text}>{formatNumber(Number(withdrawThreshold) + Number(reserveAmount))} sats</Text>
                        <View style={{ paddingHorizontal: 25, alignItems: 'center' }}>
                            <View style={styles.showLine} />
                            <View style={[styles.box, { left: `${calculatePercentage(Number(withdrawThreshold), Number(reserveAmount)) + 7}%` }]} />
                            <LinearGradient
                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                                colors={[colors.white, colors.pink.dark]}
                                style={[styles.linearGradient2, { width: `${calculateBalancePercentage(Number(balance), Number(withdrawThreshold), Number(reserveAmount))}%` }]}>
                            </LinearGradient>

                        </View>
                    </GradientCardWithShadow>
                } */}

                <View style={styles.middle}>
                    {balance < withdrawThreshold && isWithdrawal &&
                        <Text style={{ color: colors.yellow2, marginLeft: 15, marginBottom: 25 }}>You haven't reached your withdrawal threshold yet.</Text>
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginRight: 15 }}>
                        <TextViewV2 keytext="Recipient will get: " text={isSats ? `${value} sats ~ $${converted}` : `$${value} ~ $${converted} sats`} textStyle={styles.price} />
                        {isWithdrawal &&
                            <TouchableOpacity activeOpacity={0.7} onPress={editAmountClickHandler} style={{
                                borderWidth: 3,
                                borderColor: colors.white,
                                borderRadius: 17,
                                paddingVertical: 8,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 14, color: isEditAmount ? colors.green : colors.white }}>Edit Amount</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <TextViewV2 keytext="Sent from: " text={receiveType ? "Coinos Lightning Account" : "Strike Lightning Account"} />
                    {isWithdrawal ?
                        <View style={{
                            marginBottom:30,
                            marginStart:15,
                            marginEnd: 10,
                        }}>
                            <Text bold style={{fontSize: 18}}>{"To: "}</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={addressHandler} style={{
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                marginTop: 10, 
                                paddingVertical: 8, 
                                paddingHorizontal: 25, 
                                borderWidth: 2, 
                                borderColor: vaultTab ? colors.blueText : colors.greenShadow, 
                                borderRadius: 15,
                                width: '90%'
                            }}>
                                <Text italic style={StyleSheet.flatten({
                                    flex: 1,
                                    fontSize: 16,
                                    marginTop: 3,
                                    color: vaultTab ? colors.blueText : colors.greenShadow
                                })}>{"Vault Address: "}{!to.includes('@') && to.length > 20 ? shortenAddress(to) : to}</Text>
                                <Image source={Edit} style={styles.editImage} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    :
                        <TextViewV2 keytext="To: " text={!to.includes('@') && to.length > 20 ? shortenAddress(to) : to} />
                    }
                    {/* {isWithdrawal &&
                        <TouchableOpacity onPress={addressHandler}>
                            <Text style={{ marginLeft: 10, fontSize: 18, marginBottom: 20, textDecorationLine: 'underline' }}>Add Address</Text>
                        </TouchableOpacity>
                    } */}
                    {vaultTab && isWithdrawal &&
                        <>
                            <Text style={[{marginHorizontal: 12, fontSize: 14, width: isIOS ? '90%' : '80%', marginTop: -10}]}>⚠️ DO NOT transfer to any of these addresses without verifying their authenticity from your hardware device! </Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsCheck(!isCheck)} style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 25, marginHorizontal: 12 , alignSelf: 'flex-start' }}>
                                <View style={styles.checkView}>
                                    {isCheck && <Image source={Check} style={styles.checkImage} resizeMode='contain' /> }
                                </View>
                                <Text style={{color: colors.white, marginLeft: 10, fontSize: 16}} italic>I verified this address</Text>
                            </TouchableOpacity>
                        </>
                    }

                    {to && value && (type === 'bitcoin' || type === 'liquid') && recommendedFee ?
                        <>
                            {receiveType ?
                                <View style={styles.feesView}>
                                    <TextViewV2 keytext="Network Fee:  " text={` ~   ${estimatedFee} sats`} />
                                    <GradientCard disabled
                                        colors_={['#FFFFFF', '#B6B6B6']}
                                        style={styles.linearGradientStroke} linearStyle={styles.linearGradient3}>
                                        <View style={styles.background}>
                                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                <Text bold style={{ fontSize: 16 }}>{selectedFeeName}</Text>
                                            </TouchableOpacity>
                                            <View style={{ paddingVertical: 5 }}>
                                                <TouchableOpacity style={{ opacity: feeLoading ? 0.5 : 1 }} onPress={increaseClickHandler} disabled={feeLoading}>
                                                    <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ opacity: feeLoading ? 0.5 : 1 }} onPress={decreaseClickHandler} disabled={feeLoading}>
                                                    <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </GradientCard>
                                </View>
                            :
                                <View style={styles.feesView}>
                                    <TextViewV2 keytext="Network Fee:  " text={` ~   ${(Number(selectedStrikeFee?.estimatedFee?.amount || 0) * 100000000).toFixed(2)} sats`} />
                                    <GradientCard disabled
                                        colors_={['#FFFFFF', '#B6B6B6']}
                                        style={styles.linearGradientStroke} linearStyle={styles.linearGradient3}>
                                        <View style={styles.background}>
                                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                <Text bold style={{ fontSize: 16 }}>{selectedStrikeFee ? selectedStrikeFee.label : selectedFeeName}</Text>
                                            </TouchableOpacity>
                                            <View style={{ paddingVertical: 5 }}>
                                                <TouchableOpacity style={{ opacity: feeLoading ? 0.5 : 1 }} onPress={increaseStrikeClickHandler} disabled={feeLoading}>
                                                    <Icon name="angle-up" type="font-awesome" color="#FFFFFF" />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ opacity: feeLoading ? 0.5 : 1 }} onPress={decreaseStrikeClickHandler} disabled={feeLoading}>
                                                    <Icon name="angle-down" type="font-awesome" color="#FFFFFF" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </GradientCard>
                                </View>
                            }
                            {/* <TextViewV2 keytext="Coinos Fee + Service Fee:  " text={` ~   ${(networkFee || 0) + (bamskiiFee || 0)} sats`} /> */}
                            {receiveType && <TextViewV2 keytext="Coinos Fee:  " text={` ~   ${(networkFee || 0)} sats`} /> }
                            <TextViewV2 keytext="Total Fee:  " text={isWithdrawal ? ` ~   ${(networkFee || 0) + (estimatedFee || 0)} sats (~${handleWithdrawalFee((networkFee || 0) + (estimatedFee || 0)).toFixed(0)}%)` : ` ~   ${receiveType ? (networkFee || 0) + (estimatedFee || 0) : paymentQuoteData ? usdToSats(paymentQuoteData?.totalFee?.amount || 0, (matchedRate || 0)) : 0} sats ${receiveType ? `(~0.2%)` : ``}`} />
                        </>
                        :
                        <TextView keytext="Fees:  " text={` ~   ${receiveType ? estimatedFee : paymentQuoteData ? usdToSats(paymentQuoteData?.totalFee?.amount || 0, (matchedRate || 0)) : 0} sats`} />
                    }
                </View>

                <ReactNativeModal isVisible={isModalVisible}>
                    <View>
                        <GradientCard disabled
                            style={[styles.modal, !receiveType ? {height: 150} : {}]} linearStyle={{...styles.linearGradient4, ...{height: receiveType ? 200 : 150}}}>
                                {receiveType ?
                                    <ScrollView style={styles.background2}>
                                        {Object.entries(recommendedFee).map(([feeKey, feeValue], index) => (
                                            feeKey !== 'minimumFee' && (
                                                <TouchableOpacity style={[styles.row, index % 2 == 0 && { backgroundColor: colors.primary }]}
                                                    onPress={() => handleFeeSelect(feeKey as Fee)}>
                                                    <Text bold style={{ fontSize: 18 }}>{feeNames[feeKey as Fee]}</Text>
                                                </TouchableOpacity>
                                            )
                                        ))}
                                    </ScrollView>
                                :
                                    <ScrollView style={styles.background2}>
                                        {strikeFees && strikeFees.map((item, index) => (
                                            <TouchableOpacity style={[styles.row, index % 2 == 0 && { backgroundColor: colors.primary }]}
                                                onPress={() => handleStrikeFeeSelect(item)}>
                                                <Text bold style={{ fontSize: 18 }}>{item.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>

                                }
                        </GradientCard>
                    </View>
                </ReactNativeModal>
                {!receiveType && !to.includes('blink') &&
                    <GradientCard
                        style={styles.main}
                        linearStyle={styles.heigth}
                        colors_={note ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input
                            onChange={setNote}
                            value={note}
                            textInputStyle={styles.heigth2}
                            label="Add note"
                        />
                    </GradientCard>
                }
            </View>
            <View style={styles.container}>
                <Text bold style={styles.alert}>Causion: Bitcoin payments are irriversable</Text>
                {type === 'bitcoin' ?
                    <SwipeButton ref={swipeButtonRef} onToggle={handleToggle} isLoading={isSendLoading} />
                    :
                    <GradientButton style={styles.invoiceButton} textStyle={{ fontFamily: 'Lato-Medium', }}
                        title={'Send'}
                        disabled={isSendLoading}
                        onPress={handleSendSats}

                    />
                }
                {/* <SwipeButton ref={swipeButtonRef} onToggle={handleToggle} isLoading={isSendLoading} /> */}
                {/* <GradientButton style={styles.invoiceButton} textStyle={{ fontFamily: 'Lato-Medium', }} title="Send" onPress={sendClickHandler} /> */}
            </View>
        </ScreenLayout>
    )
}