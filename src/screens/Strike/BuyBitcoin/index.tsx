import React, { useEffect, useRef, useState } from "react";
import { Clipboard, Image, PermissionsAndroid, Platform, TextInput, View } from "react-native";
import { RNCamera } from 'react-native-camera';
import { PERMISSIONS, request } from "react-native-permissions";
import QRCodeScanner from 'react-native-qrcode-scanner';
import SimpleToast from "react-native-simple-toast";

import { P2, StrikeFull } from "@Cypher/assets/images";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { BlackBGView, CustomKeyboard } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";
import { btc } from "@Cypher/helpers/coinosHelper";
import LinearGradient from "react-native-linear-gradient";
import { bitcoinRecommendedFee, getInvoiceByLightening } from "../../../api/coinOSApis";
import styles from "./styles";


export function startsWithLn(str: string) {
    return str.startsWith("ln");
}

export default function BuyBitcoin({ navigation, route }: any) {
    const info = route.params;
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');
    const [satsValue, setSatsValue] = useState('0');
    const [sender, setSender] = useState(info?.to || info?.destination || '');
    const senderRef = useRef<TextInput>(null);

    const [convertedRate, setConvertedRate] = useState(0.00);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedFee, setRecommendedFee] = useState<any>();
    const [selectedFee, setSelectedFee] = useState<number | null>(null);
    const [isScannerActive, setIsScannerActive] = useState(false);
    const [addressFocused, setAddressFocused] = useState(false);
    const [isPaste, setIsPaste] = useState(info?.destination && info?.destination?.startsWith('ln') ? true : false)

    useEffect(() => {
        if (info?.isWithdrawal) {
            setSats(String(info?.value))
            setUSD(info?.converted)
        }
    }, [info?.isWithdrawal])

    useEffect(() => {
        if (info?.fiatAmount) {
            let sats = Number(info?.fiatAmount / info?.matchedRate * 100000000)
            setUSD(String(info?.fiatAmount))
            setSats(String(sats))
        }
    }, [info])

    useEffect(() => {
        if (!sender.startsWith('ln') && !sender.includes('@') && !recommendedFee) {
            const init = async () => {
                const res = await bitcoinRecommendedFee();
                setRecommendedFee(res);
                console.log('recommendedFee: ', res)
            }
            init();
        } else if (sender.startsWith('ln') && isPaste) {
            if (info.destination) {
                setTimeout(() => handleLighteningInvoice(), 500)
            }
            // handleLighteningInvoice()
        }
    }, [sender, isPaste, info?.destination])

    async function requestCameraPermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'We need access to your camera to scan QR codes',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } else {
            const res = await request(PERMISSIONS.IOS.CAMERA);
            console.log('Camera permission:', res);
        }
    }

    const handlePaste = async () => {
        const clipboardContent = await Clipboard.getString();
        setSender(clipboardContent);
        setIsPaste(true)
        SimpleToast.show('Pasted from clipboard', SimpleToast.SHORT);
    };

    // useEffect(() => {
    //     requestCameraPermission();
    // }, []);

    const handleLighteningInvoice = async () => {
        setIsLoading(true);
        try {
            const response = await getInvoiceByLightening(sender);
            console.log('response getInvoiceByLightening: ', response)
            const dollarAmount = (response.amount_msat / 1000) * info?.matchedRate * btc(1);
            console.log('dollarAmount: ', dollarAmount)
            if (dollarAmount) {
                dispatchNavigate('ReviewPayment', {
                    ...info,
                    value: response.amount_msat / 1000,
                    converted: dollarAmount,
                    isSats: isSats,
                    to: info?.isWithdrawal ? info?.to : sender,
                    fees: 0,
                    type: 'lightening',
                    description: response?.description,
                    matchedRate: info?.matchedRate,
                    currency: info?.curreny,
                    recommendedFee: recommendedFee || 0
                });
            }
        } catch (error) {
            console.error('Error handleLighteningInvoice:', error);
            SimpleToast.show('Failed to generate lightening. Please try again.', SimpleToast.SHORT);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSendNext = async () => {
        console.log('clicked')
        dispatchNavigate('InvoiceNew', {
                    item: {},
                    matchedRate : 1,
                    receiveType: 'text'
                });
        // setIsLoading(true);
        // const amount = info?.receiveType ? isSats ? usd : sats : isSats ? sats : usd;
        // if (sender == '' && (!info?.to || info?.to == '')) {
        //     SimpleToast.show('Please enter an address or username', SimpleToast.SHORT);
        //     setIsLoading(false);
        //     return;
        // } else if (startsWithLn(sender)) { //lightening invoice
        //     try {
        //         dispatchNavigate('ReviewPayment', {
        //             ...info,
        //             value: sats,
        //             converted: usd,
        //             isSats: isSats,
        //             to: info?.isWithdrawal ? info?.to : sender,
        //             fees: 0,
        //             type: 'lightening',
        //             matchedRate: info?.matchedRate,
        //             currency: info?.curreny,
        //             recommendedFee,
        //             receiveType: info?.receiveType
        //         });

        //     } catch (error) {
        //         console.error('Error Send Lightening:', error);
        //         SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // } else if (sender.startsWith('bc')) { //bitcoin onchain
        //     if (sats == '') {
        //         SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
        //         setIsLoading(false);
        //         return;
        //     }

        //     const feeForBamskki = info?.receiveType ? (0.1 / 100) * Number(amount) : 0;
        //     const remainingAmount = Number(amount) - feeForBamskki;
        //     console.log('feeForBamskki: ', feeForBamskki)
        //     console.log('remainingAmount: ', remainingAmount)
        //     if (remainingAmount <= 0) {
        //         SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
        //         setIsLoading(false);
        //         return;
        //     }

        //     try {
        //         if (info && info?.editAmount) {
        //             info?.editAmount()
        //         }
        //         dispatchNavigate('ReviewPayment', {
        //             ...info,
        //             value: sats,
        //             converted: usd,
        //             isSats: isSats,
        //             to: info?.isWithdrawal ? info?.to : sender,
        //             fees: 0,
        //             matchedRate: info?.matchedRate,
        //             currency: info?.curreny,
        //             type: 'bitcoin',
        //             feeForBamskki,
        //             recommendedFee,
        //             receiveType: info?.receiveType
        //         });
        //     } catch (error) {
        //         console.error('Error Send to bitcoin:', error);
        //         SimpleToast.show('Failed to Send to bitcoin. Please try again.', SimpleToast.SHORT);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // } else if (sender.includes("@")) { //username
        //     if (sats == '') {
        //         SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
        //         setIsLoading(false);
        //         return;
        //     }
        //     try {
        //         dispatchNavigate('ReviewPayment', {
        //             ...info,
        //             value: sats,
        //             converted: usd,
        //             isSats: isSats,
        //             to: info?.isWithdrawal ? info?.to : sender,
        //             fees: 0,
        //             type: 'username',
        //             matchedRate: info?.matchedRate,
        //             currency: info?.curreny,
        //             recommendedFee,
        //             receiveType: info?.receiveType
        //         });
        //     } catch (error) {
        //         console.error('Error Send Lightening:', error);
        //         SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // } else { //liquid address
        //     if (sats == '') {
        //         SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
        //         setIsLoading(false);
        //         return;
        //     }
        //     const feeForBamskki = (0.1 / 100) * Number(amount);
        //     const remainingAmount = Number(amount) - feeForBamskki;
        //     console.log('feeForBamskki: ', feeForBamskki)
        //     console.log('remainingAmount: ', remainingAmount)
        //     if (remainingAmount <= 0) {
        //         SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
        //         setIsLoading(false);
        //         return;
        //     }

        //     try {
        //         dispatchNavigate('ReviewPayment', {
        //             ...info,
        //             value: sats,
        //             converted: usd,
        //             isSats: isSats,
        //             to: info?.isWithdrawal ? info?.to : sender,
        //             fees: 0,
        //             matchedRate: info?.matchedRate,
        //             currency: info?.curreny,
        //             type: 'liquid',
        //             feeForBamskki,
        //             recommendedFee,
        //             receiveType: info?.receiveType
        //         });
        //     } catch (error) {
        //         console.error('Error Send to liquid:', error);
        //         SimpleToast.show('Failed to Send to Liquid. Please try again.', SimpleToast.SHORT);
        //     } finally {
        //         setIsLoading(false);
        //     }
        // }
    };

    const handleFeeSelect = (fee: number) => {
        setSelectedFee(fee);
    };

    const nextClickHandler = () => {
        dispatchNavigate('ReviewPayment', {
            value: sats,
            converted: usd,
            isSats: isSats,
            to: sender
        })
    }

    const handleScan = (e: any) => {
        setSender(e.data);
        setIsPaste(true);
        setIsScannerActive(false); // Close scanner after successful scan
    };

    console.log('sender: ', sender, info)
    return (
        <>
            {isScannerActive ? (
                <ScreenLayout disableScroll showToolbar isBackButton onBackPress={() => setIsScannerActive(false)} title="Scan QR Code">
                    <View style={styles.scannerContainer}>
                        <QRCodeScanner
                            onRead={handleScan}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                        // topContent={<Text style={styles.centerText}>Scan the QR code</Text>}
                        // bottomContent={
                        //     <View style={styles.scannerFooter}>
                        //         <Button title="Cancel" onPress={() => setIsScannerActive(false)} />
                        //     </View>
                        // }
                        />
                    </View>
                </ScreenLayout>
            )
                :
                (
                    <ScreenLayout keyboardAware showToolbar isBackButton title={info?.isWithdrawal ? "Edit Amount" : "Buy Bitcoin"}>
                        <View style={styles.container}>
                            <View>
                                <BlackBGView linearFirstStyle={styles.fiatBalanceBox2}
                                    linearSecondStyle={styles.fiatBalanceBox3}>
                                    <Input placeholder="0" value={sats} onChange={setSats} style={{ marginTop: 0 }} textInputStyle={{ backgroundColor: 'transparent', fontSize: 32, fontFamily: 'Lato-Bold' }} />
                                    <Text semibold style={{ fontSize: 24, lineHeight: 32, marginVertical: 5 }}>$0</Text>
                                    <Image source={P2} resizeMode='contain' style={styles.progressBarImage} />
                                </BlackBGView>
                                <Text style={styles.btc}>BTC</Text>
                            </View>
                            <Image source={StrikeFull} style={styles.image} resizeMode="contain" />
                            <LinearGradient style={styles.maxBtc}
                                colors={['#2A2A2A', '#1E1E1E']}
                                >
                                <Text>Max: $3000</Text>
                            </LinearGradient>
                        </View>
                        <CustomKeyboard
                            title="Next"
                            prevSats={info?.value ? String(info?.value) : false}
                            onPress={handleSendNext}
                            disabled={isLoading || ((!startsWithLn(sender)) ? (sats?.length == 0 && sender?.length == 0) : sender?.length == 0)}
                            setSATS={setSats}
                            setUSD={setUSD}
                            setIsSATS={setIsSats}
                            matchedRate={info?.matchedRate}
                            currency={info?.currency}
                            colors_={['#EBEDF0', '#EBEDF0']}
                            isGradient={false}
                        />
                    </ScreenLayout >
                )
            }
        </>
    );
}