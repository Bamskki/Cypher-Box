import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const [token, setToken] = React.useState(undefined);

  useEffect(() => {
    handleToken();
  }, []);

  const handleToken = async () => {
    const authToken = await AsyncStorage.getItem('authToken');
    authToken ? setToken(authToken) : setToken('');
  };

  useEffect(() => {
    if (token && token !== '') {
      navigation.replace('UserBalance');
    } else {
      navigation.replace('CaptchaAuth');
    }
  }, [token, navigation]);
  
  

  console.log('token: ', token)
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
