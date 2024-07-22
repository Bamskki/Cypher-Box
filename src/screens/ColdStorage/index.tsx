import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements';

import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { SavingVault } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";
import Clipboard from '@react-native-clipboard/clipboard'

interface Props {
    route: any;
}

export default function ColdStorage({ route }: Props) {
    const [usd, setUSD] = useState('40');
    const [sats, setSats] = useState('100K sats  ~$' + usd);
    const [address, setAddress] = useState('bc1...34f');
    const [networkFees, setNetworkFees] = useState(5000);
    const [serviceFees, setServiceFees] = useState('~ 400 sats');
    const [totalFees, setTotalFees] = useState('~ 5400 sats (~0.2%)');
    const [note, setNote] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    // style = { styles.pasteAddress }
    const [visibleSelection, setVisibleSelection] = useState(false);
    const [selectedFees, setSelectedFees] = useState(1);
    // const [feeSats, setFeeSats] = useState(5000);
    const [feeUSD, setFeeUSD] = useState(1);
    const [feesEditable, setFeesEditable] = useState(false);
    const [satsEditable, setSatsEditable] = useState(false);

    const nextClickHandler = () => {
        let data = {
            sats: sats,
            sentFrom: address,
            destinationAddress: destinationAddress,
            networkFees: networkFees,
            serviceFees: serviceFees,
            totalFees: totalFees,
            note: note,
        }
        dispatchNavigate('ConfirmTransction', {
            data: data,
        });
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

    const coinThresholdClickHandler = () => { }

    const pasteClickHandler = async () => {
        const text = await Clipboard.getString();
        console.log("🚀 ~ pasteClickHandler ~ text:", text)
        setDestinationAddress(text);
    }
    return (
        <ScreenLayout showToolbar disableScroll>
            <View style={styles.container}>
                <Text style={styles.title} center>Construct transaction</Text>
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
                    {/* <TouchableOpacity onPress={coinThresholdClickHandler}> */}
                    <Text bold style={styles.coinselected}>Coins selected: 3 coins</Text>
                    {/* </TouchableOpacity> */}
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Recipient will get:</Text>
                            <Text bold style={styles.value}>{sats}</Text>
                        </View>
                        <TouchableOpacity style={[styles.editAmount, { borderColor: satsEditable ? colors.green : '#B6B6B6' }]} onPress={editAmountClickHandler}>
                            <Text>Edit amount</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Sent from:</Text>
                            <Text style={styles.fees}>Vault address: {address}</Text>
                        </View>
                    </View>
                    <View style={styles.pasteview}>
                        <TouchableOpacity style={[styles.button, { borderColor: destinationAddress?.length > 0 ? colors.green : '#B6B6B6' }]} onPress={pasteClickHandler}>
                            {destinationAddress ?
                                <Text h3 bold>{destinationAddress}</Text>
                                :
                                <Text bold>Paste destination address</Text>
                            }
                        </TouchableOpacity>
                        <Image source={require("../../../img/scan-new.png")} style={styles.qrcode} resizeMode="contain" />
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Network fee:</Text>
                            <Text bold style={styles.fees}>~ {networkFees} sats</Text>
                        </View>
                        {visibleSelection &&
                            <View style={styles.feesDropDown}>
                                <TouchableOpacity style={styles.first} onPress={() => selectFeesClickHandler(0)}>
                                    <Text bold style={selectedFees === 0 ? StyleSheet.flatten([styles.border, { paddingHorizontal: 12.5 }]) : {}}>Fast (40 sat/vb)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.second} onPress={() => selectFeesClickHandler(1)}>
                                    <Text bold style={selectedFees === 1 ? styles.border : {}}>Medium (30 sat/vb)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.third} onPress={() => selectFeesClickHandler(2)}>
                                    <Text bold style={selectedFees === 2 ? StyleSheet.flatten([styles.border, { paddingHorizontal: 11.5 }]) : {}}>Slow (10 sat/vb)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.fourth} onPress={() => selectFeesClickHandler(3)}>
                                    <Text bold style={selectedFees === 3 ? StyleSheet.flatten([styles.border, { paddingHorizontal: 20 }]) : {}}>Customize</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <TouchableOpacity style={[styles.editAmount, { flexDirection: 'row', borderColor: feesEditable ? colors.green : '#B6B6B6' }]}
                            onPress={editFeesClickHandler}>
                            <Text style={{ marginStart: 10, }}>{getFeesText()}</Text>
                            <View style={{ marginHorizontal: 10 }}>
                                <Icon name="chevron-up" type="font-awesome" color={colors.white} size={10} />
                                <Icon name="chevron-down" type="font-awesome" color={colors.white} size={10} />
                            </View>
                        </TouchableOpacity>
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
                    <TextInput
                        value={note}
                        onChangeText={setNote}
                        placeholder="Add note"
                        placeholderTextColor={colors.white}
                        style={[styles.noteInput, { borderColor: note?.length > 0 ? colors.green : '#B6B6B6' }]}
                    />
                </View>
                <TouchableOpacity onPress={nextClickHandler} style={styles.nextBtn}>
                    <Text h3>Next</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
