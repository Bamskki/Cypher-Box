import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useCaptchaCreateChallenge, useCaptchaRequestAuthCode } from '../../apollo/api';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { requestEmailCode } from '../../api/authApis';

const CaptchaAuthCodeScreen = ({navigation}) => {
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [challengeResult, setChallengeResult] = useState<any | null>(null);

  const [createChallenge, { loading: createChallengeLoading }] = useCaptchaCreateChallenge();
  const [requestAuthCode, { loading }] = useCaptchaRequestAuthCode();

  useEffect(() => {
    handleCreateChallenge();
  }, [])
  
  const handleCreateChallenge = async () => {
    try {
      const response = await createChallenge();
      setChallengeResult(response.data.captchaCreateChallenge.result);
    } catch (error) {
      console.error('Error creating challenge:', error?.message);
    }
  };

  const handleRequestAuthCode = async () => {
    setIsLoading(true);
    try {
      if(!phone && !email) {
        return;
      }
      else if(email) {
        const response = await requestEmailCode(email);
        if(response.result){
          navigation.navigate('UserLogin', {emailId: response.result});
        } else {
          alert(response.errors[0].message);
        }
      } else {
        const payload = {
          phone,
          challengeCode: challengeResult?.challengeCode,
          secCode: challengeResult?.challengeCode,
          validationCode: challengeResult?.challengeCode,
        }
        const response = await requestAuthCode({
          variables: {
            input: payload,
          },
        });

        const {data} = response;
        console.log('response: ', data)
        if(data.captchaRequestAuthCode.success) {
          navigation.navigate('UserLogin', {phone: phone});
        } else if (data.captchaRequestAuthCode.errors[0]) {
          alert(data.captchaRequestAuthCode.errors[0].message);
        }
      }

    } catch (error) {
      console.error('Error requesting auth code:', error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('challengeResult: ', challengeResult)

  return (
    <View style={{ flex: 1, marginTop: 30, marginHorizontal: 16 }}>
      <InputField
        value={email}
        placeholder="Email"
        keyboardType='email-address'
        onChangeText={text => setEmail(text)}
      />
      <Text style={{ textAlign: 'center', fontWeight: 'bold', marginVertical: 10 }}>OR</Text>
      <InputField
        value={phone}
        placeholder="Phone"
        keyboardType='numeric'
        onChangeText={text => setPhone(text)}
      />
      <Button
        title="Request Auth Code"
        onPress={handleRequestAuthCode}
        disabled={isLoading || createChallengeLoading}
      />
    </View>
  );
};

export default CaptchaAuthCodeScreen;
