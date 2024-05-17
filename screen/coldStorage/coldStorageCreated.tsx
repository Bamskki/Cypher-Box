/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import navigationStyle from '../../components/navigationStyle';
import GradientText from '../../components/GradientText';
import NextButton from './components/button';
import ColdStorageBalance from './components/coldStorageBalance';

export default function ColdStorageCreated() {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.progress}>
                    <Image height={10} source={require('../../img/progress2.png')} />
                </View>
                <GradientText colors={['#1693ED', '#15A7A7']} style={styles.title}>
                    Cold Storage Vault Created!
                </GradientText>
                <ColdStorageBalance />
                <Text style={styles.textStyle}>Remember to keep your seed phrase safe, it's your responsibility!</Text>
                <Text style={styles.textStyle}>
                    This is a Watch-only vault, meaning you can only inspect its balance and grab addresses from it for deposits, but in order to send
                    out funds you need to ‘sign’ or authorize transactions using your hardware device.
                </Text>
                <Text style={styles.textStyle}>
                    You can now secure the funds accumulated in your Hot Savings Vault by transferring them to your Cold Storage Vault.
                </Text>
            </View>
            <NextButton btnText="Home" />
        </View>
    );
}

ColdStorageCreated.navigationOptions = navigationStyle({}, opts => ({ ...opts, headerTitle: '' }));
