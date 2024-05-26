import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import SimpleToast from "react-native-simple-toast";

import styles from "./styles";
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { CustomKeyboard, GradientCard, GradientInput } from "@Cypher/components";
import { colors, } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";
import { bitcoinRecommendedFee, bitcoinSendFee, sendBitcoinPayment, sendCoinsViaUsername, sendLightningPayment } from "../../api/coinOSApis";

export function startsWithLn(str: string) {
    // Check if the string starts with "ln"
    return str.startsWith("ln");
}

export default function SendScreen({navigation, route}: any) {
    const info = route.params;
    const [isSats, setIsSats] = useState(true);
    const [sats, setSats] = useState('');
    const [usd, setUSD] = useState('');
    const [sender, setSender] = useState('');
    const senderRef = useRef<TextInput>(null);

    const [convertedRate, setConvertedRate] = useState(0.00);
    const [isLoading, setIsLoading] = useState(false);
    const [recommendedFee, setRecommendedFee] = useState<any>();
    const [selectedFee, setSelectedFee] = useState<number | null>(null);
  
    console.log('info: ', info)

    useEffect(() => {
        if(!sender.startsWith('ln') && !sender.includes('@') && !recommendedFee){
            const init = async () => { 
                const res = await bitcoinRecommendedFee();
                setRecommendedFee(res);
                console.log('recommendedFee: ', res)
            }
            init();
        }
    }, [sender])

    console.log('recommendedFee: ', recommendedFee)
    const handleSendNext = async () => {
        setIsLoading(true);
        const amount = isSats ? sats : usd;
        if(sender == '') {
            SimpleToast.show('Please enter an address or username', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } else if(startsWithLn(sender)){ //lightening invoice
            try {
                dispatchNavigate('ReviewPayment', {
                    value: sats,
                    converted: usd,
                    isSats: isSats,
                    to: sender,
                    fees: 0,
                    type: 'lightening',
                    matchedRate: info?.matchedRate,
                    currency: info?.curreny,
                    recommendedFee
                });
        
            } catch (error) {
                console.error('Error Send Lightening:', error);
                SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsLoading(false);
            }
        } else if(sender.startsWith('bc')){ //bitcoin onchain
            if(sats == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsLoading(false);
                return;
            }
            // if(selectedFee == null){
            //     SimpleToast.show('Please select fee rate', SimpleToast.SHORT);
            //     setIsLoading(false);
            //     return;
            // }
            const feeForBamskki = (0.1 / 100) * Number(amount);
            const remainingAmount = Number(amount) - feeForBamskki;
            console.log('feeForBamskki: ', feeForBamskki)
            console.log('remainingAmount: ', remainingAmount)
            if (remainingAmount <= 0) {
                SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
                setIsLoading(false);
                return;
            }

            try {
                dispatchNavigate('ReviewPayment', {
                    value: sats,
                    converted: usd,
                    isSats: isSats,
                    to: sender,
                    fees: 0,
                    matchedRate: info?.matchedRate,
                    currency: info?.curreny,    
                    type: 'bitcoin',
                    feeForBamskki,
                    recommendedFee
                });
            } catch(error) {
                console.error('Error Send to bitcoin:', error);
                SimpleToast.show('Failed to Send to bitcoin. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsLoading(false);
            }
        } else if(sender.includes("@")) { //username
            if(sats == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsLoading(false);
                return;
            }
            try {
                dispatchNavigate('ReviewPayment', {
                    value: sats,
                    converted: usd,
                    isSats: isSats,
                    to: sender,
                    fees: 0,
                    type: 'username',
                    matchedRate: info?.matchedRate,
                    currency: info?.curreny,
                    recommendedFee
                });
            } catch (error) {
                console.error('Error Send Lightening:', error);
                SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsLoading(false);
            }
        } else { //liquid address
            if(sats == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsLoading(false);
                return;
            }
            // if(selectedFee == null){
            //     SimpleToast.show('Please select fee rate', SimpleToast.SHORT);
            //     setIsLoading(false);
            //     return;
            // }
            const feeForBamskki = (0.1 / 100) * Number(amount);
            const remainingAmount = Number(amount) - feeForBamskki;
            console.log('feeForBamskki: ', feeForBamskki)
            console.log('remainingAmount: ', remainingAmount)
            if (remainingAmount <= 0) {
                SimpleToast.show("You don't have enough balance", SimpleToast.SHORT);
                setIsLoading(false);
                return;
            }

            try {
                dispatchNavigate('ReviewPayment', {
                    value: sats,
                    converted: usd,
                    isSats: isSats,
                    to: sender,
                    fees: 0,
                    matchedRate: info?.matchedRate,
                    currency: info?.curreny,    
                    type: 'liquid',
                    feeForBamskki,
                    recommendedFee
                });
            } catch(error) {
                console.error('Error Send to liquid:', error);
                SimpleToast.show('Failed to Send to Liquid. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsLoading(false);
            }
        }  
    };

    const handleFeeSelect = (fee: number) => {
        setSelectedFee(fee);
        // Now you can send the selected fee to the API or perform any other action.
    };

    const nextClickHandler = () => {
        dispatchNavigate('ReviewPayment', {
            value: sats,
            converted: usd,
            isSats: isSats,
            to: sender
        })
    }

    console.log('info: ', info)
    return (
        <ScreenLayout disableScroll showToolbar isBackButton title="Send Bitcoin">
            <ScrollView style={styles.container}>
                {/* {!startsWithLn(sender) &&  */}
                    <GradientInput isSats={isSats} sats={sats} setSats={setSats} usd={usd} />
                {/* } */}
                <Text h2 style={styles.destination}>Destination</Text>

                <View style={styles.priceView}>
                    {sender?.length == 0 &&
                        <Text h4 center onPress={() => senderRef?.current?.focus()} style={StyleSheet.flatten([styles.label])}>Paste any address or invoice{'\n'} (Bitcoin, Lightning, Liquid)</Text>
                    }
                    <GradientCard
                        style={styles.main}
                        linearStyle={styles.heigth}
                        colors_={sender ? [colors.pink.extralight, colors.pink.default] : [colors.gray.thin, colors.gray.thin2]}>
                        <Input
                            ref={senderRef}
                            onChange={setSender}
                            value={sender}
                            textInpuetStyle={styles.senderText}
                        />
                    </GradientCard>
                    <Image source={require('../../../img/scan-new.png')} style={styles.qrimage} />
                </View>
            </ScrollView>
            <CustomKeyboard
                title="Next"
                onPress={handleSendNext}
                disabled={isLoading || ((!startsWithLn(sender)) ? (sats?.length == 0 && sender?.length == 0) : sender?.length == 0)} 
                setSATS={setSats}
                setUSD={setUSD}
                setIsSATS={setIsSats}
                matchedRate={info?.matchedRate}
                currency={info?.currency}
            />
        </ScreenLayout>
    )
}