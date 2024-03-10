import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    async function handleToken() {
      const token = await getToken()
      if (token) {
        navigation.replace('UserBalance');
      } else {
        navigation.replace('CaptchaAuth');
      }        
    }
    handleToken();
  }, [navigation]);
  
  const getToken = async () => {
    const authToken = await AsyncStorage.getItem('authToken');
    return authToken;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CYPHER BANK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust background color as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen;
