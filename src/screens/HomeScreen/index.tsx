/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scanQrHelper } from '../../../helpers/scan-qr';
import DeeplinkSchemaMatch from '../../../class/deeplink-schema-match';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../../../blue_modules/hapticFeedback';
import ColdStorageBalance from '../../../screen/coldStorage/components/coldStorageBalance';
import { flexStyles } from '../../styles';
import * as Progress from 'react-native-progress';

export default function HomeScreen() {
    const { navigate } = useNavigation();
    const routeName = useRoute().name;

    const { width } = Dimensions.get('screen');

    const navigateToSettings = () => {
        navigate('Settings');
    };

    const navigateToColdStorage = () => {
        navigate('TermsAndConditionForColdStorage');
    };
    const navigateToSavingVault = () => {
        navigate('SavingVaultMenu');
    };
    const onScanButtonPressed = () => {
        scanQrHelper(navigate, routeName).then(onBarScanned);
    };

    const onBarScanned = (value: any) => {
        if (!value) return;
        DeeplinkSchemaMatch.navigationRouteFor({ url: value }, completionValue => {
            triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
            navigate(...completionValue);
        });
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>My Balance</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.imageView} onPress={navigateToSettings}>
                            <Image style={styles.settingsImage} resizeMode="contain" source={require('../../../img/settings.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageView} onPress={onScanButtonPressed}>
                            <Image style={styles.image} resizeMode="contain" source={require('../../../img/scan-new.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <LinearGradient
                    start={{ x: 0.75, y: -1 }}
                    end={{ x: 1.1, y: 1.0 }}
                    style={styles.linearGradient}
                    locations={[0, 0.5, 0.6]}
                    colors={['#db36ad', '#db36ad', '#17c6dc']}
                >
                    <View style={styles.inner}>
                        <Text style={styles.titleText}>0.00000000 BTC</Text>
                        <Text style={styles.titleText}>$0</Text>
                    </View>
                </LinearGradient>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.linearGradient}
                    colors={['#FF65DD', 'rgba(214, 23, 161, 0.9)']}
                >
                    <View style={[styles.inner, { backgroundColor: 'transparent' }]}>
                        <View style={flexStyles.justifySpaceBetween}>
                            <Text
                                style={[
                                    styles.titleText,
                                    {
                                        fontSize: 20,
                                        fontWeight: '700',
                                        marginStart: 5,
                                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                        textShadowOffset: { width: 0, height: 2 },
                                        textShadowRadius: 10,
                                    },
                                ]}
                            >
                                Checking Account
                            </Text>
                            <Text
                                style={[
                                    styles.titleText,
                                    {
                                        fontSize: 20,
                                        fontWeight: '700',
                                        marginStart: 5,
                                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                        textShadowOffset: { width: 0, height: 2 },
                                        textShadowRadius: 10,
                                    },
                                ]}
                            >
                                BLINK
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.titleText}>0 sats</Text>
                        </View>
                        <View>
                            <Progress.Bar progress={0.3} width={width * 0.76} borderColor="#FFFFFF" />
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <LinearGradient
                    style={[styles.btn, styles.shadowStyle, styles.outerShadowStyle]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FF65D4', '#D617A1']}
                >

                    <TouchableOpacity onPress={navigateToColdStorage}>
                        <Text style={styles.buttonText}>Receive</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient style={[styles.btn, styles.shadowStyle, styles.outerShadowStyle]} colors={['#B6B6B6', 'rgba(255, 255, 255, 0.00)']}>
                    <TouchableOpacity onPress={navigateToSavingVault}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <Text style={styles.greenText}>Nice! You can now deposit and accumulate bitcoin in your Checking Account. </Text>
            <ColdStorageBalance showBalance />
        </View>
    );
}
