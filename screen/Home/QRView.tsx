import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRView = ({ route }) => {
    const { qrView, qrCode } = route.params

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 16 }}>
            {qrView &&
                <View style={{ marginVertical: 20 }}>
                    <QRCode
                        value={qrCode}
                        size={200}
                        color="black"
                        backgroundColor="white"
                    />
                </View>
            }
            <Text>{qrCode}</Text>
            <TouchableOpacity style={{marginTop: 20}} onPress={() => copyToClipboard(qrCode)}>
                <Text style={{color: 'blue'}}>Copy</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QRView;
