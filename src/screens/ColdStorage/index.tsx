import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Alert, Image, Keyboard, LayoutAnimation, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Icon } from 'react-native-elements';
import SimpleToast from "react-native-simple-toast";

import styles from "./styles";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { ProgressBar, SavingVault } from "@Cypher/components";
import { colors } from "@Cypher/style-guide";
import { dispatchNavigate } from "@Cypher/helpers";
import Clipboard from '@react-native-clipboard/clipboard'
import loc, { formatBalance, formatBalanceWithoutSuffix } from "../../../loc";
import { BitcoinUnit, Chain } from "../../../models/bitcoinUnits";
import NetworkTransactionFees, { NetworkTransactionFee } from '../../../models/networkTransactionFees';
import triggerHapticFeedback, { HapticFeedbackTypes } from '../../../blue_modules/hapticFeedback';
import { HDSegwitBech32Wallet, MultisigHDWallet, WatchOnlyWallet } from "../../../class";
import { BlueStorageContext } from "../../../blue_modules/storage-context";
import { AbstractHDElectrumWallet } from "../../../class/wallets/abstract-hd-electrum-wallet";
import { btcToSatoshi } from "../../../blue_modules/currency";
import BigNumber from "bignumber.js";
import useAuthStore from "@Cypher/stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { btc } from "@Cypher/helpers/coinosHelper";
import { scanQrHelper } from "../../../helpers/scan-qr";
import DeeplinkSchemaMatch from "../../../class/deeplink-schema-match";
import { ProgressBarColdStorage, ProgressBar5, Check } from "@Cypher/assets/images";

const prompt = require('../../../helpers/prompt');
const btcAddressRx = /^[a-zA-Z0-9]{26,35}$/;

interface Props {
    route: any;
    navigation: any;
}

export const shortenAddress = (address: string) => {
    // Take the first 6 characters
    const start = address.substring(0, 6);
    // Take the last 6 characters
    const end = address.substring(address.length - 6);
    // Combine with three dots in the middle
    return `${start}...${end}`;
};


