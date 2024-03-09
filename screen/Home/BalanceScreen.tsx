import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useMeQuery from '../../apollo/hooks/useMeQuery';

const BalanceScreen = ({ navigation }) => {
  const { data, loading, error } = useMeQuery();

  const handleLogout = async () => {
    try {
      // Clear authToken from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      // Navigate to CaptchaAuth screen
      navigation.replace('CaptchaAuth');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (loading) return <Text style={{ marginHorizontal: 16 }}>Loading...</Text>;
  if (error) {
    return <Text style={{ marginHorizontal: 16 }}>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1, marginTop: 30, marginHorizontal: 16 }}>
      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout} style={{ alignSelf: 'flex-end', marginBottom: 30 }}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
      {data && (
        <View>
          {data.me.defaultAccount.wallets.map(wallet => (
            <View key={wallet.id} style={{ marginBottom: 20 }}>
              <Text>Wallet ID: {wallet.id}</Text>
              <Text>Currency: {wallet.walletCurrency}</Text>
              <Text>Balance: {wallet.balance}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default BalanceScreen;
