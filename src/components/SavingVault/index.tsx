import React, { useContext } from "react";
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
import { ProgressBar5, ProgressBarColdStorage } from "@Cypher/assets/images";
import ProgressBar from "../ProgressBar";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import useAuthStore from "@Cypher/stores/authStore";
import { colors } from "@Cypher/style-guide";

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
    bitcoinValue?: string | false | undefined;
    inDollars?: any;
    isColorable?: boolean;
}

export default function SavingVault({ container, innerContainer, shadowTopBottom, shadowBottomBottom, bitcoinText, onPress, imageStyle, title = 'Savings Vault', titleStyle, bitcoinValue, inDollars, isColorable = false }: Props) {
    const { wallets } = useContext(BlueStorageContext);
    const { walletID, coldStorageWalletID, vaultTab } = useAuthStore();
    const wallet = vaultTab ? wallets.find(w => w.getID() === coldStorageWalletID) : wallets.find(w => w.getID() === walletID);
    const utxo = wallet?.getUtxo(true).sort((a, b) => a.height - b.height || a.txid.localeCompare(b.txid) || a.vout - b.vout) || [];
    // const inDollar = '6500';
    const emptyUTXO = !utxo ? 5 : utxo.length <= 5 ? 5 - utxo.length : utxo.length > 5 && 0;

    return (
        <TouchableOpacity style={[styles.container, container]} onPress={onPress}>
            <View style={[styles.innerContainer, innerContainer]}>
                <Shadow
                    style={StyleSheet.flatten([styles.shadowTopBottom, shadowTopBottom, vaultTab && { shadowColor: colors.blueText }])}
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

                    <View style={styles.tabs}>
                        {Array(utxo.length > 5 ? 5 : utxo.length).fill(0).map((item, i) => (
                            <ProgressBar key={item} image={vaultTab ? ProgressBarColdStorage : ProgressBar5} />
                        ))}
                        {Array(emptyUTXO).fill(0).map((item, i) => (
                            <View key={item} style={styles.tab} />
                        ))}
                    </View>

                    <Shadow
                        inner
                        useArt
                        style={StyleSheet.flatten([styles.shadowBottomBottom, shadowBottomBottom, vaultTab && { shadowColor: colors.blueText }])}
                    />
                </Shadow>
            </View>
        </TouchableOpacity>
    );
}
