import React, { useContext, useState } from 'react';
import { Alert, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HDSegwitBech32Wallet, WatchOnlyWallet } from '../../class';
import loc from '../../loc';
import { BlueFormLabel, BlueFormMultiInput, BlueSpacing20 } from '../../BlueComponents';
import navigationStyle from '../../components/navigationStyle';
import { BlueStorageContext } from '../../blue_modules/storage-context';
import { useTheme } from '../../components/themes';
import Button from '../../components/Button';
import SafeArea from '../../components/SafeArea';

const WalletsImportSpeed = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [importText, setImportText] = useState();
  const [walletType, setWalletType] = useState();
  const [passphrase, setPassphrase] = useState();
  const { addAndSaveWallet } = useContext(BlueStorageContext);

  const styles = StyleSheet.create({
    root: {
      paddingTop: 40,
      backgroundColor: colors.elevated,
    },
    center: {
      flex: 1,
      marginHorizontal: 16,
      backgroundColor: colors.elevated,
    },
    pathInput: {
      flexDirection: 'row',
      borderWidth: 1,
      borderBottomWidth: 0.5,
      minHeight: 44,
      height: 44,
      alignItems: 'center',
      marginVertical: 8,
      borderRadius: 4,
      paddingHorizontal: 8,
      color: '#81868e',
      borderColor: colors.formBorder,
      borderBottomColor: colors.formBorder,
      backgroundColor: colors.inputBackgroundColor,
    },
  });

  const importMnemonic = async () => {
    setLoading(true);
    try {
      let WalletClass;
      switch (walletType) {
        case HDSegwitBech32Wallet.type:
          WalletClass = HDSegwitBech32Wallet;
          break;
        case WatchOnlyWallet.type:
          WalletClass = WatchOnlyWallet;
          break;
      }

      const wallet = new WalletClass();
      wallet.setSecret(importText);
      if (passphrase) wallet.setPassphrase(passphrase);
      await wallet.fetchBalance();
      navigation.getParent().pop();
      addAndSaveWallet(wallet);
    } catch (e) {
      Alert.alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeArea style={styles.root}>
      <BlueSpacing20 />
      <BlueFormLabel>Mnemonic</BlueFormLabel>
      <BlueSpacing20 />
      <BlueFormMultiInput testID="SpeedMnemonicInput" value={importText} onChangeText={setImportText} />
      <BlueFormLabel>Wallet type</BlueFormLabel>
      <TextInput testID="SpeedWalletTypeInput" value={walletType} style={styles.pathInput} onChangeText={setWalletType} />
      <BlueFormLabel>Passphrase</BlueFormLabel>
      <TextInput testID="SpeedPassphraseInput" value={passphrase} style={styles.pathInput} onChangeText={setPassphrase} />
      <BlueSpacing20 />
      <View style={styles.center}>
        <Button testID="SpeedDoImport" title="Import" onPress={importMnemonic} />
        {loading && <ActivityIndicator />}
      </View>
    </SafeArea>
  );
};

WalletsImportSpeed.navigationOptions = navigationStyle({}, opts => ({ ...opts, statusBarStyle: 'light', title: loc.wallets.import_title }));

export default WalletsImportSpeed;