export default function ColdStorage({ route, navigation }: Props) {
    const {wallet, vaultTab, utxo, ids, maxUSD, inUSD, total, matchedRate, capsulesData = null, to = null, vaultSend, title, type} = route?.params;
    const [usd, setUSD] = useState('40');
    const [sats, setSats] = useState('100K sats  ~$' + usd);
    const [address, setAddress] = useState();
    const [networkFees, setNetworkFees] = useState(5000);
    const [serviceFees, setServiceFees] = useState('~ 400 sats');
    const [totalFees, setTotalFees] = useState('~ 5400 sats (~0.2%)');
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [destinationAddress, setDestinationAddress] = useState('');
    // style = { styles.pasteAddress }
    const [visibleSelection, setVisibleSelection] = useState(false);
    const [selectedFees, setSelectedFees] = useState(1);
    // const [feeSats, setFeeSats] = useState(5000);
    const [networkFee, setNetworkFee] = useState(null);
    const [customFee, setCustomFee] = useState(null);
    const [isCustomFee, setIsCustomFee] = useState(false);
    const [feePrecalc, setFeePrecalc] = useState({ current: null, slowFee: null, mediumFee: null, fastestFee: null });
    const [networkTransactionFees, setNetworkTransactionFees] = useState(new NetworkTransactionFee(3, 2, 1));
    const [networkTransactionFeesIsLoading, setNetworkTransactionFeesIsLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [feeUnit, setFeeUnit] = useState();
    const [amountUnit, setAmountUnit] = useState(BitcoinUnit.BTC);
    const [isTransactionReplaceable, setIsTransactionReplaceable] = useState(false);
    const [transactionMemo, setTransactionMemo] = useState('');
    const [payjoinUrl, setPayjoinUrl] = useState(null);
    const [dumb, setDumb] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const [changeAddress, setChangeAddress] = useState();
    const { wallets, setSelectedWalletID, sleep, txMetadata, saveToDisk, isElectrumDisabled } = useContext(BlueStorageContext);
    const { walletID, coldStorageWalletID } = useAuthStore();
    const { navigate } = useNavigation();


    const [feeUSD, setFeeUSD] = useState(1);
    const [feesEditable, setFeesEditable] = useState(false);
    const [satsEditable, setSatsEditable] = useState(false);
    const fUtxo = utxo.filter(({ txid, vout }) => ids.includes(`${txid}:${vout}`));
    const balance = fUtxo ? fUtxo.reduce((prev, curr) => prev + curr.value, 0) : wallet?.getBalance();
    const allBalance = formatBalanceWithoutSuffix(balance, BitcoinUnit.BTC, true);
    const balanceWallet = !wallet?.hideBalance && formatBalance(Number(wallet?.getBalance()), wallet?.getPreferredBalanceUnit(), true);
    const balanceWithoutSuffix = !wallet?.hideBalance && formatBalanceWithoutSuffix(Number(wallet?.getBalance()), wallet?.getPreferredBalanceUnit(), true);
    const primaryColor = vaultTab ? colors?.blueText : colors.green

    const formatFee = fee => formatBalance(fee, feeUnit, true);

    const feeRate = useMemo(() => {
        if (customFee) return customFee;
        if (feePrecalc.slowFee === null) return '1'; // wait for precalculated fees
        let initialFee;
        if (feePrecalc.fastestFee !== null) {
          initialFee = String(networkTransactionFees.fastestFee);
        } else if (feePrecalc.mediumFee !== null) {
          initialFee = String(networkTransactionFees.mediumFee);
        } else {
          initialFee = String(networkTransactionFees.slowFee);
        }
        return initialFee;
    }, [customFee, feePrecalc, networkTransactionFees]);
    
    useEffect(() => {
      if(to){
        setDestinationAddress(to)
      }
    }, [to])

    useEffect(() => {
        if (!wallet) return;
        setSelectedWalletID(wallet.getID());
    
        // reset other values
        setChangeAddress(null);
        setIsTransactionReplaceable(wallet.type === HDSegwitBech32Wallet.type);
    
        // update wallet UTXO
        wallet
          .fetchUtxo()
          .then(() => {
            // we need to re-calculate fees
            setDumb(v => !v);
          })
          .catch(e => console.log('fetchUtxo error', e));
    }, [wallet]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        // check if we have a suitable wallet
        const suitable = wallets.filter(w => w.chain === Chain.ONCHAIN && w.allowSend());
        if (suitable.length === 0 && type !== "TOPUP") {
        Alert.alert(loc.errors.error, loc.send.details_wallet_before_tx);
        return;
        }
        console.log('vaultTabvaultTabvaultTab: ', vaultTab)
        const newWallet = vaultTab ? ((coldStorageWalletID && wallets.find(w => w.getID() === coldStorageWalletID)) || suitable[0]) : ((walletID && wallets.find(w => w.getID() === walletID)) || suitable[0]);
        setFeeUnit(newWallet.getPreferredBalanceUnit());
        setAmountUnit(newWallet.preferredBalanceUnit); // default for whole screen

        // we are ready!
        setIsLoading(false);

        // load cached fees
        AsyncStorage.getItem(NetworkTransactionFee.StorageKey)
        .then(res => {
            const fees = JSON.parse(res);
            if (!fees?.fastestFee) return;
            setNetworkTransactionFees(fees);
        })
        .catch(e => console.log('loading cached recommendedFees error', e));

        // load fresh fees from servers

        setNetworkTransactionFeesIsLoading(true);
        NetworkTransactionFees.recommendedFees()
        .then(async fees => {
            if (!fees?.fastestFee) return;
            setNetworkTransactionFees(fees);
            await AsyncStorage.setItem(NetworkTransactionFee.StorageKey, JSON.stringify(fees));
        })
        .catch(e => console.log('loading recommendedFees error', e))
        .finally(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setNetworkTransactionFeesIsLoading(false);
        });
  }, [vaultTab, coldStorageWalletID, walletID, type]); // eslint-disable-line react-hooks/exhaustive-deps

  const getChangeAddressFast = () => {
      if (changeAddress) return changeAddress; // cache
  
      let change;
      if (WatchOnlyWallet.type === wallet.type && !wallet.isHd()) {
        // plain watchonly - just get the address
        change = wallet.getAddress();
      } else if (WatchOnlyWallet.type === wallet.type || wallet instanceof AbstractHDElectrumWallet) {
        change = wallet._getInternalAddressByIndex(wallet.getNextFreeChangeAddressIndex());
      } else {
        // legacy wallets
        change = wallet.getAddress();
      }
  
      return change;
  };
  
  useEffect(() => {
      if (!wallet) return; // wait for it
      const fees = networkTransactionFees;
      const change = getChangeAddressFast();
      const requestedSatPerByte = Number(feeRate);
      const lutxo = utxo || wallet.getUtxo();
      let frozen = 0;
      if (!utxo) {
        // if utxo is not limited search for frozen outputs and calc it's balance
        frozen = wallet
          .getUtxo(true)
          .filter(o => !lutxo.some(i => i.txid === o.txid && i.vout === o.vout))
          .reduce((prev, curr) => prev + curr.value, 0);
      }
  
      const options = [
        { key: 'current', fee: requestedSatPerByte },
        { key: 'slowFee', fee: fees.slowFee },
        { key: 'mediumFee', fee: fees.mediumFee },
        { key: 'fastestFee', fee: fees.fastestFee },
      ];
  
      const newFeePrecalc = { ...feePrecalc };
  
      for (const opt of options) {
        let targets = [];
        let addresses = [{ address: destinationAddress, key: String(Math.random()), amount: Number(inUSD).toFixed(4), amountSats: parseInt(Number(inUSD) / Number(matchedRate) * 100000000) }]
        for (const transaction of addresses) {
          if (transaction.amount === BitcoinUnit.MAX) {
            // single output with MAX
            targets = [{ address: transaction.address }];
            break;
          }
          const value = parseInt(transaction.amountSats, 10);
          if (value > 0) {
            targets.push({ address: transaction.address, value });
          } else if (transaction.amount) {
            if (btcToSatoshi(transaction.amount) > 0) {
              targets.push({ address: transaction.address, value: btcToSatoshi(transaction.amount) });
            }
          }
        }
  
        // if targets is empty, insert dust
        if (targets.length === 0) {
          targets.push({ address: '36JxaUrpDzkEerkTf1FzwHNE1Hb7cCjgJV', value: 546 });
        }
  
        // replace wrong addresses with dump
        targets = targets.map(t => {
          if (!wallet.isAddressValid(t.address)) {
            return { ...t, address: '36JxaUrpDzkEerkTf1FzwHNE1Hb7cCjgJV' };
          } else {
            return t;
          }
        });
  
        let flag = false;
        while (true) {
          try {
            const { fee } = wallet.coinselect(lutxo, targets, opt.fee, change);
  
            newFeePrecalc[opt.key] = fee;
            break;
          } catch (e) {
            if (e.message.includes('Not enough') && !flag) {
              flag = true;
              // if we don't have enough funds, construct maximum possible transaction
              targets = targets.map((t, index) => (index > 0 ? { ...t, value: 546 } : { address: t.address }));
              continue;
            }
  
            newFeePrecalc[opt.key] = null;
            break;
          }
        }
      }
  
      setFeePrecalc(newFeePrecalc);
    }, [wallet, networkTransactionFees, utxo, destinationAddress, feeRate, dumb]); // eslint-disable-line react-hooks/exhaustive-deps

    const createTransaction = async () => {
        Keyboard.dismiss();
        setIsLoading(true);
        const requestedSatPerByte = feeRate;
        let addresses = [{ address: destinationAddress, key: String(Math.random()), amount: inUSD == 0 ? 0 : Number(inUSD || 0).toFixed(4), amountSats: parseInt(Number(inUSD || 0) / Number(matchedRate || 0) * 100000000) }]
        for (const [index, transaction] of addresses.entries()) {
          console.log('balance: ', balance, ', inUSD: ', inUSD, ', transaction.amountSats: ', transaction.amountSats, parseInt(Number(inUSD) / Number(matchedRate) * 100000000))
          let error;
          if (!transaction.amount || transaction.amount < 0 || parseFloat(transaction.amount) === 0) {
            error = loc.send.details_amount_field_is_not_valid;
            console.log('validation error');
          } else if (parseFloat(transaction.amountSats) <= 500) {
            error = loc.send.details_amount_field_is_less_than_minimum_amount_sat;
            console.log('validation error');
          } else if (!requestedSatPerByte || parseFloat(requestedSatPerByte) < 1) {
            error = loc.send.details_fee_field_is_not_valid;
            console.log('validation error');
          } else if (!transaction.address) {
            error = loc.send.details_address_field_is_not_valid;
            console.log('validation error');
          } else if (balance - transaction.amountSats < 0) {
            // first sanity check is that sending amount is not bigger than available balance
            error = loc.send.details_total_exceeds_balance;
            console.log('validation error');
          } else if (transaction.address) {
            const address = transaction.address.trim().toLowerCase();
            if (address.startsWith('lnb') || address.startsWith('lightning:lnb')) {
              error = loc.send.provided_address_is_invoice;
              console.log('validation error');
            }
          }
    
          if (!error) {
            if (!wallet.isAddressValid(transaction.address)) {
              console.log('validation error');
              error = loc.send.details_address_field_is_not_valid;
            }
          }
    
          if (error) {
            setIsLoading(false);
            Alert.alert(loc.errors.error, error);
            triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
            return;
          }
        }
    
        try {
          await createPsbtTransaction();
        } catch (Err) {
          setIsLoading(false);
          Alert.alert(loc.errors.error, Err.message);
          triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
        }
    };

    const getChangeAddressAsync = async () => {
        if (changeAddress) return changeAddress; // cache
    
        let change;
        if (WatchOnlyWallet.type === wallet.type && !wallet.isHd()) {
          // plain watchonly - just get the address
          change = wallet.getAddress();
        } else {
          // otherwise, lets call widely-used getChangeAddressAsync()
          try {
            change = await Promise.race([sleep(2000), wallet.getChangeAddressAsync()]);
          } catch (_) {}
    
          if (!change) {
            // either sleep expired or getChangeAddressAsync threw an exception
            if (wallet instanceof AbstractHDElectrumWallet) {
              change = wallet._getInternalAddressByIndex(wallet.getNextFreeChangeAddressIndex());
            } else {
              // legacy wallets
              change = wallet.getAddress();
            }
          }
        }
    
        if (change) setChangeAddress(change); // cache
    
        return change;
      };
    
    const createPsbtTransaction = async () => {
        const change = await getChangeAddressAsync();
        const requestedSatPerByte = Number(feeRate);
        const lutxo = utxo || wallet.getUtxo();
        console.log({ requestedSatPerByte, lutxo: lutxo.length });

        const targets = [];
        let addresses = [{ address: destinationAddress, key: String(Math.random()), amount: Number(inUSD).toFixed(4), amountSats: parseInt(Number(inUSD) / Number(matchedRate) * 100000000) }]
        for (const transaction of addresses) {
          if (transaction.amount === BitcoinUnit.MAX) {
            // output with MAX
            targets.push({ address: transaction.address });
            continue;
          }
          const value = parseInt(transaction.amountSats, 10);
          if (value > 0) {
            targets.push({ address: transaction.address, value });
          } else if (transaction.amount) {
            if (btcToSatoshi(transaction.amount) > 0) {
              targets.push({ address: transaction.address, value: btcToSatoshi(transaction.amount) });
            }
          }
        }
    
        console.log('targets: ', targets)
        console.log('requestedSatPerByte: ', requestedSatPerByte)
        console.log('change: ' ,change)

        // coinThresholdClickHandler.log('lutxo: ', lutxo)
        const { tx, outputs, psbt, fee } = wallet.createTransaction(
          lutxo,
          targets,
          requestedSatPerByte,
          change,
          isTransactionReplaceable ? HDSegwitBech32Wallet.defaultRBFSequence : HDSegwitBech32Wallet.finalRBFSequence,
        );
    
        // if (tx && routeParams.launchedBy && psbt) {
        //   console.warn('navigating back to ', routeParams.launchedBy);
        //   navigation.navigate(routeParams.launchedBy, { psbt });
        // }
    
        if (wallet.type === WatchOnlyWallet.type) {
          // watch-only wallets with enabled HW wallet support have different flow. we have to show PSBT to user as QR code
          // so he can scan it and sign it. then we have to scan it back from user (via camera and QR code), and ask
          // user whether he wants to broadcast it
          const selectedFee = options.find(item => item.active);
          navigation.navigate('HardwareWalletTransaction', {
            memo: transactionMemo,
            fromWallet: wallet,
            psbt,
            sats: parseInt(Number(inUSD) / Number(matchedRate) * 100000000),
            inUSD: Number(inUSD).toFixed(4),
            sentFrom: address,
            destinationAddress: destinationAddress,
            networkFees: isCustomFee ? customFee : selectedFee?.fee,
            serviceFees: serviceFees,
            totalFees: totalFees,
            isCustomFee: isCustomFee,
            walletID: wallet.getID(),
          });
          setIsLoading(false);
          return;
        }
    
        if (wallet.type === MultisigHDWallet.type) {
        //   navigation.navigate('PsbtMultisig', {
        //     memo: transactionMemo,
        //     psbtBase64: psbt.toBase64(),
        //     walletID: wallet.getID(),
        //     launchedBy: routeParams.launchedBy,
        //   });
          setIsLoading(false);
          return;
        }
    
        txMetadata[tx.getId()] = {
          txhex: tx.toHex(),
          memo: transactionMemo,
        };
        await saveToDisk();
    
        let recipients = outputs.filter(({ address }) => address !== change);
    
        console.log('recipients: ', recipients)
        if (recipients.length === 0) {
          // special case. maybe the only destination in this transaction is our own change address..?
          // (ez can be the case for single-address wallet when doing self-payment for consolidation)
          recipients = outputs;
        }
        const selectedFee = options.find(item => item.active);

        let data = {
            sats: parseInt(Number(inUSD) / Number(matchedRate) * 100000000),
            coinsSelected: ids.length,
            inUSD: Number(inUSD).toFixed(4),
            sentFrom: address,
            destinationAddress: destinationAddress,
            networkFees: isCustomFee ? customFee : selectedFee?.fee,
            serviceFees: serviceFees,
            isCustomFee: isCustomFee,
            totalFees: totalFees,
            note: transactionMemo,
            createTransaction: createTransaction,
            memo: transactionMemo,
            targets: [{ address, value: parseInt(Number(inUSD) / Number(matchedRate) * 100000000) }],
            walletID: wallet.getID(),
            vaultTab: vaultTab,
            satoshiPerByte: requestedSatPerByte,
            payjoinUrl,
            tx: tx.toHex(),
            recipients,
            psbt,
            capsulesData,
            to,
            vaultSend,
            fee: new BigNumber(fee).dividedBy(100000000).toNumber(),          
        }
        console.log('data: ', data)
        dispatchNavigate('ConfirmTransction', {
            data: data,
        });
        // dispatchNavigate('ConfirmTransction', {
        //     fee: new BigNumber(fee).dividedBy(100000000).toNumber(),
        //     memo: transactionMemo,
        //     walletID: wallet.getID(),
        //     tx: tx.toHex(),
        //     recipients,
        //     satoshiPerByte: requestedSatPerByte,
        //     psbt,
        // });
        setIsLoading(false);
    };
    

    const nextClickHandler = async () => {
        if(!destinationAddress || destinationAddress.length == 0){
            SimpleToast.show("Please Enter Destination Address", SimpleToast.SHORT)
            return
        }
        if(!isCheck && title){
            SimpleToast.show("Please verify the destination address", SimpleToast.SHORT)
            return;
        }
        if (btcAddressRx.test(destinationAddress) || destinationAddress.startsWith('bc1') || destinationAddress.startsWith('BC1')) {
            createTransaction()
            // const selectedFee = options.find(item => item.active);
            // const requestedSatPerByte = Number(feeRate);
            // const lutxo = utxo || wallet.getUtxo();
            // const change = await getChangeAddressAsync();
            // const targets = [{ address, value: parseInt(Number(inUSD) / Number(matchedRate) * 100000000) }]

            // const { tx, outputs, psbt, fee } = wallet.createTransaction(
            //     lutxo,
            //     targets,
            //     requestedSatPerByte,
            //     change,
            //     isTransactionReplaceable ? HDSegwitBech32Wallet.defaultRBFSequence : HDSegwitBech32Wallet.finalRBFSequence,
            // );
        
            // txMetadata[tx.getId()] = {
            // txhex: tx.toHex(),
            // memo: transactionMemo,
            // };
            // await saveToDisk();
        
            // let recipients = outputs.filter(({ address }) => address !== change);
          
            // if (recipients.length === 0) {
            //     // special case. maybe the only destination in this transaction is our own change address..?
            //     // (ez can be the case for single-address wallet when doing self-payment for consolidation)
            //     recipients = outputs;
            // }
          
            // let data = {
            //     sats: parseInt(Number(inUSD) / Number(matchedRate) * 100000000),
            //     coinsSelected: ids.length,
            //     inUSD: Number(inUSD).toFixed(4),
            //     sentFrom: address,
            //     destinationAddress: destinationAddress,
            //     networkFees: isCustomFee ? customFee : selectedFee?.fee,
            //     serviceFees: serviceFees,
            //     isCustomFee: isCustomFee,
            //     totalFees: totalFees,
            //     note: transactionMemo,
            //     createTransaction: createTransaction,
            //     memo: transactionMemo,
            //     targets: [{ address, value: parseInt(Number(inUSD) / Number(matchedRate) * 100000000) }],
            //     walletID: wallet.getID(),
            //     satoshiPerByte: requestedSatPerByte,
            //     payjoinUrl,
            //     tx: tx.toHex(),
            //     recipients,
            //     psbt,
            //     fee: new BigNumber(fee).dividedBy(100000000).toNumber(),          
            // }
            // console.log('data: ', data)
            // dispatchNavigate('ConfirmTransction', {
            //     data: data,
            // });
        } else {
            SimpleToast.show("Destination Address is not valid", SimpleToast.SHORT)
        }
    }

    const editAmountClickHandler = () => {
        navigation.push('EditAmount', {isEdit: true, vaultTab, wallet, utxo, ids, maxUSD, inUSD, total, matchedRate, capsulesData, to, vaultSend, setSatsEdit: setSats_ });
    }

    const editFeesClickHandler = () => {
        setVisibleSelection(true);
    }

    const setSats_ = (sats: any, usd: any) => {
        setUSD(usd);
        const value = Number(sats) / 10000;
        setSats(value + 'K sats ~$' + usd);
        setSatsEditable(true);
    }

    const setNetFee_ = (sats: any, usd: any) => {
        setFeeUSD(usd);
        setNetworkFees(sats);
        setFeesEditable(true);
    }

    const selectFeesClickHandler = (item: any) => {
        console.log("🚀 ~ selectFeesClickHandler ~ index:", item);
        setVisibleSelection(false);
        setSelectedFees(item);
        setFeesEditable(true);
        if (index === 3) {
            dispatchNavigate('FeeRate', {
                networkFees: networkFees,
                feeUSD: feeUSD,
                setNetFee_: setNetFee_
            });
        }
    }

    const getCurrentFee = () => {
        const selectedFee = options.find(item => item.active);
        if(selectedFee && !isCustomFee){
            return {fee: selectedFee.fee, label:  selectedFee?.label}
        } else {
            return "Customize";
        }
    }

    const getNetworkFees = () => {
        const selectedFee = options.find(item => item.active);
        console.log('selectedFee: ', selectedFee)
        if(selectedFee && !isCustomFee){
            if(selectedFee.fee){
                setNetworkFee(selectedFee.fee)
            } else if(selectedFee.rate){
                setNetworkFee(Number(selectedFee.rate) * Number(matchedRate) * btc(1))
            }
            return selectedFee?.label
        } else {
            return "Customize";
        }
    }

    const obtainWalletAddress = async () => {
        let newAddress;
        try {
            if (!isElectrumDisabled) newAddress = await Promise.race([wallet.getAddressAsync(), sleep(1000)]);
        } catch (_) {}
        if (newAddress === undefined) {
            // either sleep expired or getAddressAsync threw an exception
            console.warn('either sleep expired or getAddressAsync threw an exception');
            newAddress = wallet._getExternalAddressByIndex(wallet.getNextFreeAddressIndex());
        } else {
            saveToDisk(); // caching whatever getAddressAsync() generated internally
        }
        console.log('newAddress: ', newAddress)
        setAddress(newAddress);
    }

    useFocusEffect(
        useCallback(() => {
            if (wallet) {
                obtainWalletAddress();
            }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [wallet]),
    );


    const coinThresholdClickHandler = () => { }

    const pasteClickHandler = async () => {
        const text = await Clipboard.getString();
        console.log("🚀 ~ pasteClickHandler ~ text:", text)
        setDestinationAddress(text);
    }

    const processAddressData = data => {
        // setIsLoading(true);
        console.log('data: ', data)
        if (!data.replace) {
          // user probably scanned PSBT and got an object instead of string..?
        //   setIsLoading(false);
          return Alert.alert(loc.errors.error, loc.send.details_address_field_is_not_valid);
        }
    
        const dataWithoutSchema = data.replace('bitcoin:', '').replace('BITCOIN:', '');
        if (wallet.isAddressValid(dataWithoutSchema)) {
            console.log('dataWithoutSchema: ', dataWithoutSchema)
            setDestinationAddress(dataWithoutSchema)
            //   setIsLoading(false);
            return;
        }
    
        let address = '';
        let options;
        try {
          if (!data.toLowerCase().startsWith('bitcoin:')) data = `bitcoin:${data}`;
          const decoded = DeeplinkSchemaMatch.bip21decode(data);
          address = decoded.address;
          options = decoded.options;
        } catch (error) {
          data = data.replace(/(amount)=([^&]+)/g, '').replace(/(amount)=([^&]+)&/g, '');
          const decoded = DeeplinkSchemaMatch.bip21decode(data);
          decoded.options.amount = 0;
          address = decoded.address;
          options = decoded.options;
        }
    
        console.log('options', options);
        if (btcAddressRx.test(address) || address.startsWith('bc1') || address.startsWith('BC1')) {
            setDestinationAddress(address);
            console.log('addresss: ', address)
            setTransactionMemo(options.label || options.message);
            setAmountUnit(BitcoinUnit.BTC);
            setPayjoinUrl(options.pj || '');
            // RN Bug: contentOffset gets reset to 0 when state changes. Remove code once this bug is resolved.
        } else {
            SimpleToast.show("Bitcoin Address is not valid", SimpleToast.SHORT)
        }
        // setIsLoading(false);
    };
    

    const nf = networkTransactionFees;
    const options = [
        {
            label: loc.send.fee_fast,
            time: loc.send.fee_10m,
            fee: feePrecalc.fastestFee,
            rate: nf.fastestFee,
            active: Number(feeRate) === nf.fastestFee,
        },
        {
            label: loc.send.fee_medium,
            time: loc.send.fee_3h,
            fee: feePrecalc.mediumFee,
            rate: nf.mediumFee,
            active: Number(feeRate) === nf.mediumFee,
            disabled: nf.mediumFee === nf.fastestFee,
        },
        {
            label: loc.send.fee_slow,
            time: loc.send.fee_1d,
            fee: feePrecalc.slowFee,
            rate: nf.slowFee,
            active: Number(feeRate) === nf.slowFee,
            disabled: nf.slowFee === nf.mediumFee || nf.slowFee === nf.fastestFee,
        },
    ];

    return (
        <ScreenLayout showToolbar disableScroll>
            <View style={styles.container}>
                <Text style={styles.title} center>{title ? title : to ? "Top-up Transaction" : "Construct transaction"}</Text>
                {/* <SavingVault
                    container={styles.savingVault}
                    innerContainer={styles.savingVault}
                    shadowTopBottom={styles.savingVault}
                    shadowBottomBottom={styles.savingVault}
                    bitcoinText={styles.bitcoinText}
                    imageStyle={styles.bitcoinImage}
                    titleStyle={styles.titleVault}
                    title="Hot Savings"
                    bitcoinValue={balanceWallet}
                    inDollars={`$${(Number(balanceWithoutSuffix) * Number(matchedRate)).toFixed(2)}`}    
                    // onPress={savingVaultClickHandler}
                /> */}
                <View style={styles.recipientView}>
                    {/* <TouchableOpacity onPress={coinThresholdClickHandler}> */}
                    {to ?
                      <View>
                        <Text bold style={styles.coinselected}>Capsules selected: {ids.length}</Text>
                          {capsulesData && capsulesData.map((item, i) => (
                            <View style={styles.tabs}>
                              <ProgressBar image={vaultTab ? ProgressBarColdStorage : ProgressBar5} />
                              <View style={{ width: '80%', alignItems: 'flex-end' }}>
                              <Text bold style={styles.coinselected}>Total: {formatBalance(item?.value, BitcoinUnit.BTC, true)}</Text>
                              </View>
                            </View>
                          ))}
                      </View>
                    :
                      <Text bold style={styles.coinselected}>Coins selected: {ids.length} coins</Text>
                    }
                    {/* </TouchableOpacity> */}
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>{title == "Transfer To Cold Vault" ? "Transfer amount" : to ? "Top-up amount" : "Recipient will get:"}</Text>
                            <Text bold style={[styles.value, vaultTab && {color: colors.blueText}]}>{((Number(inUSD || 0) / Number(matchedRate || 0) || 0) * 100000000).toFixed(2) + ' sats ~$' + Number(inUSD).toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity style={[styles.editAmount, { borderColor: satsEditable ? primaryColor : '#B6B6B6' }]} onPress={editAmountClickHandler}>
                            <Text>Edit amount</Text>
                        </TouchableOpacity>
                    </View>
                    {address &&
                        <View style={styles.priceView}>
                            <View>
                                <Text style={styles.recipientTitle}>Sent from:</Text>
                                <Text style={styles.fees}>Vault address: {shortenAddress(address)}</Text>
                            </View>
                        </View>
                    }
                    {to ?
                        <View style={styles.priceView}>
                          <View>
                              <Text style={styles.recipientTitle}>Sent to:</Text>
                              {!vaultSend &&
                                <Text style={{...styles.fees, color: colors.pink.main}} italic>My Coinos Checking Account</Text>
                              }
                              <Text style={{...styles.fees, color: vaultSend ? colors.blueText : colors.pink.main}} italic>{vaultSend ? "Vault Address: " + shortenAddress(to) : "Deposit address: " + shortenAddress(to)}</Text>
                          </View>
                        </View>
                    :
                      <View style={styles.pasteview}>
                          <TouchableOpacity style={[styles.button, { borderColor: destinationAddress?.length > 0 ? primaryColor : '#B6B6B6' }]} onPress={pasteClickHandler}>
                              {destinationAddress ?
                                  <Text h3 bold>{destinationAddress}</Text>
                                  :
                                  <Text bold>Paste destination address</Text>
                              }
                          </TouchableOpacity>
                          <TouchableOpacity onPress={async () => {
                              // await scanButtonTapped();
                              Keyboard.dismiss();
                              // @ts-ignore: Fix later
                              scanQrHelper(navigate, "ColdStorage", { wallet, utxo, ids, inUSD, total, matchedRate }).then(processAddressData);
                          }}>
                              <Image source={require("../../../img/scan-new.png")} style={styles.qrcode} resizeMode="contain" />
                          </TouchableOpacity>
                      </View>
                    }
                    {title &&
                      <>
                        <Text style={[{marginTop: 20, fontSize: 14}]}>⚠️ DO NOT transfer to any of these addresses without verifying their authenticity from your hardware device! </Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsCheck(!isCheck)} style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 1, alignSelf: 'flex-start' }}>
                          <View style={styles.checkView}>
                            {isCheck && <Image source={Check} style={styles.checkImage} resizeMode='contain' /> }
                          </View>
                          <Text style={{...styles.fees, color: colors.white, marginLeft: 10}} italic>I verified this address</Text>
                        </TouchableOpacity>
                      </>
                    }
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Network fee:</Text>
                            
                            <Text bold style={styles.fees}>~ {feePrecalc.current ? feePrecalc.current + ' sats' : feeRate + " sats/vByte"}</Text>
                            {/* <Text bold style={styles.fees}>~ {isCustomFee ? customFee + " sats/vByte" :  getCurrentFee().fee + " sats"}</Text> */}
                        </View>
                        {visibleSelection &&
                            <View style={[styles.feesDropDown, vaultTab && {borderColor: colors.blueText}]}>
                                {options.map((item, index) => {
                                    console.log('item: ', item)
                                    if(item?.fee){
                                        return(
                                            <TouchableOpacity disabled={item.disabled} style={[index % 2 === 0 ? styles.first : styles.second, item.disabled && {opacity: 0.8} ]} onPress={() => {
                                                setFeePrecalc(fp => ({ ...fp, current: item.fee }));
                                                setCustomFee(item?.rate.toString());
                                                setVisibleSelection(false);
                                                setFeesEditable(true);
                                                setIsCustomFee(false);
                                            }}>
                                                {/* <Text bold style={item.active ? StyleSheet.flatten([styles.border, { paddingHorizontal: 12.5 }]) : {}}>{item.label +' ('+ formatFee(item.fee) + ' ~ ' + item.rate + ' ' + loc.units.sat_vbyte+")"}</Text> */}
                                                <Text bold style={item.active ? StyleSheet.flatten([styles.border, { paddingHorizontal: 12.5 }]) : {}}>{item.label +' (' + item.rate + ' ' + loc.units.sat_vbyte+")"}</Text>
                                            </TouchableOpacity>
                                        )    
                                    } else {
                                        return(
                                            <TouchableOpacity disabled={item.disabled} style={[index % 2 === 0 ? styles.first : styles.second]} onPress={() => {
                                                setFeePrecalc(fp => ({ ...fp, current: item.fee }));
                                                setCustomFee(item?.rate.toString());
                                                setVisibleSelection(false);
                                                setFeesEditable(true);
                                                setIsCustomFee(false);
                                            }}>
                                                <Text bold style={item.active ? StyleSheet.flatten([styles.border, { paddingHorizontal: 12.5 }]) : {}}>{item.label +' ('+ item.rate + loc.units.sat_vbyte+")"}</Text>
                                            </TouchableOpacity>
                                        )    
                                    }
                                })}
                                <TouchableOpacity style={styles.fourth} onPress={async () => {
                                    dispatchNavigate('FeeRate', {
                                        setCustomFee: f => {
                                            setCustomFee(f);
                                            setIsCustomFee(true);
                                        },
                                        wallet, utxo, ids, inUSD, total, matchedRate
                                    })

                                    setVisibleSelection(false)
                                }}>
                                    <Text bold style={selectedFees === 3 ? StyleSheet.flatten([styles.border, { paddingHorizontal: 20 }]) : {}}>Customize</Text>
                                </TouchableOpacity> 
                            </View>
                        }
                        <TouchableOpacity style={[styles.editAmount, { flexDirection: 'row', borderColor: feesEditable ? primaryColor : '#B6B6B6' }]}
                            onPress={editFeesClickHandler}>
                            <Text style={{ marginStart: 10, }}>{isCustomFee ? "Customize" : getCurrentFee().label}</Text>
                            <View style={{ marginHorizontal: 10 }}>
                                <Icon name="chevron-up" type="font-awesome" color={colors.white} size={10} />
                                <Icon name="chevron-down" type="font-awesome" color={colors.white} size={10} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Service fee:</Text>
                            <Text style={styles.fees}>{serviceFees}</Text>
                        </View>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <Text style={styles.recipientTitle}>Total fee:</Text>
                            <Text style={styles.fees}>{totalFees}</Text>
                        </View>
                    </View> */}
                    <TextInput
                        value={transactionMemo}
                        onChangeText={setTransactionMemo}
                        placeholder="Add note"
                        placeholderTextColor={colors.white}
                        style={[styles.noteInput, { borderColor: transactionMemo?.length > 0 ? primaryColor : '#B6B6B6' }]}
                    />
                </View>
                <TouchableOpacity onPress={nextClickHandler} style={[styles.nextBtn, vaultTab && {backgroundColor: colors.blueText}]}>
                    <Text h3>Next</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    )
}
