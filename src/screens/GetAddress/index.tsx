import React, { useState } from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { GradientButton } from "@Cypher/components";
import { dispatchNavigate } from "@Cypher/helpers";

export default function GetAddressScreen() {
    const [upi, setUpi] = useState('');
    const [vga, setVGA] = useState('');

    const showQRClickHandler = (isBitcoin: boolean) => {
        dispatchNavigate('QrScreen', {
            isBitcoinQr: isBitcoin,
        });
    }

    const createLightningAddressClickHandler = () => {
        setVGA(`${upi}@blink.sv`);
    }

    return (
        <ScreenLayout showToolbar title={vga ? "Receive to Address or QR" : "Receive to Address"} isTitleCenter>
            <View style={styles.container}>
                {vga ?
                    <View style={styles.inner}>
                        <Text bold subHeader style={styles.desc}>Bitcoin-Lightning</Text>
                        <GradientButton title={vga} isShadow isTextShadow
                            style={styles.code} isIcon textStyle={styles.number} />
                        {/* <Button style={styles.button} textStyle={styles.buttonText} text="Show QR" onPress={() => showQRClickHandler(false)} /> */}
                    </View>
                    :
                    <View style={styles.inner}>
                        <Text bold h3>Set an easy-to-read lightning address to{'\n'}receive bitcoin from other lightning-enabled wallets :</Text>
                        <View style={styles.inputView}>
                            <TextInput style={styles.input}
                                value={upi}
                                onChangeText={setUpi}
                            />
                            <Text bold h3>@blink.sv</Text>
                        </View>
                        <Text bold h3 style={styles.cannottext}>It can’t be changed later</Text>
                        <GradientButton title="Create Lightning address" isShadow isTextShadow onPress={createLightningAddressClickHandler}/>
                        {/* <Button style={styles.button} textStyle={styles.buttonText} text="Show QR" onPress={() => showQRClickHandler(false)} /> */}
                    </View>
                }
                <View style={styles.orView}>
                    <View style={styles.line} />
                    <Text bold h2 style={styles.or}>OR</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.inner}>
                    <Text bold h2 style={styles.desc}>Bitcoin address {'\n'}Top-up your Checking Account {'\n'}from the Bitcoin Network</Text>
                    <GradientButton title="bc1qt3...wmsn6u" isShadow isTextShadow
                        style={styles.code} isIcon textStyle={styles.number} />
                    <Button style={styles.button} textStyle={styles.buttonText} text="Show QR" onPress={() => showQRClickHandler(true)} />
                </View>
                <Text h3 style={styles.bottomText}>Tip: it’s much faster and cheaper for the sender to send funds to lightning addresses and invoices instead of using the main Bitcoin Network, so tell them download Cypher Bank!</Text>
            </View>
        </ScreenLayout>
    )
}