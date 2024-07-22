import React, { useRef, useState } from "react";
import { Text } from "@Cypher/component-library";
import { Image, View } from "react-native";
import { GradientView, SavingVault } from "@Cypher/components";
import styles from "./styles";
import { heights, widths } from "@Cypher/style-guide";
import { Copy, InformationNew, QrCode, Share, ShareNew } from "@Cypher/assets/images";
import RBSheet from "react-native-raw-bottom-sheet";
import ReceivedList from "../HomeScreen/ReceivedList";

export default function Vault() {

    const addressClickHandler = () => {

    }

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
                bitcoinValue='0.1 BTC ~ $6500'
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
            <Text h4 style={styles.infoText}>You can use this vault address to receive coins from another vault on the Bitcoin Network</Text>
            <View style={styles.qrcode}>
                <Image source={QrCode} style={styles.qrcodeImage} />
            </View>
            <View style={styles.codeViewMain}>
                <View style={styles.codeView}>
                    <Image source={Copy} style={styles.copyImage} resizeMode="contain" />
                    <Text semibold style={styles.address}>bc1qt3......wmsn6u</Text>
                </View>
                <Image source={ShareNew} style={styles.shareImage} resizeMode="contain" />
            </View>
        </View>
    )
}