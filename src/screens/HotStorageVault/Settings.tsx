import React, { useState } from "react";
import styles from "./styles";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, Animated as RNAnimated } from "react-native";
import { Text } from "@Cypher/component-library";
import { colors } from "@Cypher/style-guide";
import { Back } from "@Cypher/assets/images";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
} from "react-native-reanimated";
import { PrivateKeyGenerater, Tips } from "@Cypher/components";

export default function Settings() {
    // const [right] = useState(new Animated.Value(0));
    const firstView = useSharedValue(1);
    const secondView = useSharedValue(0);
    const thirdView = useSharedValue(0);
    const [right] = useState(new RNAnimated.Value(0));
    const [viewType, setViewType] = useState(0);

    const nextClickInitiate = () => {
        backClickHandler();
    }

    const infoViewClickHandler = () => {
        firstView.value = withTiming(0, {
            duration: 1000,
            easing: Easing.linear,
        });

        secondView.value = withTiming(1, {
            duration: 1000,
            easing: Easing.linear,
        });
    }

    const backupSeedPhraseClickHandler = () => {
        setViewType(1);
        RNAnimated.timing(right, {
            toValue: Dimensions.get('window').width * 1.15,
            duration: 250,
            useNativeDriver: false,
        }).start();
        // firstView.value = withTiming(0, {
        //     duration: 1000,
        //     easing: Easing.linear,
        // });

        // thirdView.value = withTiming(1, {
        //     duration: 1000,
        //     easing: Easing.linear,
        // });
    }

    const backClickHandler = () => {
        // secondView.value = withTiming(0, {
        //     duration: 1000,
        //     easing: Easing.linear,
        // });

        // thirdView.value = withTiming(0, {
        //     duration: 1000,
        //     easing: Easing.linear,
        // });

        // firstView.value = withTiming(1, {
        //     duration: 1000,
        //     easing: Easing.linear,
        // });
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: firstView.value, // Use the value directly
            zIndex: firstView.value === 0 ? 0 : 1,
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            opacity: secondView.value, // Use the value directly 
            zIndex: secondView.value === 0 ? 0 : 1,
        };
    });

    const animatedStyle3 = useAnimatedStyle(() => {
        return {
            opacity: thirdView.value, // Use the value directly 
            zIndex: thirdView.value === 0 ? 0 : 1,
        };
    });

    const leftToRight = () => {
        RNAnimated.timing(right, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    };

    const rightToLeft = async () => {
        await setViewType(0);
        RNAnimated.timing(right, {
            toValue: Dimensions.get('window').width * 1.32,
            duration: 250,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={{
            flex: 1,
        }}>
            <RNAnimated.View style={[styles.main, { right: right }]}>
                <View style={styles.settingView}>
                    <View style={styles.rowview}>
                        <Text bold style={styles.text}>Name Your Vault</Text>
                        <View style={styles.blankspace} />
                    </View>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={backupSeedPhraseClickHandler}>
                        <Text bold style={styles.text}>Backup Seed Phrase</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <Text bold style={styles.text}>Show Addresses</Text>
                    <View style={styles.line} />
                    <Text bold style={styles.text}>Vault’s Public Key (xpub)</Text>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={rightToLeft}>
                        <Text bold style={styles.text}>Info</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <Text bold style={StyleSheet.flatten([styles.text, { color: colors.red }])}>Delete</Text>
                    <View style={styles.line} />
                </View>
                {viewType == 0 ?
                    <View style={styles.settingView2}>
                        <TouchableOpacity onPress={leftToRight}>
                            <Image source={Back} style={styles.backbtn} />
                        </TouchableOpacity>
                        <View style={styles.typeView}>
                            <Text bold style={styles.typeText}>Type</Text>
                            <Text h3>HD SegWit (BIP BECH32 Native)</Text>
                        </View>
                        <View style={styles.typeView}>
                            <Text bold style={styles.typeText}>Transaction count</Text>
                            <Text h3>0</Text>
                        </View>
                        <View style={styles.typeView}>
                            <Text bold style={styles.typeText}>Mater fingerprint</Text>
                            <Text h3>78AD4F2A</Text>
                        </View>
                        <View style={styles.typeView}>
                            <Text bold style={styles.typeText}>Derivation path</Text>
                            <Text h3>m/84’/0’/0’</Text>
                        </View>
                    </View>
                    :
                    <View style={styles.settingView2}>
                        <View style={styles.backupView}>
                            <TouchableOpacity onPress={leftToRight}>
                                <Image source={Back} style={styles.backbtn} />
                            </TouchableOpacity>
                            <Text h4 style={styles.titleBackup}>Write  this backup copy on a piece of paper</Text>
                        </View>
                        <PrivateKeyGenerater callNext={nextClickInitiate} />
                        <Tips />
                    </View>
                }
            </RNAnimated.View>
            {/* <Animated.View style={[styles.main, animatedStyle]}>
                <View style={styles.settingView}>
                    <Text bold style={styles.text}>Name Your Vault</Text>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={backupSeedPhraseClickHandler}>
                        <Text bold style={styles.text}>Backup Seed Phrase</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <Text bold style={styles.text}>Show Addresses</Text>
                    <View style={styles.line} />
                    <Text bold style={styles.text}>Vault’s Public Key (xpub)</Text>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={infoViewClickHandler}>
                        <Text bold style={styles.text}>Info</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <Text bold style={StyleSheet.flatten([styles.text, { color: colors.red }])}>Delete</Text>
                    <View style={styles.line} />
                </View>
            </Animated.View>
            <Animated.View style={[styles.infoView, animatedStyle2]}>
                <View style={styles.settingView2}>
                    <TouchableOpacity onPress={backClickHandler}>
                        <Image source={Back} style={styles.backbtn} />
                    </TouchableOpacity>
                    <View style={styles.typeView}>
                        <Text bold style={styles.typeText}>Type</Text>
                        <Text h3>HD SegWit (BIP BECH32 Native)</Text>
                    </View>
                    <View style={styles.typeView}>
                        <Text bold style={styles.typeText}>Transaction count</Text>
                        <Text h3>0</Text>
                    </View>
                    <View style={styles.typeView}>
                        <Text bold style={styles.typeText}>Mater fingerprint</Text>
                        <Text h3>78AD4F2A</Text>
                    </View>
                    <View style={styles.typeView}>
                        <Text bold style={styles.typeText}>Derivation path</Text>
                        <Text h3>m/84’/0’/0’</Text>
                    </View>
                </View>
            </Animated.View>
            <Animated.View style={[styles.infoView, animatedStyle3]}>
                <View style={styles.settingView2}>
                    <View style={styles.backupView}>
                        <TouchableOpacity onPress={backClickHandler}>
                            <Image source={Back} style={styles.backbtn} />
                        </TouchableOpacity>
                        <Text h4 style={styles.titleBackup}>Write  this backup copy on a piece of paper</Text>
                    </View>
                    <PrivateKeyGenerater callNext={nextClickInitiate} />
                    <Tips />
                </View>
            </Animated.View> */}

        </View>
    )
}
