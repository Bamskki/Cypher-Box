import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { Copy, QrCode, Share2 } from "@Cypher/assets/images";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { ImageTextVertical } from "@Cypher/components";

interface Props {
    route: any;
}

export default function CopyInvoice({ route }: Props) {
    return (
        <ScreenLayout showToolbar title='Copy Invoice'>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text bold h1>{route?.params?.value}</Text>
                    <Text bold style={styles.usd}>{route?.params?.converted}</Text>
                    <Image source={QrCode} resizeMode="contain" style={styles.image} />
                    <Text semibold style={styles.code}>bc1qt3......wmsn6u</Text>
                    <View style={styles.imageView}>
                        <ImageTextVertical text="Copy" source={Copy} />
                        <ImageTextVertical text="Share" source={Share2} />
                    </View>
                    <Text bold h3 style={styles.maintitle}>Copy this invoice code or share the QR with the sender to receive bitcoin</Text>
                </View>
            </View>
        </ScreenLayout>
    )
}
