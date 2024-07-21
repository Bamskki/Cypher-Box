import React, { useCallback, useContext, useRef, useState } from "react";
import { LoadingSpinner, Text } from "@Cypher/component-library";
import { Image, InteractionManager, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SimpleToast from "react-native-simple-toast";
import Share from 'react-native-share';
import QRCode from "react-native-qrcode-svg";
import Clipboard from "@react-native-clipboard/clipboard";

import { GradientView, SavingVault } from "@Cypher/components";
import styles from "./styles";

import { BlueStorageContext } from "../../../blue_modules/storage-context";
import { Copy, InformationNew, QrCode, Share as Share2, ShareNew } from "@Cypher/assets/images";
import { btc } from "@Cypher/helpers/coinosHelper";
import { formatBalance, formatBalanceWithoutSuffix } from "../../../loc";

const shortenAddress = (address: string) => {
    // Take the first 6 characters
    const start = address.substring(0, 6);
    // Take the last 6 characters
    const end = address.substring(address.length - 6);
    // Combine with three dots in the middle
    return `${start}...${end}`;
};

export default function Vault({wallet, matchedRate}: {wallet: any, matchedRate: string}) {
    const currency = btc(1);
    const balance = !wallet?.hideBalance && formatBalance(Number(wallet?.getBalance()), wallet?.getPreferredBalanceUnit(), true);
    const balanceWithoutSuffix = !wallet?.hideBalance && formatBalanceWithoutSuffix(Number(wallet?.getBalance()), wallet?.getPreferredBalanceUnit(), true);
    const { wallets, saveToDisk, sleep, isElectrumDisabled } = useContext(BlueStorageContext);
    const [address, setAddress] = useState()
    const base64QrCodeRef = useRef('');

    const obtainWalletAddress = async () => {
        let newAddress;
        try {
            if (!isElectrumDisabled) newAddress = await Promise.race([wallet.getAddressAsync(), sleep(1000)]);
        } catch (_) {}
        if (newAddress === undefined) {
            // either sleep expired or getAddressAsync threw an exception
            console.warn('either sleep expired or getAddressAsync threw an exception');
            newAddress = wallet._getExternalAddressByIndex(wallet.getNextFreeAddressIndex());
        } else {
            saveToDisk(); // caching whatever getAddressAsync() generated internally
        }
        console.log('newAddress: ', newAddress)
        setAddress(newAddress);
    }

    useFocusEffect(
        useCallback(() => {
          const task = InteractionManager.runAfterInteractions(async () => {
            if (wallet) {
                obtainWalletAddress();
            }
          });
          return () => {
            task.cancel();
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [wallet]),
    );

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        SimpleToast.show('Copied to clipboard', SimpleToast.SHORT);
    };

    const addressClickHandler = () => {

    }

    const shareQRCode = async () => {
        try {
            console.log('base64QrCodeRef: ', base64QrCodeRef)
        
            const shareOptions = {
                message: `Bitcoin: ${address}`,
                url: `data:image/jpeg;base64,${base64QrCodeRef?.current}`,
            };
        
            await Share.open(shareOptions);
    
        } catch (error) {
              console.error('Error sharing QR code:', error);
        }
    };


    console.log('address: ', address)
    return (
        <View style={styles.container}>
            <SavingVault
                container={styles.savingVault}
                innerContainer={styles.savingVault}
                shadowTopBottom={styles.savingVault}
                shadowBottomBottom={styles.savingVault}
                bitcoinText={styles.bitcoinText}
                imageStyle={styles.bitcoinImage}
                titleStyle={styles.title}
                title="Hot Savings"
                bitcoinValue={balance}
                inDollars={`$${(Number(balanceWithoutSuffix) * Number(matchedRate) * currency).toFixed(2)}`}
            />
            <View style={styles.base}>
                <GradientView
                    onPress={addressClickHandler}
                    style={styles.linearGradientStyle}
                    linearGradientStyle={styles.mainShadowStyle}
                    topShadowStyle={styles.outerShadowStyle}
                    bottomShadowStyle={styles.innerShadowStyle}
                    linearGradientStyleMain={styles.linearGradientStyleMain}
                >
                    <Text h3 center>Vault Addresses</Text>
                </GradientView>
                <GradientView
                    onPress={addressClickHandler}
                    topShadowStyle={styles.outerShadowStyle}
                    bottomShadowStyle={styles.innerShadowStyle}
                    style={[styles.linearGradientStyle, { marginStart: 25 }]}
                    linearGradientStyle={styles.mainShadowStyle}
                    linearGradientStyleMain={styles.linearGradientStyleMain}
                >
                    <Text h3 center>Send Coins</Text>
                </GradientView>
            </View>
            <View style={[styles.base, { marginHorizontal: 20 }]}>
                <Image style={styles.info} source={InformationNew} />
                <Text style={styles.textInfo} italic>What is a Savings Vault?</Text>
            </View>
            {address ?
                <>
                    <View style={styles.qrcode}>
                        <View style={{ margin: 25, padding: 20, backgroundColor: 'white', borderRadius: 30 }}>
                            <QRCode
                                getRef={c => {
                                    if (!c?.toDataURL) return;
                                        c?.toDataURL((base64Image: string) => {
                                        base64QrCodeRef.current = base64Image?.replace(/(\r\n|\n|\r)/gm, '');
                                    });
                                }}
                                value={address}
                                    size={150}
                                    color="black"
                                    backgroundColor="white"
                            />
                        </View>
                    </View>
                    <View style={styles.codeViewMain}>
                        <TouchableOpacity style={styles.codeView} onPress={() => copyToClipboard(address)}>
                            <Image source={Copy} style={styles.copyImage} resizeMode="contain" />
                            <Text semibold style={styles.address}>{shortenAddress(address)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={shareQRCode}>
                            <Image source={ShareNew} style={styles.shareImage} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>
                    <Text h4 style={styles.infoText}>You can use this Bitcoin Network address of your vault to receive coins</Text>
                </>
                :
                <View style={{marginTop: 100}}>
                    <LoadingSpinner />
                </View>       

            }
        </View>
    )
}