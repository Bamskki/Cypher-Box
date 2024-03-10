import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import InputField from '../../components/InputField';
import { useCreateLNInvoice } from '../../apollo/api';
import Button from '../../components/Button';

const ReceiveDetail = ({ navigation, route }) => {
  const { method, userData } = route.params;
  const [amount, setAmount] = useState<string>();
  const [memo, setMemo] = useState<string>();

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const [createLNInvoice, { loading }] = useCreateLNInvoice();

  const handleCreateInvoice = async () => {
    if(!amount) {
      Alert.alert('Error', 'Please enter an amount');
      return;
    }
    try {
      console.log('amount: ', amount)
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
      console.log('invoice: ', invoice)
      if (errors.length > 0) {
        Alert.alert('Error', errors[0].message);
      } else {
        if(method == 'invoice') {
          navigation.navigate('QRView', { invoice, qrView: false });
        } else {
          navigation.navigate('QRView', { invoice, qrView: true });
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
    </View>
  );
};

export default ReceiveDetail;
