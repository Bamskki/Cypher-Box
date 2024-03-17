import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { GradientButton, GradientText, HeaderBackButton, Progress, Screen } from "@Cypher/components";
import { useNavigation } from "@react-navigation/native";
import InputEmailPhone from "./InputEmailPhone";
import { ScreenLayout, Text } from "@Cypher/component-library";
import SimpleToast from 'react-native-simple-toast';
import { requestEmailCode } from "../../../../api/authApis";
import { useCaptchaCreateChallenge, useCaptchaRequestAuthCode } from "../../../../apollo/api";

export default function LoginBlink() {
    const [email, setEmail] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const { navigate } = useNavigation();

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
            SimpleToast.show('Please enter a valid email or phone number', SimpleToast.SHORT);
            return;
        }
        else if(email) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(email)) {
            SimpleToast.show('Please enter a valid email', SimpleToast.SHORT);
            return;
          }
      
          const response = await requestEmailCode(email);
          if(response.result){
            navigate('VerifyPhone', {emailId: response.result, email: email});
          } else {
            SimpleToast.show(response.errors[0].message, SimpleToast.SHORT);
          }
        } else {
            console.log('phone.length < 10: , ', phone)
            if(Number(phone?.length) < 11){
                SimpleToast.show('Please enter a valid phone number', SimpleToast.SHORT);
                return;
            }
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
            navigate('VerifyPhone', {phone: phone});
          } else if (data.captchaRequestAuthCode.errors[0]) {
            SimpleToast.show(data.captchaRequestAuthCode.errors[0].message);
          }
        }
  
      } catch (error) {
        console.error('Error requesting auth code:', error?.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    const nextClickHandler = () => {
        navigate('LoginBlinkPhone');
    }

    return (
        <ScreenLayout disableScroll showToolbar progress={1}>
            {/* <Progress current={1} />
            <HeaderBackButton /> */}
            <View style={styles.container}>
                <View style={styles.innerView}>
                    <GradientText>Login to Blink</GradientText>
                    <Text h2 bold style={styles.title}>Were you able to register at Blink?</Text>
                    <Text h4 style={styles.title}>If you did, you should login with you phone number or email. If not, Try again. Currently you cannot use Cypher Bank without Blink, but in the future we will offer more options. Stay tuned!</Text>
                    <InputEmailPhone label={`Phone \nNumber`} setText={setPhone} text={phone} type="phone-pad" />
                    <View style={styles.view}>
                        <View style={styles.line} />
                        <Text bold style={styles.or}>OR</Text>
                        <View style={styles.line} />
                    </View>
                    <InputEmailPhone label="E-mail" setText={setEmail} text={email} type="email-address" />
                </View>
                <GradientButton disabled={isLoading} title="Request Code" onPress={handleRequestAuthCode} />
            </View>
        </ScreenLayout>
    )
}
