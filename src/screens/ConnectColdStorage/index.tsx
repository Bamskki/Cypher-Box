import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, Keyboard, LayoutAnimation, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import IdleTimerManager from 'react-native-idle-timer';
import { Input, ScreenLayout, Text } from "@Cypher/component-library";
import { colors, } from "@Cypher/style-guide";
import { requestCameraAuthorization, scanQrHelper } from "../../../helpers/scan-qr";
import styles from "./styles";
import { HDSegwitBech32Wallet } from "../../../class";
import useAuthStore from "@Cypher/stores/authStore";
import { dispatchNavigate } from "@Cypher/helpers";
import startImport from "../../../class/wallet-import";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import triggerHapticFeedback, { HapticFeedbackTypes } from "../../../blue_modules/hapticFeedback";

interface Props {
    route: any;
    navigation: any;
}

export default function ConnectColdStorage({ route, navigation }: Props) {
    const [address, setAddress] = useState<string>("")
    const [progress, setProgress] = useState();
    const [wallets, setWallets] = useState([]);
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const { setColdStorageWalletID } = useAuthStore();
    const { addAndSaveWallet } = useContext(BlueStorageContext);
    const task = useRef<any>();
    const importing = useRef(false);

    console.log('address: ', address)
    const onBarScanned = value => {
        if (value && value.data) value = value.data + ''; // no objects here, only strings
        setAddress(value);
    };
    
    const importScan = () => {
        requestCameraAuthorization().then(() =>
              navigation.navigate('ScanQRCodeRoot', {
                screen: 'ScanQRCode',
                params: {
                    launchedBy: route.name,
                    onBarScanned,
                    showFileImportButton: true,
                },
            }),
        );
    };
    
    const onBlur = () => {
        const valueWithSingleWhitespace = address.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
        setAddress(valueWithSingleWhitespace);
        return valueWithSingleWhitespace;
    };
    
    const importButtonPressed = () => {
        const textToImport = address.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
        if (textToImport.trim().length === 0) {
          return;
        }
        handleImport(textToImport);
    };

    const saveWallet = (wallet: any) => {
        if (importing.current) return;
        importing.current = true;
        addAndSaveWallet(wallet);
    };

    const handleImport = async (textToImport: string) => {
        console.log('textToImport: ', textToImport)
        const isValid = textToImport.startsWith('xpub') || textToImport.startsWith('ypub') || textToImport.startsWith('zpub');
        console.log('isValid: ', isValid)
        if (!isValid) {
            Alert.alert('Invalid Mnemonic', 'Please check your address and try again.');
            return;
        }

        // If valid, proceed with the import
        const onProgress = (data: React.SetStateAction<undefined>) => setProgress(data);
        const onWallet = (wallet: { getID: () => any; getDerivationPath: () => any; }) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            const id = wallet.getID();
            setColdStorageWalletID(id)
            let subtitle: any;
            try {
                subtitle = wallet.getDerivationPath?.();
                dispatchNavigate('HomeScreen');
            } catch (e) { }
            setWallets(w => [...w, { wallet, subtitle, id }]);
        };

        const onPassword = async (title: string | undefined, subtitle: string | undefined) => {
            try {
                const pass = await prompt(title, subtitle);
                setPassword(pass);
                return pass;
            } catch (e) {
                if (e.message === 'Cancel Pressed') {
                    navigation.goBack();
                }
                throw e;
            }
        };

        IdleTimerManager.setIdleTimerDisabled(true);
        setLoading(true);

        task.current = startImport(textToImport, false, false, onProgress, onWallet, onPassword);

        task.current.promise
            .then(({ cancelled, wallets: w }) => {
                if (cancelled) return;
                if (w.length === 1) saveWallet(w[0]);
                if (w.length === 0) {
                    triggerHapticFeedback(HapticFeedbackTypes.ImpactLight);
                }
            })
            .catch((e: { message: string | undefined; }) => {
                console.warn('import error', e);
                Alert.alert('Import error', e.message);
            })
            .finally(() => {

                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setLoading(false);
                IdleTimerManager.setIdleTimerDisabled(false);
            });
    };
    
    // const importMnemonic = text => {
    //     navigation.navigate('ImportWalletDiscovery', { importText: text, askPassphrase: false, searchAccounts: false });
    // };    

    const pasteClickHandler = async () => {
        const text = await Clipboard.getString();
        console.log("🚀 ~ pasteClickHandler ~ text:", text)
        setAddress(text);
    }

    return (
        <ScreenLayout disableScroll showToolbar isBackButton title={"Connect Hardware Device"}>
            <ScrollView style={styles.container}>
            <View style={styles.pasteview}>
                <TouchableOpacity style={[styles.button, { borderColor: colors.blueText }]} onPress={pasteClickHandler}>
                    {address ?
                        <Text bold>{address}</Text>
                        :
                        <Text bold>Paste</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={importScan}>
                    <Image source={require("../../../img/scan-new.png")} style={styles.qrcode} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={importButtonPressed} style={styles.importBtn} disabled={loading}>
                {loading ?
                    <ActivityIndicator color={colors.white} />
                    :
                    <Text h3>Import</Text>
                }
            </TouchableOpacity>
            </ScrollView>
        </ScreenLayout>
    )
}
