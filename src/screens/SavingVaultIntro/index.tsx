import React, {useContext, useReducer, useState} from "react";
import { View } from "react-native";
import styles from "./styles";
import { Button, ScreenLayout, Text } from "@Cypher/component-library";
import { dispatchNavigate } from "@Cypher/helpers";
import { colors } from "@Cypher/style-guide";
import { HDSegwitBech32Wallet, HDSegwitP2SHWallet } from "../../../class";
import loc from '../../../loc';
import { initialState, walletReducer } from "../../../screen/wallets/add";
import { BlueStorageContext } from '../../../blue_modules/storage-context';
import triggerHapticFeedback, {
    HapticFeedbackTypes,
  } from "../../../blue_modules/hapticFeedback";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "@Cypher/stores/authStore";

export default function SavingVaultIntro() {
    const [isLoading, setIsLoading] = useState(false)

    const nextClickHandler = () => {
        console.log('next click');
        dispatchNavigate('SavingVault');
    }

    const [state, dispatch] = useReducer(walletReducer, initialState);
    const label = state.label;
    const { addWallet, saveToDisk, isAdvancedModeEnabled, wallets } = useContext(BlueStorageContext);
    const A = require('../../../blue_modules/analytics');
    const { setWalletID } = useAuthStore();

    const createWallet = async () => {
      setIsLoading(true);
  
        let w: HDSegwitBech32Wallet;
          // btc was selected
          // index 2 radio - hd bip84
          w = new HDSegwitBech32Wallet();
          w.setLabel(label || loc.wallets.details_title);
  
          await w.generate();
          addWallet(w);
          await saveToDisk();
          A(A.ENUM.CREATED_WALLET);
          triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
          if (w.type === HDSegwitP2SHWallet.type || w.type === HDSegwitBech32Wallet.type) {
            // @ts-ignore: Return later to update
            setWalletID(w.getID());
            dispatchNavigate('SavingVault', {
              walletID: w.getID(),
            });
            setIsLoading(false)
          }
    };
  
    return (
        <ScreenLayout showToolbar progress={0} color={[colors.green, colors.green]}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text style={styles.title}>Savings Vault</Text>
                    <Text h4 style={styles.descption}>Savings Vault, commonly known as a ‘hot wallet’, allows you to become the sole owner of your bitcoin, as the saying goes: Not your keys, not your coins. Money stored in this vault will be secured by the main Bitcoin network, not by a third party custodian.
                        {'\n\n'}
                        To create a Savings Vault, you first need to generate your keys: your phone will  create the private key, encrypt it, and store it in a securely in its memory.  It will also create  a backup copy , just in case you lose access to your phone.
                        {'\n\n'}
                        The backup looks like a series of 12 words. You need to write down them on a piece of paper and store them in a secure location(s).
                    </Text>
                </View>
                <Button text="Generate Private Key" onPress={createWallet} loading={isLoading} style={styles.button} textStyle={styles.btnText} />
            </View>
        </ScreenLayout>
    )
}
