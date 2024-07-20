import React from "react";
import {
    Image,
    ImageStyle,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from "react-native";
import styles from "./styles";
import { Text } from "@Cypher/component-library";
import { Shadow } from "react-native-neomorph-shadows";
import { ProgressBar1, ProgressBar2, ProgressBar3, ProgressBar4, ProgressBar5 } from "@Cypher/assets/images";
import ProgressBar from "../ProgressBar";

interface Props extends TouchableOpacityProps {
    container?: ViewStyle;
    innerContainer?: ViewStyle;
    shadowTopBottom?: any;
    shadowBottomBottom?: any;
    bitcoinText?: TextStyle;
    imageStyle?: ImageStyle;
    titleStyle?: TextStyle;
    onPress?(): void;
    title?: string;
    bitcoinValue?: any;
    inDollars?: any;
}

export default function SavingVault({ container, innerContainer, shadowTopBottom, shadowBottomBottom, bitcoinText, onPress, imageStyle, title = 'Savings Vault', titleStyle, bitcoinValue, inDollars }: Props) {
    const btc = '0.1';
    // const inDollar = '6500';
    return (
        <TouchableOpacity style={[styles.container, container]} onPress={onPress}>
            <View style={[styles.innerContainer, innerContainer]}>
                <Shadow
                    style={StyleSheet.flatten([styles.shadowTopBottom, shadowTopBottom])}
                    inner
                    useArt
                >
                    <View style={styles.bottominner}>
                        <Text h3 bold style={titleStyle}>{title}</Text>
                        <View style={styles.row}>
                            <Text h4 bold style={StyleSheet.flatten([styles.bitcointext, bitcoinText])}>
                                Bitcoin Network
                            </Text>
                            <Image
                                style={[styles.bitcoinimg, imageStyle]}
                                resizeMode="contain"
                                source={require("../../../img/bitcoin.png")}
                            />
                        </View>
                    </View>
                    {bitcoinValue &&
                        <View style={styles.bitcoin}>
                            <Text h2>{bitcoinValue} </Text>
                            <Text h3>~ {inDollars}</Text>
                        </View>
                    }
                    {bitcoinValue ?
                        <View style={styles.tabs}>
                            <ProgressBar image={ProgressBar1} />
                            <ProgressBar image={ProgressBar2} />
                            <ProgressBar image={ProgressBar3} />
                            <ProgressBar image={ProgressBar4} />
                            <ProgressBar image={ProgressBar5} />
                        </View>
                        :
                        <View style={styles.tabs}>
                            <View style={styles.tab} />
                            <View style={styles.tab} />
                            <View style={styles.tab} />
                            <View style={styles.tab} />
                            <View style={styles.tab} />
                        </View>
                    }
                    <Shadow
                        inner
                        useArt
                        style={StyleSheet.flatten([styles.shadowBottomBottom, shadowBottomBottom])}
                    />
                </Shadow>
            </View>
        </TouchableOpacity>
    );
}
