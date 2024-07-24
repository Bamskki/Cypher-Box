import React, { useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements';

import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { SavingVault, SwipeButton } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";

interface Props {
    route: any;
}

export default function ConfirmTransction({ route }: Props) {
    const { data } = route?.params;

    const [usd, setUSD] = useState('40');
    const [sats, setSats] = useState('100K sats  ~$' + usd);
    const [address, setAddress] = useState('bc1...34f');
    const [networkFees, setNetworkFees] = useState(5000);
    const [serviceFees, setServiceFees] = useState('~ 400 sats');
    const [totalFees, setTotalFees] = useState('~ 5400 sats (~0.2%)');
    const [note, setNote] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [visibleSelection, setVisibleSelection] = useState(false);
    const [selectedFees, setSelectedFees] = useState(1);
    // const [feeSats, setFeeSats] = useState(5000);
    const [feeUSD, setFeeUSD] = useState(1);
    const [feesEditable, setFeesEditable] = useState(false);
    const [satsEditable, setSatsEditable] = useState(false);
    const swipeButtonRef = useRef(null);
    const [isSendLoading, setIsSendLoading] = useState<boolean>(false);

    const nextClickHandler = () => {

    }

    const editAmountClickHandler = () => {
        dispatchNavigate('EditAmount', {
            sats: sats,
            usd: usd,
            setSats: setSats_
        });
    }

    const editFeesClickHandler = () => {
        setVisibleSelection(true);
    }

    const setSats_ = (sats: any, usd: any) => {
        setUSD(usd);
        const value = Number(sats) / 10000;
        setSats(value + 'K sats ~$' + usd);
        setSatsEditable(true);
    }

    const setNetFee_ = (sats: any, usd: any) => {
        setFeeUSD(usd);
        setNetworkFees(sats);
        setFeesEditable(true);
    }

    const selectFeesClickHandler = (index: number) => {
        console.log("🚀 ~ selectFeesClickHandler ~ index:", index);
        setVisibleSelection(false);
        setSelectedFees(index);
        setFeesEditable(true);
        if (index === 3) {
            dispatchNavigate('FeeRate', {
                networkFees: networkFees,
                feeUSD: feeUSD,
                setNetFee_: setNetFee_
            });
        }
    }

    const getFeesText = () => {
        let feesText = 'Medium';
        switch (selectedFees) {
            case 0:
                feesText = 'Fast';
                break;
            case 1:
                feesText = 'Medium';
                break;
            case 2:
                feesText = 'Show';
                break;
            case 3:
                feesText = 'Customize';
                break;
            default:
                break;
        }
        return feesText;
    }

    const handleToggle = (val: any) => {
        console.log("🚀 ~ handleToggle ~ value:", val)
        if (val) {
            // handleSendSats();
            dispatchNavigate('TransactionBroadCastNew');
        }
    }

    return (
        <ScreenLayout showToolbar disableScroll>
            <View style={styles.container}>
                <Text style={styles.title} center>Confirm transaction</Text>
                <SavingVault
                    container={styles.savingVault}
                    innerContainer={styles.savingVault}
                    shadowTopBottom={styles.savingVault}
                    shadowBottomBottom={styles.savingVault}
                    bitcoinText={styles.bitcoinText}
                    imageStyle={styles.bitcoinImage}
                    titleStyle={styles.titleVault}
                    title="Hot Savings"
                    bitcoinValue='0.1 BTC ~ $6500'
                // onPress={savingVaultClickHandler}
                />
                <View style={styles.recipientView}>
                    <Text bold style={styles.coinselected}>Coins selected: 3 coins</Text>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Recipient will get:</Text>
                            <Text bold style={styles.value}>{sats}</Text>
                        </View>
                        <TouchableOpacity style={styles.editAmount} onPress={editAmountClickHandler}>
                            <Text>Edit amount</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Sent from:</Text>
                            <Text style={styles.fees}>Vault address: {address}</Text>
                        </View>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>To:</Text>
                            <Text style={StyleSheet.flatten([styles.fees, { color: colors.green }])}>Bitcoin Address: {address}</Text>
                        </View>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Network fee:</Text>
                            <Text style={StyleSheet.flatten(styles.fees)}>~ {networkFees} sats</Text>
                        </View>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Service fee:</Text>
                            <Text style={styles.fees}>{serviceFees}</Text>
                        </View>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Total fee:</Text>
                            <Text style={styles.fees}>{totalFees}</Text>
                        </View>
                    </View>
                    <Text h4>Note: {data?.note}</Text>
                </View>
                <Text h4 center>Causion: Bitcoin payments are irriversable</Text>
                <View style={styles.swipeview}>
                    <SwipeButton ref={swipeButtonRef} onToggle={handleToggle} isLoading={isSendLoading} />
                </View>
            </View>
        </ScreenLayout>
    )
}
