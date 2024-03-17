import React, { useState } from "react";
import { TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { GradientButton } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout, Text } from "@Cypher/component-library";
import { useUserLogin } from "../../../../apollo/api";
import { emailLogin } from "../../../../api/authApis";

interface Props {
    route: any;
}

export default function VerifyPhone({ route}:Props) {
    const [code, setCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { navigate } = useNavigation();
    const { phone, emailId } = route.params;

    const [userLogin, { loading }] = useUserLogin();

    const handleLogin = async () => {
      setIsLoading(true);
      if(!code) {
        return;
      }
      try {
        if(emailId){
          const response = await emailLogin(emailId, Number(code));
          console.log('response: ', response)
          if(response?.result){
            const authToken = response?.result?.authToken;
            await AsyncStorage.setItem('authToken', authToken);
            nextClickHandler();
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
            nextClickHandler();
            console.log('Login response:', response.data);          
          }
        }
  
      } catch (error) {
        console.error('Error logging in:', error?.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    const nextClickHandler = () => {
        navigate('AccountStatus');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <Text h2 semibold style={styles.title}>{phone ? `To confirm your phone number, enter code we sent you by SMS on ${phone}` : `Enter the code sent to your email`}</Text>
                    <TextInput
                        value={code}
                        onChangeText={setCode}
                        keyboardType='phone-pad'
                        returnKeyType="done"
                        maxLength={6}
                        style={styles.textInput}
                        placeholder="000-000"
                    />
                </View>
                <GradientButton title="Submit" onPress={handleLogin} disabled={code.length < 6 || isLoading} />
            </View>
        </ScreenLayout>
    )
}
