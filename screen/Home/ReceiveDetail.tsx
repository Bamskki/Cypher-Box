import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import InputField from '../../components/InputField';
import { useCreateLNInvoice, useCreateOnChainAddress } from '../../apollo/api';
import Button from '../../components/Button';

const ReceiveDetail = ({ navigation, route }) => {
  const { method, userData } = route.params;
  const [amount, setAmount] = useState<string>();
  const [memo, setMemo] = useState<string>();
  const [onChainAddress, setOnChainAddress] = useState<string>();

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const [createLNInvoice, { loading }] = useCreateLNInvoice();
  const [createOnChainAddress, { loading: loadingOnChain }] = useCreateOnChainAddress()

  useEffect(() => {
    if(userData?.defaultAccount.wallets[0].id) {
      handleCreateOnChainAddress()
    }
  }, [userData?.defaultAccount.wallets[0].id])

  const handleCreateOnChainAddress = async () => {
    try {
      const { data } = await createOnChainAddress({
        variables: {
          input: {
            walletId: userData?.defaultAccount.wallets[0].id
          },
        },
      })

      const { errors, address } = data.onChainAddressCreate;
      if (errors.length > 0) {
        Alert.alert('Error', errors[0].message);
      } else {
        setOnChainAddress(address)
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      Alert.alert('Error', 'Failed to create address. Please try again.');
    }
  }

  const handleCreateInvoice = async () => {
    if(!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }
    try {
      const { data } = await createLNInvoice({
        variables: {
          input: {
            amount,
            memo,
            recipientWalletId: userData?.defaultAccount.wallets[0].id
          },
        },
      });

      // Handle response
      const { errors, invoice } = data.lnInvoiceCreateOnBehalfOfRecipient;
      if (errors.length > 0) {
        Alert.alert('Error', errors[0].message);
      } else {
        if(method == 'invoice') {
          navigation.navigate('QRView', { qrCode: invoice?.paymentRequest, qrView: false });
        } else {
          navigation.navigate('QRView', { qrCode: invoice?.paymentRequest, qrView: true });
        }
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      Alert.alert('Error', 'Failed to create invoice. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 30, marginHorizontal: 16 }}>
      {method == 'address' &&
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{userData?.username+'@blink.sv'}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(userData?.username+'@blink.sv')}>
            <Text style={{color: 'blue'}}>Copy</Text>
          </TouchableOpacity>
        </View>
      }
      {method == 'qrcode' &&
        <View>
          <InputField
            value={amount}
            placeholder="Amount"
            onChangeText={setAmount}
          />
          <InputField
            value={memo}
            placeholder="Memo"
            onChangeText={setMemo}
          />

          <Button
            title="Show QR Code"
            style={{ marginBottom: 20 }}
            disabled={loading}
            onPress={handleCreateInvoice}
          />
        </View>
      }
      {method == 'invoice' &&
        <View>
          <InputField
            value={amount}
            placeholder="Amount"
            onChangeText={setAmount}
          />
          <InputField
            value={memo}
            placeholder="Memo"
            onChangeText={setMemo}
          />

          <Button
            title="Create Invoice"
            style={{ marginBottom: 20 }}
            disabled={loading}
            onPress={handleCreateInvoice}
          />
        </View>
      }
      <Text style={{textAlign: 'center', marginVertical: 50}}>--- OR ---</Text>
      {method !== 'invoice' && onChainAddress &&
        <>
          <Text style={{textAlign: 'center'}}>Bitcoin address{'\n\n'}
            Top-up your Checking Account from the Bitcoin Network</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
            <Text>{onChainAddress}</Text>
            <TouchableOpacity onPress={() => copyToClipboard(onChainAddress)}>
              <Text style={{color: 'blue'}}>Copy</Text>
            </TouchableOpacity>
          </View>
          {method == 'qrcode' &&
            <Button
              title="Show QR Code"
              style={{ marginBottom: 20 }}
              disabled={loadingOnChain}
              onPress={() => navigation.navigate('QRView', { qrCode: onChainAddress, qrView: true })}
            />
          }
        </>
      }
    </View>
  );
};

export default ReceiveDetail;
