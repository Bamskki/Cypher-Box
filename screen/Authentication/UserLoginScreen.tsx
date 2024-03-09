import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { useUserLogin } from '../../apollo/api';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { emailLogin } from '../../api/authApis';

const UserLoginScreen = ({navigation, route}) => {
  const { phone, emailId } = route.params;
  const [code, setCode] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const [userLogin, { loading }] = useUserLogin();

  console.log('route: ', route);
  const handleLogin = async () => {
    setIsLoading(true);
    if(!code) {
      return;
    }
    try {
      if(emailId){
        const response = await emailLogin(emailId, code);
        console.log('response: ', response)
        if(response?.result){
          const authToken = response?.result?.authToken;
          await AsyncStorage.setItem('authToken', authToken);
          navigation.navigate('UserBalance');
          console.log('Login response:', response.data);          
        }
      } else if(phone) {        
        const response = await userLogin({
          variables: {
            input: {
              phone,
              code,
            },
          },
        });

        if(response.data.userLogin && response.data.userLogin.authToken) {
          const authToken = response.data.userLogin.authToken;
          await AsyncStorage.setItem('authToken', authToken);
          navigation.navigate('UserBalance');
          console.log('Login response:', response.data);          
        }
      }

    } catch (error) {
      console.error('Error logging in:', error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 30, marginHorizontal: 16 }}>
      <InputField
        value={code}
        placeholder="Code"
        onChangeText={setCode}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
};

export default UserLoginScreen;
