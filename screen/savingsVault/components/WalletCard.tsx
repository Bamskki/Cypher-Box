import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WalletCard = ({ walletName, balance, status }) => {

    return (
        <LinearGradient
            style={[styles.gradient]} colors={['#1693ED', '#15A7A7']} start={{ x: -1, y: 0.8 }} >
            <Image style={{ width: 35, height: 35 }} resizeMode="contain" source={require('../../../img/bitcoin.png')} />
            <Text style={styles.text}>{walletName}</Text>
            <View>
                <Text style={styles.text}>
                    {balance} BTC {'\n'}
                    <Text> {status}</Text>
                </Text>
            </View>
        </LinearGradient>

    );
};

export default WalletCard;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    gradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 18,
        marginVertical: 10
    },
    text: {
        fontFamily: 'Lato',
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 17,
        color: "#FFFFFF"
    }
});
