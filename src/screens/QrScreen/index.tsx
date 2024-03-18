import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Copy, QrCode, Share } from "@Cypher/assets/images";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@Cypher/style-guide";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";

interface Props {
    route: any;
}

export default function QrScreen({ route }: Props) {
    const { navigate } = useNavigation();
    const { isBitcoinQr } = route?.params;

    const copyClickHandler = () => {
        dispatchNavigate('SendReceiveSuccessScreen', {
            isReceive: false,
            value: '10',
            valueUsd: '0.0054',
        })
    }

    return (
        <ScreenLayout showToolbar title='Show QR Code' isTitleCenter>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text bold style={styles.maintitle}>{isBitcoinQr ? 'Bitcoin Network Address' : 'Bitcoin Lightning QR'}</Text>
                    <Image source={QrCode} resizeMode="contain" style={styles.image} />
                    <View style={styles.imageView}>
                        <TouchableOpacity onPress={copyClickHandler}>
                            <Image source={Copy} resizeMode="contain" />
                        </TouchableOpacity>
                        <Image source={Share} resizeMode="contain" />
                    </View>
                    {isBitcoinQr ?
                        <Text h3 style={styles.title}>Tip: it’s much faster and cheaper for the sender to send funds to lightning addresses and invoices instead of using the main Bitcoin Network, so tell them download Cypher Bank!</Text>
                        :
                        <Text h3 style={styles.title}>Tip: If the sender’s wallet can’t identify this code you can use other methods such as creating an invoice or receiving to your own unique<Text h3 style={StyleSheet.flatten([styles.title, {
                            color: colors.pink.main,
                        }])}> Lightning address</Text> on Blink.</Text>
                    }
                </View>
            </View>
        </ScreenLayout>
    )
}
