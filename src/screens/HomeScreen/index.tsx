import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../../components/themes";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { scanQrHelper } from "../../../helpers/scan-qr";
import DeeplinkSchemaMatch from "../../../class/deeplink-schema-match";
import triggerHapticFeedback, { HapticFeedbackTypes } from "../../../blue_modules/hapticFeedback";

export default function HomeScreen() {
    const { navigate } = useNavigation();
    const routeName = useRoute().name;

    const navigateToSettings = () => {
        navigate('Settings');
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
                    <Text style={styles.titleText}>Total Balance</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.imageView}
                            onPress={navigateToSettings}>
                            <Image style={styles.image}
                                resizeMode="contain"
                                source={require('../../../img/settings.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageView}
                            onPress={onScanButtonPressed}>
                            <Image style={styles.image}
                                resizeMode="contain"
                                source={require('../../../img/scan-new.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <LinearGradient
                    start={{ x: 0.75, y: -1 }}
                    end={{ x: 1.1, y: 1.0 }}
                    style={styles.linearGradient}
                    locations={[0, 0.5, 0.6]}
                    colors={['#db36ad', '#db36ad', '#17c6dc']}>
                    <View style={styles.inner}>
                        <Text style={styles.titleText}>0.00000000 BTC</Text>
                        <Text style={styles.titleText}>$0</Text>
                    </View>
                </LinearGradient>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.linearGradient}
                    colors={['#FF65DD', 'rgba(214, 23, 161, 0.9)']}>
                    <View style={styles.middle}>
                        <Image style={styles.arrow}
                            resizeMode="contain"
                            source={require('../../../img/arrow-right.png')}
                        />
                        <Text style={[styles.titleText, {
                            fontSize: 20, marginStart: 5,
                            textShadowColor: 'rgba(0, 0, 0, 0.75)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 10
                        }]}>Create Your Checking Account</Text>
                    </View>
                </LinearGradient>
                <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <Text style={[styles.text, { color: '#c71c97', marginStart: 5, fontWeight: 'bold' }]}>Login</Text>
                </View>
            </View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.linearGradient}
                colors={['#c3c3c3', '#c3c3c3']}>
                <View style={[styles.inner, {
                    backgroundColor: '#464646',
                    paddingHorizontal: 15
                }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[styles.titleText, { fontSize: 20 }]}>Savings Vault</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.bitcointext}>Bitcoin Networn</Text>
                            <Image style={{ width: 35, height: 35 }}
                                resizeMode="contain"
                                source={require('../../../img/bitcoin.png')}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}