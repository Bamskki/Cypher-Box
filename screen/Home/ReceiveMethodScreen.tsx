import React from 'react';
import { View } from 'react-native';
import Button from '../../components/Button';

const ReceiveMethodScreen = ({ navigation, route }) => {
    const { userData } = route.params;

    return (
        <View style={{ flex: 1, marginTop: 30, marginHorizontal: 16 }}>
            <Button
                title="Get Address"
                style={{ marginBottom: 20 }}
                onPress={() => navigation.navigate('ReceiveDetail', { method: 'address', userData })}
            />
            <Button
                title="Show QR Code"
                style={{ marginBottom: 20 }}
                onPress={() => navigation.navigate('ReceiveDetail', { method: 'qrcode', userData })}
            />
            <Button
                title="Create Invoice"
                style={{ marginBottom: 20 }}
                onPress={() => navigation.navigate('ReceiveDetail', { method: 'invoice', userData })}
            />
        </View>
    );
};

export default ReceiveMethodScreen;
