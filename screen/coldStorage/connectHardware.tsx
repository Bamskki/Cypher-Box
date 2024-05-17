import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import navigationStyle from '../../components/navigationStyle';
import NextButton from './components/button';
import { useNavigation, useRoute } from '@react-navigation/native';
import GradientText from '../../components/GradientText';
import { scanQrHelper } from '../../helpers/scan-qr';
import DeeplinkSchemaMatch from '../../class/deeplink-schema-match';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../../blue_modules/hapticFeedback';
import Scan from '../../svg/Scan';

export default function ConnectHardware() {
    const { navigate } = useNavigation();
    const routeName = useRoute().name;

    const navigateToColdStorage = () => {
        navigate('ColdStorageCreated');
    };

    const onScanButtonPressed = () => {
        scanQrHelper(navigate, routeName).then(onBarScanned);
    };

    const onBarScanned = (value: any) => {
        if (!value) return;
        DeeplinkSchemaMatch.navigationRouteFor({ url: value }, (completionValue: any) => {
            triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
            navigate(...completionValue);
        });
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.progress}>
                    <Image height={10} source={require('../../img/progress.png')} />
                </View>
                <GradientText colors={['#1693ED', '#15A7A7']} style={styles.title}>
                    Connect Hardware
                </GradientText>
                <Text style={styles.textStyle}>
                    Authorize your hardware device to display its Public Key (the xpub) in QR format then click the scan button{' '}
                </Text>
                <Image style={styles.arrow} resizeMode="contain" source={require('../../img/arrow-down.png')} />
                <View style={styles.scanContainer}>
                    <TouchableOpacity onPress={onScanButtonPressed}>
                        <Scan />
                    </TouchableOpacity>
                </View>
            </View>

            <NextButton btnText="Connect" onPress={navigateToColdStorage} />
        </View>
    );
}

ConnectHardware.navigationOptions = navigationStyle({}, opts => ({ ...opts, headerTitle: '' }));
