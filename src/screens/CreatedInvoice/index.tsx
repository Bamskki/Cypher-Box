import React, { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import SimpleToast from "react-native-simple-toast";
import Clipboard from '@react-native-clipboard/clipboard';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import { Copy, Share as ShareIcon } from "@Cypher/assets/images";

export default function CreatedInvoice({navigation, route} : any) {
    const { invoice } = route.params;
    const qrCode = useRef();
    const base64QrCodeRef = useRef('');


    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        SimpleToast.show('Copied to clipboard', SimpleToast.SHORT);
    };
    
    const shortenAddress = (address: string) => {
        // Take the first 6 characters
        const start = address.substring(0, 6);
        // Take the last 6 characters
        const end = address.substring(address.length - 6);
        // Combine with three dots in the middle
        return `${start}...${end}`;
    };

    const shareQRCode = async () => {
        try {
            // const qrData = 'Bitcoin-lightning invoice QR code data'; // Replace this with your QR code data
            console.log('base64QrCodeRef: ', base64QrCodeRef)

            // const qrCodeImage = await qrCode.current?.toDataURL(qrData);
            // console.log('qrCodeImage: ', qrCodeImage)
            const message = `Please send ${invoice?.amount} sats by scanning this Bitcoin-lightning invoice QR code from your wallet`;
        
            const shareOptions = {
                message: `${message}\n\nQR image: ${invoice?.hash}`,
                url: `data:image/jpeg;base64,${base64QrCodeRef?.current}`,
            };
        
            await Share.open(shareOptions);
    
        } catch (error) {
              console.error('Error sharing QR code:', error);
        }
    };

    return (
        <ScreenLayout showToolbar isBackButton title="Copy Invoice" >
            <View style={{marginHorizontal: 30}}>
                <Text h3 style={styles.text}>Copy this invoice (or QR Code) and share it with the sender.</Text>
                <Text semibold style={styles.text2}>Receive {invoice?.amount} sats</Text>
                <TouchableOpacity style={styles.height} onPress={() => copyToClipboard(invoice?.hash)}>
                    <Text semibold center style={styles.new}>{shortenAddress(invoice?.hash)}</Text>
                    <Image source={Copy} resizeMode="contain" style={styles.img} />
                </TouchableOpacity>
                <View style={{ margin: 20, padding: 30, backgroundColor: 'white', borderRadius: 30 }}>
                    <QRCode
                        getRef={c => {
                            if (!c?.toDataURL) return;
                                c?.toDataURL((base64Image: string) => {
                                base64QrCodeRef.current = base64Image.replace(/(\r\n|\n|\r)/gm, '');
                            });
                        }}
                      value={invoice?.hash}
                        size={250}
                        color="black"
                        backgroundColor="white"
                    />
                </View>
                <TouchableOpacity onPress={shareQRCode}>
                    <Image source={ShareIcon} resizeMode="contain" style={styles.shareImg} />
                </TouchableOpacity>
            </View>
            {/* <Text subHeader style={styles.inDollar}>$0.00</Text> */}
            {/* <Button 
                loading={isLoading}
                disabled={isLoading}
                style={styles.button} 
                textStyle={styles.buttonText} 
                text="Create invoice" 
                onPress
                // onPress={handleCreateInvoice} 
            /> */}
        </ScreenLayout>
    )
}