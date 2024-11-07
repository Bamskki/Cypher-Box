import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, View, LayoutAnimation, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import { ScreenLayout, Text, Input, Button } from '@Cypher/component-library';
import { Shadow } from 'react-native-neomorph-shadows';
import { colors } from '@Cypher/style-guide';
import { HDSegwitBech32Wallet } from '../../../class';
import IdleTimerManager from 'react-native-idle-timer';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../../../blue_modules/hapticFeedback';
import startImport from '../../../class/wallet-import';
import { BlueStorageContext } from '../../../blue_modules/storage-context';
import useAuthStore from "@Cypher/stores/authStore";
import { dispatchNavigate } from '@Cypher/helpers';

const inputs = [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12
];

interface Props {
    route: any;
}




export default function RecoverSavingVault({ route }: Props) {
    const [secretWords, setSecretWords] = useState<string[]>(Array(inputs.length).fill(''));
    const { addAndSaveWallet } = useContext(BlueStorageContext);
    const { setWalletID } = useAuthStore();

    const [progress, setProgress] = useState();
    const [wallets, setWallets] = useState([]);
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const importing = useRef(false);
    const inputRefs = useRef<Array<any>>(new Array(inputs.length));


    const saveWallet = (wallet: any) => {
        if (importing.current) return;
        importing.current = true;
        addAndSaveWallet(wallet);
    };

    const task = useRef<any>();

    const handleSecretWordChange = (index: number, value: string) => {
        const updatedSecretWords = [...secretWords];
        updatedSecretWords[index] = value;
        setSecretWords(updatedSecretWords);
    };

    // const bip39 = useMemo(() => {
    //     const hd = new HDSegwitBech32Wallet();
    //     hd.setSecret(secretWords);
    //     return hd.validateMnemonic();
    // }, [importText]);


    const validateMnemonic = async (words: string) => {
        const hd = new HDSegwitBech32Wallet();
        hd.setSecret(words);
        return hd.validateMnemonic();

    }

    const handleImport = async () => {
        const words = secretWords.join(' ')
        const isValid = await validateMnemonic(words);
        if (!isValid) {
            Alert.alert('Invalid Mnemonic', 'Please check your seed phrase and try again.');
            return;
        }

        // If valid, proceed with the import
        const onProgress = (data: React.SetStateAction<undefined>) => setProgress(data);
        const onWallet = (wallet: { getID: () => any; getDerivationPath: () => any; }) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            const id = wallet.getID();
            setWalletID(id)
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

        task.current = startImport(words, false, false, onProgress, onWallet, onPassword);

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

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === ' ' || event.nativeEvent.key === 'Enter') {
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };



    return (
        <ScreenLayout title="Enter Your Seed phrase" showToolbar isBackButton disableScroll>
            <View style={styles.container}>
                {loading ?
                    <ActivityIndicator style={{ marginTop: 10, marginBottom: 20 }} color={colors.white} />
                    :
                    <>
                        <View style={styles.inputsContainer}>
                            {/* First Column */}
                            <View style={styles.inputColumn}>
                                {inputs.slice(0, 6).map((input, index) => (
                                    <View key={input} style={styles.inputContainer}>
                                        <Text h2 style={styles.labelText}>{input}.</Text>
                                        <Input
                                            ref={el => inputRefs.current[index] = el}
                                            style={styles.inputStyle}
                                            onChange={(value) => handleSecretWordChange(index, value)}
                                            value={secretWords[index]}
                                            textInputStyle={styles.textInputStyle}
                                            autoCapitalize='none'
                                            onKeyPress={(event) => handleKeyPress(event, index)}
                                            onSubmitEditing={() => {
                                                if (index < inputRefs.current.length - 1) {
                                                    inputRefs.current[index + 1].focus();
                                                }
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>

                            {/* Second Column */}
                            <View style={styles.inputColumn}>
                                {inputs.slice(6).map((input, index) => (
                                    <View key={input} style={styles.inputContainer}>
                                        <Text h2 style={styles.labelText}>{input}.</Text>
                                        <Input
                                            ref={el => inputRefs.current[index + 6] = el}
                                            style={styles.inputStyle}
                                            onChange={(value) => handleSecretWordChange(index + 6, value)}
                                            value={secretWords[index + 6]}
                                            textInputStyle={styles.textInputStyle}
                                            autoCapitalize='none'
                                            onKeyPress={(event) => handleKeyPress(event, index + 6)}
                                            onSubmitEditing={() => {
                                                if (index + 6 < inputRefs.current.length - 1) {
                                                    inputRefs.current[index + 7].focus();
                                                }
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>
                        </View>
                        <Button
                            text="Recover"
                            onPress={handleImport}
                            style={styles.button}
                            textStyle={styles.btnText}
                        />
                    </>
                }
            </View>
        </ScreenLayout>
    );
}