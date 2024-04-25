import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import SimpleToast from "react-native-simple-toast";

import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { Current } from "@Cypher/assets/images";
import { GradientButton, GradientCard, GradientCardWithShadow, GradientText } from "@Cypher/components";
import { colors, shadow } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";
import { getMe, sendCoinsViaUsername, sendInternalPayment, sendLightningPayment, testAPI } from "../../../api/coinOSApis";
import { btc, matchKeyAndValue } from "../HomeScreen";
import { InputEmailPhone } from "../Components";

function startsWithLn(str: string) {
    // Check if the string starts with "ln"
    return str.startsWith("ln");
}

export default function SendScreen({navigation, route}: any) {
    const info = route?.params
    const [sats, setSats] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [inusd, setInUsd] = useState('0.00');
    const [fontSize, setFontSize] = useState(45);
    const [convertedRate, setConvertedRate] = useState(0.00);
    const [isLoading, setIsLoading] = useState(false);

    console.log('info: ', info)

    const handleSendLightening = async () => {
        setIsLoading(true);
        if(address == '') {
            SimpleToast.show('Please enter an address or username', SimpleToast.SHORT);
            setIsLoading(false);
            return;
        } else if(startsWithLn(address)){
            try {
                const response = await sendLightningPayment(address);
                console.log('response: ', response)
                SimpleToast.show(response, SimpleToast.SHORT)
                dispatchNavigate('SendReceiveSuccessScreen', {
                    isReceive: false,
                    value: address,
                    type: 'lightening',
                    valueUsd: convertedRate,
                    currency: info.currency
                });
        
            } catch (error) {
                console.error('Error Send Lightening:', error);
                SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsLoading(false);
            }
        } else {
            if(sats == '') {
                SimpleToast.show('Please enter an amount', SimpleToast.SHORT);
                setIsLoading(false);
                return;
            }
            try {
                const response = await sendCoinsViaUsername(address, sats);
                console.log('response username: ', response)
                if(response){
                    dispatchNavigate('SendReceiveSuccessScreen', {
                        isReceive: false,
                        value: sats,
                        type: 'username',
                        valueUsd: convertedRate,
                        currency: info.currency
                    })    
                }
        
            } catch (error) {
                console.error('Error Send Lightening:', error);
                SimpleToast.show('Failed to Send Lightening. Please try again.', SimpleToast.SHORT);
            } finally {
                setIsLoading(false);
            }
        }
        
    };

    const sendClickHandler = () => {
        dispatchNavigate('SendReceiveSuccessScreen', {
            isReceive: false,
            value: sats,
            valueUsd: convertedRate,
            currency: info.currency
        })
    }

    useEffect(() => {
        if (sats) {
            let sats_ = Number(sats);
            setInUsd((sats_ * 0.000169).toLocaleString('en', { maximumFractionDigits: 10 }));
            if (sats?.length > 7) {
                setFontSize(25);
            } else if (sats?.length > 4) {
                setFontSize(35);
            } else {
                setFontSize(45);
            }
        } else {
            setFontSize(45);
            setInUsd('0.00');
        }
    }, [sats]);


    console.log('startsWithLn: ', startsWithLn(address))
    return (
        <ScreenLayout showToolbar isBackButton title="Send Bitcoin">
            <View style={styles.priceView}>
            <InputEmailPhone label={`Send`} placeholder={"Enter Address or Username"} setText={setAddress} text={address} style={{ marginTop: 10 }} />
                {!startsWithLn(address) && 
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 50}}>
                        <Text h3 style={styles.text}>Amount</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginStart: 50 }}>
                            <TextInput
                                placeholder="0"
                                placeholderTextColor={colors.white}
                                style={[styles.amount, { fontSize: fontSize }]}
                                value={sats}
                                maxLength={10}
                                keyboardType="numeric"
                                returnKeyType="done"
                                onChangeText={(e) => {
                                    setSats(e); 
                                    const currency = btc(1);
                                    setConvertedRate(e * info.matchedRate * currency)
                                }}
                            />
                            <Text style={StyleSheet.flatten([styles.placeholder, { fontSize: fontSize }])}>sats</Text>
                        </View> 
                    </View>
                }
            </View>
            {!startsWithLn(address) &&      
                <>
                    <Text subHeader style={styles.inDollar}>{`$${convertedRate.toFixed(2)}`}</Text>
                    <GradientCardWithShadow style={styles.mainview} linearStyle={styles.main} shadowStyleTop={styles.main} shadowStyleBottom={styles.main}>
                        <View style={styles.middleView}>
                            <Text bold h3 style={styles.sats}>30,000 sats</Text>
                            <Text bold h3 style={styles.sats}>From Coinos Account</Text>
                        </View>
                        <View style={styles.middlebView}>
                            <View style={styles.border}>
                            <View style={styles.borderView}>
                                <GradientText h3 style={{fontSize:10, ...shadow.text25}}>Send through Lightning address or paste invoice</GradientText>
                            </View>
                            </View>
                            <Image source={require('../../../img/scan-new.png')} style={styles.image} resizeMode="contain" />
                        </View>
                    </GradientCardWithShadow>
                </>
            }
            <View style={styles.sendView}>
                <Image source={Current} style={styles.current} />
                <GradientButton title="Send" disabled={isLoading || (!startsWithLn(address) ? (sats?.length == 0 && address?.length == 0) : address?.length == 0)} onPress={handleSendLightening} isShadow isTextShadow />
            </View>
        </ScreenLayout>
    )
}