import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetBalanceQuery from '../../apollo/hooks/useGetBalanceQuery';
import Button from '../../components/Button';

const BalanceScreen = ({ navigation }) => {
  const { data, loading, error } = useGetBalanceQuery();

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
          <View key={data.me.defaultAccount.wallets[0].id} style={{ marginBottom: 20 }}>
            <Text>Wallet ID: {data.me.defaultAccount.wallets[0].id}</Text>
            <Text>Currency: {data.me.defaultAccount.wallets[0].walletCurrency}</Text>
            <Text>Balance: {data.me.defaultAccount.wallets[0].balance}</Text>
          </View>
        </View>
      )}
      <Button
        title="Receive Lightning"
        onPress={() => navigation.navigate('ReceiveMethod', { userData: data?.me })}
        disabled={loading}
      />
    </View>
  );
};

export default BalanceScreen;
