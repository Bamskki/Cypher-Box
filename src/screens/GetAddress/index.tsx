import React, { useState } from "react";
import { Image, TextInput, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { GradientCardWithShadow } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";
import { StyleSheet } from "react-native";
import { shadow } from '@Cypher/style-guide';
import { Copy, Current } from "@Cypher/assets/images";

export default function GetAddressScreen() {
    const [upi, setUpi] = useState('');
    const [vga, setVGA] = useState('');

    const showQRClickHandler = (isBitcoin: boolean) => {
        console.log('show qr click');
        dispatchNavigate('QrScreen', {
            isBitcoinQr: isBitcoin,
        });
    }

    const createLightningAddressClickHandler = () => {
        console.log('create lightning address click');
        setVGA(`${upi}@coinos.io`);
    }

    return (
        <ScreenLayout showToolbar title={vga ? "Receive to Address or QR" : "Receive to Address"}>
            <View style={styles.container}>
                {vga ?
                    <View style={styles.inner}>
                        <View style={styles.bitcointxt}>
                            <Text bold subHeader style={styles.desc}>Bitcoin-Lightning</Text>
                            <Image source={Current} style={styles.current} />
                        </View>
                        <GradientCardWithShadow style={styles.height} disabled linearStyle={styles.height} shadowStyleTop={styles.height} shadowStyleBottom={styles.height}>
                            <Text semibold center style={styles.new}>{vga}</Text>
                            <Image source={Copy} resizeMode="contain" style={styles.img} />
                        </GradientCardWithShadow>
                    </View>
                    :
                    <View style={styles.inner}>
                        <Text bold h3>Set an easy-to-read lightning address to{'\n'}receive bitcoin from other lightning-enabled wallets :</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.input}
                                value={upi}
                                onChangeText={setUpi}
                            />
                            <Text bold h3>@coinos.io</Text>
                        </View>
                        <Text bold h3 style={styles.cannottext}>It can’t be changed later</Text>
                        <Button style={StyleSheet.flatten([styles.button, { marginTop: 0 }])} textStyle={styles.create} text="Create Lightning address" onPress={createLightningAddressClickHandler} />
                    </View>
                }
                <View style={styles.orView}>
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <Text bold h2 style={styles.or}>OR</Text>
                    <View style={styles.line} />
                    <View style={styles.line} />
                    <View style={styles.line} />
                </View>
                <View style={styles.inner}>
                    <Image
                        style={styles.bitcoinimg}
                        resizeMode="contain"
                        source={require("../../../img/bitcoin.png")}
                    />
                    <Text bold h2 style={styles.desc}>Bitcoin address</Text>
                    <Text h3 style={styles.topup}>Top-up your Checking Account {'\n'}from the Bitcoin Network</Text>
                    <GradientCardWithShadow style={styles.height} disabled linearStyle={styles.height} shadowStyleTop={styles.height} shadowStyleBottom={styles.height}>
                        <Text semibold center style={styles.new}>bc1qt3...wmsn6u</Text>
                        <Image source={Copy} resizeMode="contain" style={styles.img} />
                    </GradientCardWithShadow>
                    <Button style={StyleSheet.flatten([styles.button, shadow.shadow25])} textStyle={styles.buttonText} text="Show QR" onPress={() => showQRClickHandler(true)} />
                </View>
                <Text h3 style={styles.bottomText}>Tip: it’s much faster and cheaper for the sender to send funds to lightning addresses and invoices instead of using the main Bitcoin Network, so tell them download Cypher Bank!</Text>
            </View>
        </ScreenLayout>
    )
}