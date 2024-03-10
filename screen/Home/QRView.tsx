import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRView = ({ route }) => {
    const { paymentRequest, paymentHash, satoshis } = route.params.invoice;
    const { qrView } = route.params

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 16 }}>
            {qrView &&
                <View style={{ marginVertical: 20 }}>
                    <QRCode
                        value={paymentRequest}
                        size={200}
                        color="black"
                        backgroundColor="white"
                    />
                </View>
            }
            <Text>Lightning URL: {paymentRequest}</Text>
            <TouchableOpacity style={{marginTop: 20}} onPress={() => copyToClipboard(paymentRequest)}>
                <Text style={{color: 'blue'}}>Copy</Text>
            </TouchableOpacity>


        </View>
    );
};

export default QRView;
